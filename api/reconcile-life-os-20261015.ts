import { loadTasks, saveTasks, sanitizeTask } from './internal-tasks.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = any;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tasks = await loadTasks();
    const removeIds = new Set([
      'e2819f08-3a32-41d0-810e-5cc2285b3933',
      '9fcba7f5-1a19-4824-b0ac-c7451a2f71f1',
    ]);

    const next = tasks
      .filter((task) => !removeIds.has(task.id))
      .map((task) => {
        if (task.id === 'e0afd2ca-a217-4ed4-bf00-fc339f9d255e') {
          return sanitizeTask({
            ...task,
            status: 'Done',
            lastCompleted: new Date().toISOString(),
            notes: 'Draft completed and sent to George via Brevo for review.',
          }, task);
        }

        if (task.id === '9580c776-b4c2-4c04-838a-912323ef4104') {
          return sanitizeTask({
            ...task,
            schedule: 'Today – 3:00 PM',
            priority: 'P1',
            notes: 'Tire change planned for 3:00 PM today (15 Oct 2026). Keep active until completed.',
          }, task);
        }

        return task;
      });

    await saveTasks(next);
    return res.status(200).json({
      ok: true,
      completed: ['e0afd2ca-a217-4ed4-bf00-fc339f9d255e'],
      removed: Array.from(removeIds),
      rescheduled: ['9580c776-b4c2-4c04-838a-912323ef4104'],
      taskCount: next.length,
    });
  } catch (error) {
    console.error('Life OS reconciliation failed:', error);
    return res.status(500).json({ error: 'Life OS reconciliation failed' });
  }
}
