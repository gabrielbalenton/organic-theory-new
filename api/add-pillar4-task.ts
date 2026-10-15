import { loadTasks, saveTasks, sanitizeTask } from './internal-tasks.js';

type Req = any;
type Res = any;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const tasks = await loadTasks();
    const sourceId = 'chat:fpx-content-pillar4-20261015';
    const existing = tasks.find((task) => task.sourceType === 'Chat' && task.sourceId === sourceId);
    if (!existing) {
      tasks.push(sanitizeTask({
        title: 'Finish FPX Content Pillar 4 – Founder Authority & Timber Sourcing Experience',
        area: 'FPX / Sutcliffe',
        cadence: 'One-off',
        schedule: 'Friday, 16 Oct 2026',
        priority: 'P1',
        status: 'Active',
        notes: 'Finish Pillar 4 tomorrow so content planning can move on to Pillar 5 – Industry Resources & Guides. Keep this separate from the unapproved Gabriela marketing operating plan.',
        lastCompleted: null,
        sourceType: 'Chat',
        sourceId,
        sourceSubject: 'FPX Content Pillar 4',
        sourceSender: 'Recent ChatGPT review'
      }));
      await saveTasks(tasks);
    }
    return res.status(200).json({ ok: true, added: !existing });
  } catch (error) {
    return res.status(500).json({ error: 'Could not add Pillar 4 task' });
  }
}
