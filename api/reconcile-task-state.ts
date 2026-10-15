import { loadTasks, saveTasks, sanitizeTask } from './internal-tasks.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = any;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const tasks = await loadTasks();
    const now = new Date().toISOString();
    const removeIds = new Set([
      'e2819f08-3a32-41d0-810e-5cc2285b3933',
      '9fcba7f5-1a19-4824-b0ac-c7451a2f71f1',
    ]);

    let next = tasks.filter((task) => !removeIds.has(task.id)).map((task) => {
      if (task.id === 'e0afd2ca-a217-4ed4-bf00-fc339f9d255e') {
        return sanitizeTask({
          ...task,
          status: 'Done',
          lastCompleted: now,
          notes: 'Draft completed and sent to George via Brevo for review. Create a new follow-up only if George requests revisions, approval follow-up, or publishing.',
        }, task);
      }

      if (task.id === '9580c776-b4c2-4c04-838a-912323ef4104') {
        return sanitizeTask({
          ...task,
          schedule: 'Today – 3:00 PM',
          priority: 'P1',
          notes: 'Tire change planned for 3:00 PM today, 15 Oct 2026. Keep active until completed.',
        }, task);
      }

      return task;
    });

    const approvalSourceId = 'chat:gabriela-marketing-operating-plan-20261015';
    const existing = next.find((task) => task.sourceType === 'Chat' && task.sourceId === approvalSourceId);
    if (!existing) {
      next.push(sanitizeTask({
        title: 'Await Gabriela approval on FPX marketing operating plan',
        area: 'FPX / Sutcliffe',
        cadence: 'One-off',
        schedule: 'Waiting for Gabriela',
        priority: 'P2',
        estimateMinutes: 15,
        status: 'Paused',
        notes: 'The weekly/monthly plan for Saw Point, Emails, Social Media, Website and SEO has been drafted but is not approved yet. Do not treat the full plan as active. Roll it out step by step only as Gabriela approves each part.',
        lastCompleted: null,
        sourceType: 'Chat',
        sourceId: approvalSourceId,
        sourceThreadId: '',
        sourceUrl: '',
        sourceSubject: 'FPX marketing operating plan',
        sourceSender: 'Recent ChatGPT review',
      }));
    }

    await saveTasks(next);
    return res.status(200).json({ ok: true, taskCount: next.length });
  } catch (error) {
    console.error('Life OS reconciliation failed:', error);
    return res.status(500).json({ error: 'Life OS reconciliation failed' });
  }
}
