import { loadTasks, saveTasks, sanitizeTask, type Task } from './internal-tasks.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = any;

function update(tasks: Task[], id: string, patch: any) {
  const i = tasks.findIndex((task) => task.id === id);
  if (i < 0) return;
  tasks[i] = sanitizeTask({ ...tasks[i], ...patch }, tasks[i]);
}

function add(tasks: Task[], task: any) {
  if (tasks.some((t) => t.sourceType === task.sourceType && t.sourceId === task.sourceId)) return;
  tasks.push(sanitizeTask(task));
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const tasks = await loadTasks();

  update(tasks, 'eaa06cce-4303-45a6-98b6-383a574a5cf1', {
    status: 'Paused',
    notes: 'Paused 15 Oct 2026 after George asked to pause Lead Outreach Tracker work. Resume only when George/Gabriela unpause it.',
  });
  update(tasks, '2c5c1461-867b-41f1-ba43-3cb0aa6adabb', {
    status: 'Paused',
    notes: 'Paused 15 Oct 2026 after George asked to pause Lead Outreach Tracker work. Resume only when George/Gabriela unpause it.',
  });
  update(tasks, '8c433c02-a46a-4e0a-9b2d-bee47d48238c', {
    title: 'Fix and deliver FPX website + guest experience preview to George',
    priority: 'P1',
    notes: 'PR #11 / PR #12 preview deployments reported errors on 15 Oct. Fix deployment, verify wording/mobile view, then send George a working review link before publishing.',
  });
  update(tasks, 'ee44438d-0f82-4f47-a152-99cb1b456d17', {
    lastCompleted: '2026-10-13T01:33:37.000Z',
    status: 'Active',
    notes: 'This week is paid. Next check is the normal Tuesday cycle.',
  });

  add(tasks, {
    title: 'Draft FPX Analytics / Intelligence rollout content and send George for review', area: 'FPX / Sutcliffe', cadence: 'One-off', priority: 'P1', estimateMinutes: 60, status: 'Active',
    notes: 'Promised to George on 14 Oct. Audience: existing/active FPX users. Lead with Diesel Price Index; Building Consents secondary. Send preview before publishing.',
    sourceType: 'Email', sourceId: '1a137663d59d076c', sourceThreadId: '1a13212fb41793fe', sourceSubject: 'FPX Analytics/ Intelligence', sourceSender: 'George Harman',
  });
  add(tasks, {
    title: 'Await George’s format decision, then finalize FPX business overview brochure', area: 'FPX / Sutcliffe', cadence: 'One-off', priority: 'P2', estimateMinutes: 60, status: 'Paused',
    notes: 'Wording is ready. Waiting for George to choose PDF attachment vs email-campaign format; follow up if unanswered.',
    sourceType: 'Email', sourceId: '1a13770d87db100f', sourceThreadId: '1a1368a84815d3b5', sourceSubject: 'Business summary', sourceSender: 'George Harman',
  });
  add(tasks, {
    title: 'Fix FPX Intelligence Make source-download scenario and retest', area: 'FPX / Sutcliffe', cadence: 'One-off', priority: 'P1', estimateMinutes: 45, status: 'Active',
    notes: 'Make reported an error in the MPI Timber Production source-download test. Fix HTTP configuration and rerun.',
    sourceType: 'Email', sourceId: '1a134bda0b457a76', sourceThreadId: '1a134bda0b457a76', sourceSubject: 'FPX Intelligence Make error', sourceSender: 'Make',
  });
  add(tasks, {
    title: 'Finish FPX reporting dashboard access + data connections', area: 'FPX / Sutcliffe', cadence: 'One-off', priority: 'P1', estimateMinutes: 120, status: 'Active',
    notes: 'Send/confirm the reporting access request with Gabriela, connect GA4/GSC/Brevo/available social data, and verify /internal/reporting.',
    sourceType: 'Email', sourceId: '1a12f062e017111f', sourceThreadId: '1a12e761ade7dd07', sourceSubject: 'FPX Reporting Dashboard Access Setup', sourceSender: 'Draft to Gabriela',
  });
  add(tasks, {
    title: 'Follow up with Gabriela for the HeyGen avatar recording/video', area: 'FPX / Sutcliffe', cadence: 'One-off', priority: 'P2', estimateMinutes: 15, status: 'Active',
    notes: 'Gabriela said on 13 Oct she would do it Tuesday; no later delivery was found in the email pass.',
    sourceType: 'Email', sourceId: '1a1336a68cb82c4c', sourceThreadId: '1a133615af00f6d9', sourceSubject: 'Hey Gen Script', sourceSender: 'Gabriela Molloy',
  });
  add(tasks, {
    title: 'Replace unsafe front tire(s) / complete tire change', area: 'Personal / Admin', cadence: 'One-off', priority: 'P1', estimateMinutes: 60, status: 'Active',
    notes: 'Recent chat showed visible tire cords. If already replaced, mark Done.',
    sourceType: 'Chat', sourceId: 'chat:tire-exposed-cords-20261014', sourceSubject: 'Tire safety', sourceSender: 'Recent ChatGPT review',
  });
  add(tasks, {
    title: 'Complete FPX / Sutcliffe AI-GEO visibility audit', area: 'FPX / Sutcliffe', cadence: 'One-off', priority: 'P2', estimateMinutes: 120, status: 'Active',
    notes: 'Pending page-by-page audit: schema/entity gaps, legacy pages, question/comparison content, third-party mentions, and 90-day plan.',
    sourceType: 'Chat', sourceId: 'chat:fpx-ai-geo-audit-20261005', sourceSubject: 'FPX/Sutcliffe AI-GEO audit', sourceSender: 'Recent ChatGPT review',
  });

  await saveTasks(tasks);
  return res.status(200).json({ ok: true, taskCount: tasks.length });
}
