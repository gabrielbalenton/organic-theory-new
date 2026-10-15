import crypto from 'node:crypto';
import { loadTasks, saveTasks, sanitizeTask } from './internal-tasks.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = any;

function cleanText(value: unknown, max = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expectedToken = process.env.EMAIL_INGEST_TOKEN || '';
  const suppliedToken = cleanText(req.query?.token, 256);
  if (!expectedToken || !suppliedToken || !safeEqual(expectedToken, suppliedToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const sourceId = cleanText(req.query?.emailId, 160);
    const sourceThreadId = cleanText(req.query?.threadId, 160);
    const title = cleanText(req.query?.title, 180);
    if (!sourceId || !title) {
      return res.status(400).json({ error: 'emailId and title are required' });
    }

    const tasks = await loadTasks();
    const exact = tasks.find((task) => task.sourceType === 'Email' && task.sourceId === sourceId);
    if (exact) {
      return res.status(200).json({ ok: true, duplicate: true, task: exact });
    }

    const sameOpenThread = sourceThreadId
      ? tasks.find((task) => task.sourceType === 'Email' && task.sourceThreadId === sourceThreadId && task.status !== 'Done')
      : undefined;

    if (sameOpenThread) {
      const index = tasks.findIndex((task) => task.id === sameOpenThread.id);
      const updated = sanitizeTask({
        ...sameOpenThread,
        title,
        area: cleanText(req.query?.area, 80) || sameOpenThread.area,
        priority: cleanText(req.query?.priority, 8) || sameOpenThread.priority,
        estimateMinutes: Number(req.query?.estimateMinutes || sameOpenThread.estimateMinutes || 30),
        notes: cleanText(req.query?.notes, 2000) || sameOpenThread.notes,
        sourceId,
        sourceThreadId,
        sourceUrl: cleanText(req.query?.sourceUrl, 1000) || sameOpenThread.sourceUrl,
        sourceSubject: cleanText(req.query?.subject, 500) || sameOpenThread.sourceSubject,
        sourceSender: cleanText(req.query?.sender, 500) || sameOpenThread.sourceSender,
      }, sameOpenThread);
      tasks[index] = updated;
      await saveTasks(tasks);
      return res.status(200).json({ ok: true, updatedThread: true, task: updated });
    }

    const task = sanitizeTask({
      title,
      area: cleanText(req.query?.area, 80) || 'Personal / Admin',
      cadence: 'One-off',
      priority: cleanText(req.query?.priority, 8) || 'P2',
      estimateMinutes: Number(req.query?.estimateMinutes || 30),
      status: 'Active',
      notes: cleanText(req.query?.notes, 2000),
      lastCompleted: null,
      sourceType: 'Email',
      sourceId,
      sourceThreadId,
      sourceUrl: cleanText(req.query?.sourceUrl, 1000),
      sourceSubject: cleanText(req.query?.subject, 500),
      sourceSender: cleanText(req.query?.sender, 500),
    });

    tasks.push(task);
    await saveTasks(tasks);
    return res.status(201).json({ ok: true, task });
  } catch (error) {
    console.error('Email task ingest error:', error);
    return res.status(500).json({ error: 'Could not add email task' });
  }
}
