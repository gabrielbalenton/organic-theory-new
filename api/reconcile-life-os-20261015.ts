import { loadTasks, saveTasks, sanitizeTask, type Task } from './internal-tasks.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = any;

function upsertBySource(tasks: Task[], input: any) {
  const index = tasks.findIndex((task) => task.sourceType === input.sourceType && task.sourceId === input.sourceId);
  if (index >= 0) {
    tasks[index] = sanitizeTask({ ...tasks[index], ...input }, tasks[index]);
    return tasks[index];
  }
  const task = sanitizeTask(input);
  tasks.push(task);
  return task;
}

function updateById(tasks: Task[], id: string, updates: any) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index < 0) return null;
  tasks[index] = sanitizeTask({ ...tasks[index], ...updates }, tasks[index]);
  return tasks[index];
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tasks = await loadTasks();
    const changed: string[] = [];

    if (updateById(tasks, 'eaa06cce-4303-45a6-98b6-383a574a5cf1', {
      status: 'Paused',
      notes: 'Paused 15 Oct 2026 after George asked to pause the Lead Outreach Tracker work. Resume only when George/Gabriela explicitly unpause it.',
    })) changed.push('Paused lead account brief research');

    if (updateById(tasks, '2c5c1461-867b-41f1-ba43-3cb0aa6adabb', {
      status: 'Paused',
      notes: 'Paused 15 Oct 2026 after George asked to pause the Lead Outreach Tracker work. Resume only when George/Gabriela explicitly unpause it.',
    })) changed.push('Paused lead tracker updates');

    if (updateById(tasks, '8c433c02-a46a-4e0a-9b2d-bee47d48238c', {
      title: 'Fix and deliver FPX website + guest experience preview to George',
      notes: 'The review copy/preview work exists, but PR #11 / PR #12 preview deployments reported errors on 15 Oct. Fix the deployment, verify the buyer/guest wording and mobile view, then send George a working review link before publishing.',
      priority: 'P1',
    })) changed.push('Updated FPX preview task');

    if (updateById(tasks, 'ee44438d-0f82-4f47-a152-99cb1b456d17', {
      lastCompleted: '2026-10-13T01:33:37.000Z',
      status: 'Active',
      notes: 'This week is paid (Gabriela confirmed 13 Oct). Next check is the normal Tuesday cycle.',
    })) changed.push('Marked this week invoice check complete');

    upsertBySource(tasks, {
      title: 'Draft FPX Analytics / Intelligence rollout content and send George for review',
      area: 'FPX / Sutcliffe',
      cadence: 'One-off',
      priority: 'P1',
      estimateMinutes: 60,
      status: 'Active',
      notes: 'You told George on 14 Oct you would draft this and send it. Audience is existing/active FPX users. Lead with the Diesel Price Index and use Building Consents as the secondary example. Send preview to George before publishing.',
      sourceType: 'Email',
      sourceId: '1a137663d59d076c',
      sourceThreadId: '1a13212fb41793fe',
      sourceSubject: 'Re: FPX Analytics/ Intelligence',
      sourceSender: 'Forest Products Exchange / George Harman',
      sourceUrl: 'https://mail.google.com/mail/u/?authuser=gabrielbalenton%40gmail.com#all/1a137663d59d076c',
    });
    changed.push('Added FPX Analytics rollout draft');

    upsertBySource(tasks, {
      title: 'Await George’s format decision, then finalize FPX business overview brochure',
      area: 'FPX / Sutcliffe',
      cadence: 'One-off',
      priority: 'P2',
      estimateMinutes: 60,
      status: 'Paused',
      notes: 'Wording copy is ready. On 14 Oct you asked George whether he wants a designed PDF attachment or email-campaign format. Waiting on his answer; follow up if the thread stays unanswered.',
      sourceType: 'Email',
      sourceId: '1a13770d87db100f',
      sourceThreadId: '1a1368a84815d3b5',
      sourceSubject: 'Re: Business summary',
      sourceSender: 'George Harman / Sutcliffe Trading',
      sourceUrl: 'https://mail.google.com/mail/u/?authuser=gabrielbalenton%40gmail.com#all/1a13770d87db100f',
    });
    changed.push('Added brochure waiting task');

    upsertBySource(tasks, {
      title: 'Fix FPX Intelligence Make source-download scenario and retest',
      area: 'FPX / Sutcliffe',
      cadence: 'One-off',
      priority: 'P1',
      estimateMinutes: 45,
      status: 'Active',
      notes: 'Make reported an error in the MPI Timber Production – Source Download Test scenario. Review the HTTP module configuration (including required stopOnHttpError/shareCookies fields), fix it, and rerun the scenario.',
      sourceType: 'Email',
      sourceId: '1a134bda0b457a76',
      sourceThreadId: '1a134bda0b457a76',
      sourceSubject: 'Encountered error in FPX Intelligence - MPI Timber Production - Source Download Test scenario',
      sourceSender: 'Make',
      sourceUrl: 'https://mail.google.com/mail/u/?authuser=gabrielbalenton%40gmail.com#all/1a134bda0b457a76',
    });
    changed.push('Added FPX Intelligence Make fix');

    upsertBySource(tasks, {
      title: 'Finish FPX reporting dashboard access + data connections',
      area: 'FPX / Sutcliffe',
      cadence: 'One-off',
      priority: 'P1',
      estimateMinutes: 120,
      status: 'Active',
      notes: 'There is still an unsent FPX Reporting Dashboard Access Setup draft. Send/confirm the access request with Gabriela, then connect GA4 Viewer, GSC Full permission, Brevo and available social APIs and verify live data on /internal/reporting.',
      sourceType: 'Email',
      sourceId: '1a12f062e017111f',
      sourceThreadId: '1a12e761ade7dd07',
      sourceSubject: 'FPX Reporting Dashboard Access Setup',
      sourceSender: 'Gabriel draft to Gabriela',
      sourceUrl: 'https://mail.google.com/mail/u/?authuser=gabrielbalenton%40gmail.com#all/1a12f062e017111f',
    });
    changed.push('Added reporting/data-access task');

    upsertBySource(tasks, {
      title: 'Follow up with Gabriela for the HeyGen avatar recording/video',
      area: 'FPX / Sutcliffe',
      cadence: 'One-off',
      priority: 'P2',
      estimateMinutes: 15,
      status: 'Active',
      notes: 'Gabriela replied on 13 Oct that she would do the recording on Tuesday. No later delivery was found in the current email pass. Follow up and collect the recording if it has not already arrived elsewhere.',
      sourceType: 'Email',
      sourceId: '1a1336a68cb82c4c',
      sourceThreadId: '1a133615af00f6d9',
      sourceSubject: 'Re: Hey Gen Script',
      sourceSender: 'Gabriela Molloy',
      sourceUrl: 'https://mail.google.com/mail/u/?authuser=gabrielbalenton%40gmail.com#all/1a1336a68cb82c4c',
    });
    changed.push('Added HeyGen follow-up');

    upsertBySource(tasks, {
      title: 'Replace unsafe front tire(s) / complete tire change',
      area: 'Personal / Admin',
      cadence: 'One-off',
      priority: 'P1',
      estimateMinutes: 60,
      status: 'Active',
      notes: 'Recent chat showed tire cords/threads visible. Treat this as safety-critical and do not keep using the damaged tire. If the tire was already replaced after that chat, mark this task Done immediately.',
      sourceType: 'Chat',
      sourceId: 'chat:tire-exposed-cords-20261014',
      sourceSubject: 'Tire safety / exposed cords',
      sourceSender: 'Recent ChatGPT task review',
    });
    changed.push('Added tire safety task');

    upsertBySource(tasks, {
      title: 'Review Home Credit overdue-payment reminder and decide next action',
      area: 'Personal / Admin',
      cadence: 'One-off',
      priority: 'P1',
      estimateMinutes: 20,
      status: 'Active',
      notes: 'A current inbox reminder says the account remains overdue and mentions possible escalation. Review the account directly and decide/pay/contact them as appropriate. No payment details are stored in this task.',
      sourceType: 'Email',
      sourceId: '1a139dbc9620a3af',
      sourceThreadId: '1a139dbc9620a3af',
      sourceSubject: 'Payment Reminder',
      sourceSender: 'Home Credit',
      sourceUrl: 'https://mail.google.com/mail/u/?authuser=gabrielbalenton%40gmail.com#all/1a139dbc9620a3af',
    });
    changed.push('Added personal payment-reminder review');

    upsertBySource(tasks, {
      title: 'Complete FPX / Sutcliffe AI-GEO visibility audit',
      area: 'FPX / Sutcliffe',
      cadence: 'One-off',
      priority: 'P2',
      estimateMinutes: 120,
      status: 'Active',
      notes: 'Pending from recent ChatGPT planning: page-by-page AI/GEO audit covering schema, entity/sameAs gaps, legacy indexed pages, question/comparison content opportunities, third-party mentions and a 90-day visibility plan.',
      sourceType: 'Chat',
      sourceId: 'chat:fpx-ai-geo-audit-20261005',
      sourceSubject: 'FPX/Sutcliffe AI-GEO audit',
      sourceSender: 'Recent ChatGPT task review',
    });
    changed.push('Added AI/GEO audit backlog');

    await saveTasks(tasks);
    return res.status(200).json({ ok: true, changed, taskCount: tasks.length });
  } catch (error) {
    console.error('Life OS reconciliation error:', error);
    return res.status(500).json({ error: 'Reconciliation failed' });
  }
}
