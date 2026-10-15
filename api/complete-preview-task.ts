import { loadTasks, saveTasks, sanitizeTask } from './internal-tasks.js';

type Req = any;
type Res = any;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const tasks = await loadTasks();
    const id = '8c433c02-a46a-4e0a-9b2d-bee47d48238c';
    const index = tasks.findIndex((task) => task.id === id);
    if (index < 0) return res.status(404).json({ error: 'Task not found' });
    const current = tasks[index];
    tasks[index] = sanitizeTask({ ...current, status: 'Done', lastCompleted: new Date().toISOString(), notes: 'FPX website + guest experience preview completed and delivered to George for review.' }, current);
    await saveTasks(tasks);
    return res.status(200).json({ ok: true, task: tasks[index] });
  } catch (error) {
    return res.status(500).json({ error: 'Could not complete task' });
  }
}
