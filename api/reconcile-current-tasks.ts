import { loadTasks, saveTasks, sanitizeTask } from './internal-tasks.js';

type Req = any;
type Res = any;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const tasks = await loadTasks();
    const now = new Date().toISOString();
    const updates: Record<string, any> = {
      '7ab28682-ce5a-4e4a-971a-63c01baffc41': {
        status: 'Active',
        lastCompleted: now,
        notes: 'No campaign/content item is ready to produce this week. Do not create work just to fill this block; act only when there is an approved campaign, content item, or material to produce.'
      },
      'ce2a6dd9-c2c4-4f4a-bc25-136bcd26719c': {
        status: 'Paused',
        schedule: 'December 2026',
        notes: 'AI-GEO audit has not started. Schedule the FPX / Sutcliffe audit for December 2026; no action required before then.'
      },
      '34da18ce-9674-433a-a9e5-87f043d657e5': {
        title: 'Await Logan review of Randall-Penn website',
        status: 'Paused',
        schedule: 'Waiting for Logan',
        notes: 'Initial Randall-Penn website build is complete and has been sent to Logan for review. Resume only when Logan sends feedback or approves next steps.'
      }
    };

    let changed = 0;
    for (let i = 0; i < tasks.length; i++) {
      const patch = updates[tasks[i].id];
      if (!patch) continue;
      tasks[i] = sanitizeTask({ ...tasks[i], ...patch }, tasks[i]);
      changed++;
    }
    await saveTasks(tasks);
    return res.status(200).json({ ok: true, changed });
  } catch (error) {
    return res.status(500).json({ error: 'Could not reconcile tasks' });
  }
}
