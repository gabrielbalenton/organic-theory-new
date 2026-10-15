import { loadTasks, saveTasks, sanitizeTask } from './internal-tasks.js';

type Req = any;
type Res = any;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const tasks = await loadTasks();
    const now = new Date().toISOString();
    const previewId = '8c433c02-a46a-4e0a-9b2d-bee47d48238c';
    const websiteBlockId = 'e0ba8b7d-c6f4-4997-913e-5ad57f5d2ad6';

    const previewIndex = tasks.findIndex((task) => task.id === previewId);
    if (previewIndex >= 0) {
      const current = tasks[previewIndex];
      tasks[previewIndex] = sanitizeTask({ ...current, status: 'Done', lastCompleted: now, notes: 'FPX website + guest experience preview completed and delivered to George for review.' }, current);
    }

    const blockIndex = tasks.findIndex((task) => task.id === websiteBlockId);
    if (blockIndex >= 0) {
      const current = tasks[blockIndex];
      tasks[blockIndex] = sanitizeTask({ ...current, status: 'Active', lastCompleted: now }, current);
    }

    await saveTasks(tasks);
    return res.status(200).json({ ok: true, previewCompleted: previewIndex >= 0, websiteBlockCompleted: blockIndex >= 0 });
  } catch (error) {
    return res.status(500).json({ error: 'Could not complete tasks' });
  }
}
