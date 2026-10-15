import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  AlertCircle,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  ListTodo,
  LockKeyhole,
  LogOut,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from 'lucide-react';

type Cadence = 'Weekly' | 'Monthly' | 'Quarterly' | 'One-off';
type Priority = 'P1' | 'P2' | 'P3';
type TaskStatus = 'Active' | 'Paused' | 'Done';

type Task = {
  id: string;
  title: string;
  area: string;
  cadence: Cadence;
  day?: string;
  schedule?: string;
  priority: Priority;
  estimateMinutes?: number;
  status: TaskStatus;
  notes?: string;
  lastCompleted?: string | null;
};

type Tab = 'today' | 'week' | 'cadence' | 'backlog' | 'all';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const AREAS = ['FPX / Sutcliffe', 'HAVOC', 'Randall-Penn', 'Organic Theory', 'Personal / Admin', 'Admin / Finance'];
const TZ = 'Asia/Manila';

function phtParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  }).formatToParts(date);
  const pick = (type: string) => parts.find((part) => part.type === type)?.value || '';
  return { year: pick('year'), month: pick('month'), day: pick('day'), weekday: pick('weekday') };
}

function dateKey(date = new Date()) {
  const p = phtParts(date);
  return `${p.year}-${p.month}-${p.day}`;
}

function weekKey(date = new Date()) {
  const key = dateKey(date);
  const cursor = new Date(`${key}T00:00:00Z`);
  const day = cursor.getUTCDay();
  const offset = day === 0 ? -6 : 1 - day;
  cursor.setUTCDate(cursor.getUTCDate() + offset);
  return cursor.toISOString().slice(0, 10);
}

function monthKey(date = new Date()) {
  const p = phtParts(date);
  return `${p.year}-${p.month}`;
}

function quarterKey(date = new Date()) {
  const p = phtParts(date);
  return `${p.year}-Q${Math.floor((Number(p.month) - 1) / 3) + 1}`;
}

function isDone(task: Task) {
  if (task.cadence === 'One-off') return task.status === 'Done';
  if (!task.lastCompleted) return false;
  const completed = new Date(task.lastCompleted);
  if (Number.isNaN(completed.getTime())) return false;
  if (task.cadence === 'Weekly') return weekKey(completed) === weekKey();
  if (task.cadence === 'Monthly') return monthKey(completed) === monthKey();
  return quarterKey(completed) === quarterKey();
}

function priorityRank(priority: Priority) {
  return priority === 'P1' ? 1 : priority === 'P2' ? 2 : 3;
}

function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    const doneDiff = Number(isDone(a)) - Number(isDone(b));
    if (doneDiff !== 0) return doneDiff;
    const priorityDiff = priorityRank(a.priority) - priorityRank(b.priority);
    if (priorityDiff !== 0) return priorityDiff;
    return a.title.localeCompare(b.title);
  });
}

function prettyDate() {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

function priorityClasses(priority: Priority) {
  if (priority === 'P1') return 'border-rose-400/30 bg-rose-400/10 text-rose-200';
  if (priority === 'P2') return 'border-amber-400/30 bg-amber-400/10 text-amber-100';
  return 'border-slate-500/30 bg-slate-500/10 text-slate-300';
}

function cadenceClasses(cadence: Cadence) {
  if (cadence === 'Weekly') return 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200';
  if (cadence === 'Monthly') return 'border-sky-400/25 bg-sky-400/10 text-sky-200';
  if (cadence === 'Quarterly') return 'border-violet-400/25 bg-violet-400/10 text-violet-200';
  return 'border-orange-400/25 bg-orange-400/10 text-orange-200';
}

export default function Internal() {
  const [authState, setAuthState] = useState<'checking' | 'locked' | 'open'>('checking');
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskError, setTaskError] = useState('');
  const [tab, setTab] = useState<Tab>('today');
  const [showAdd, setShowAdd] = useState(false);
  const [busyId, setBusyId] = useState('');

  const today = phtParts().weekday;

  useEffect(() => {
    fetch('/api/internal-auth', { credentials: 'same-origin', cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setAuthState(data.authenticated ? 'open' : 'locked'))
      .catch(() => setAuthState('locked'));
  }, []);

  useEffect(() => {
    if (authState === 'open') void loadTasks();
  }, [authState]);

  async function loadTasks() {
    setLoadingTasks(true);
    setTaskError('');
    try {
      const res = await fetch('/api/internal-tasks', { credentials: 'same-origin', cache: 'no-store' });
      if (res.status === 401) {
        setAuthState('locked');
        return;
      }
      if (!res.ok) throw new Error('Could not load tasks');
      const data = await res.json();
      setTasks(Array.isArray(data.tasks) ? data.tasks : []);
    } catch {
      setTaskError('Could not load the task system. Refresh and try again.');
    } finally {
      setLoadingTasks(false);
    }
  }

  async function unlock(event: FormEvent) {
    event.preventDefault();
    setAuthError('');
    const res = await fetch('/api/internal-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ pin }),
    });
    if (!res.ok) {
      setAuthError('That PIN is not correct.');
      return;
    }
    setPin('');
    setAuthState('open');
  }

  async function logout() {
    await fetch('/api/internal-auth', { method: 'DELETE', credentials: 'same-origin' });
    setTasks([]);
    setAuthState('locked');
  }

  async function taskAction(id: string, action: 'complete' | 'undo' | 'pause') {
    setBusyId(id);
    setTaskError('');
    try {
      const res = await fetch('/api/internal-tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error('Update failed');
      const data = await res.json();
      setTasks((current) => current.map((task) => (task.id === id ? data.task : task)));
    } catch {
      setTaskError('That change did not save. Please try again.');
    } finally {
      setBusyId('');
    }
  }

  async function deleteTask(task: Task) {
    if (!window.confirm(`Delete “${task.title}”?`)) return;
    setBusyId(task.id);
    try {
      const res = await fetch(`/api/internal-tasks?id=${encodeURIComponent(task.id)}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      if (!res.ok) throw new Error('Delete failed');
      setTasks((current) => current.filter((item) => item.id !== task.id));
    } catch {
      setTaskError('Could not delete that task.');
    } finally {
      setBusyId('');
    }
  }

  async function addTask(input: Omit<Task, 'id' | 'status'>) {
    const res = await fetch('/api/internal-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ ...input, status: 'Active' }),
    });
    if (!res.ok) throw new Error('Could not add task');
    const data = await res.json();
    setTasks((current) => [...current, data.task]);
    setShowAdd(false);
  }

  const activeTasks = useMemo(() => tasks.filter((task) => task.status !== 'Paused'), [tasks]);
  const weekly = useMemo(() => activeTasks.filter((task) => task.cadence === 'Weekly'), [activeTasks]);
  const todayTasks = useMemo(() => sortTasks(weekly.filter((task) => task.day === today)), [weekly, today]);
  const currentOneOffP1 = useMemo(
    () => sortTasks(activeTasks.filter((task) => task.cadence === 'One-off' && task.priority === 'P1' && task.status !== 'Done')),
    [activeTasks],
  );
  const completedWeekly = weekly.filter(isDone).length;
  const weeklyProgress = weekly.length ? Math.round((completedWeekly / weekly.length) * 100) : 0;
  const backlog = activeTasks.filter((task) => task.cadence === 'One-off' && task.status !== 'Done');
  const todayOutstanding = todayTasks.filter((task) => !isDone(task)).length;

  if (authState === 'checking') {
    return <div className="min-h-screen bg-[#09090B]" />;
  }

  if (authState === 'locked') {
    return (
      <main className="min-h-screen bg-[#09090B] text-white flex items-center justify-center px-5">
        <Helmet>
          <title>Private | Organic Theory</title>
          <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />
        </Helmet>
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
            <LockKeyhole size={22} />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Organic Theory</p>
          <h1 className="text-3xl font-semibold tracking-tight">Private Ops</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">Your work and life dashboard. Enter your 8-digit PIN.</p>
          <form onSubmit={unlock} className="mt-7 space-y-3">
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 8))}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="••••••••"
              aria-label="8-digit PIN"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-center text-2xl tracking-[0.45em] outline-none transition focus:border-emerald-400/60"
              autoFocus
            />
            {authError && <p className="text-sm text-rose-300">{authError}</p>}
            <button
              type="submit"
              disabled={pin.length !== 8}
              className="w-full rounded-2xl bg-emerald-400 px-4 py-3.5 font-semibold text-[#08110d] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Unlock dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <Helmet>
        <title>Life OS | Organic Theory</title>
        <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />
      </Helmet>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#09090B]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-300">Organic Theory / Private</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">Life OS</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => void loadTasks()} className="rounded-xl border border-white/10 p-2.5 text-slate-400 hover:bg-white/5 hover:text-white" aria-label="Refresh tasks">
              <RefreshCw size={17} className={loadingTasks ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-xl bg-emerald-400 px-3.5 py-2.5 text-sm font-semibold text-[#08110d] hover:bg-emerald-300">
              <Plus size={17} /> Add task
            </button>
            <button onClick={() => void logout()} className="rounded-xl border border-white/10 p-2.5 text-slate-400 hover:bg-white/5 hover:text-white" aria-label="Log out">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-7 lg:px-8 lg:py-10">
        <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-slate-400">{prettyDate()} · Philippine Time</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">What actually needs your attention.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">Recurring work resets automatically by week, month, or quarter. One-off work stays visible until you finish it.</p>
        </div>

        {taskError && (
          <div className="mb-5 flex items-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            <AlertCircle size={17} /> {taskError}
          </div>
        )}

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Today left" value={todayOutstanding} detail={`${todayTasks.length} scheduled today`} icon={<CalendarDays size={18} />} />
          <SummaryCard label="Weekly progress" value={`${weeklyProgress}%`} detail={`${completedWeekly} of ${weekly.length} completed`} icon={<CheckCircle2 size={18} />} />
          <SummaryCard label="P1 backlog" value={backlog.filter((task) => task.priority === 'P1').length} detail="One-off priorities" icon={<AlertCircle size={18} />} />
          <SummaryCard label="All active" value={activeTasks.filter((task) => task.status === 'Active').length} detail={`${tasks.filter((task) => task.status === 'Paused').length} paused`} icon={<ListTodo size={18} />} />
        </section>

        <section className="mt-7 rounded-3xl border border-white/10 bg-white/[0.035] p-5 lg:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Focus queue</p>
              <h3 className="mt-1 text-xl font-semibold">Do not let these disappear</h3>
            </div>
            <ChevronRight className="text-slate-600" />
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {sortTasks([...todayTasks.filter((task) => task.priority === 'P1' && !isDone(task)), ...currentOneOffP1]).slice(0, 6).map((task) => (
              <TaskCard key={task.id} task={task} busy={busyId === task.id} onAction={taskAction} onDelete={deleteTask} compact />
            ))}
            {!todayTasks.some((task) => task.priority === 'P1' && !isDone(task)) && currentOneOffP1.length === 0 && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-sm text-emerald-200 lg:col-span-2">No P1 items are hanging over you right now.</div>
            )}
          </div>
        </section>

        <nav className="mt-8 flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
          {([
            ['today', 'Today'],
            ['week', 'This week'],
            ['cadence', 'Monthly / Quarterly'],
            ['backlog', 'Backlog'],
            ['all', 'All tasks'],
          ] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${tab === key ? 'bg-white text-black' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <section className="mt-5">
          {loadingTasks && tasks.length === 0 ? (
            <div className="flex items-center gap-2 py-16 text-sm text-slate-500"><RefreshCw size={16} className="animate-spin" /> Loading your system…</div>
          ) : tab === 'today' ? (
            <TaskSection title={`${today}'s recurring work`} subtitle="The routine for today. Finish it once and it stays done until next week." tasks={todayTasks} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />
          ) : tab === 'week' ? (
            <div className="space-y-7">
              {DAYS.map((day) => {
                const dayTasks = sortTasks(weekly.filter((task) => task.day === day));
                if (!dayTasks.length) return null;
                return <TaskSection key={day} title={day} subtitle={day === today ? 'Today' : undefined} tasks={dayTasks} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />;
              })}
              {weekly.some((task) => !task.day) && <TaskSection title="Flexible this week" tasks={sortTasks(weekly.filter((task) => !task.day))} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />}
            </div>
          ) : tab === 'cadence' ? (
            <div className="space-y-8">
              <TaskSection title="Monthly" subtitle="Complete once each calendar month." tasks={sortTasks(activeTasks.filter((task) => task.cadence === 'Monthly'))} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />
              <TaskSection title="Quarterly" subtitle="Complete once each calendar quarter." tasks={sortTasks(activeTasks.filter((task) => task.cadence === 'Quarterly'))} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />
            </div>
          ) : tab === 'backlog' ? (
            <TaskSection title="One-off backlog" subtitle="These remain here until completed or deleted." tasks={sortTasks(backlog)} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />
          ) : (
            <div className="space-y-8">
              <TaskSection title="Active" tasks={sortTasks(tasks.filter((task) => task.status === 'Active'))} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />
              <TaskSection title="Paused" tasks={sortTasks(tasks.filter((task) => task.status === 'Paused'))} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />
              <TaskSection title="Completed one-offs" tasks={sortTasks(tasks.filter((task) => task.cadence === 'One-off' && task.status === 'Done'))} busyId={busyId} onAction={taskAction} onDelete={deleteTask} />
            </div>
          )}
        </section>
      </div>

      {showAdd && <AddTaskModal onClose={() => setShowAdd(false)} onAdd={addTask} />}
    </main>
  );
}

function SummaryCard({ label, value, detail, icon }: { label: string; value: string | number; detail: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-center justify-between text-slate-400"><span className="text-sm">{label}</span>{icon}</div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{detail}</div>
    </div>
  );
}

function TaskSection({ title, subtitle, tasks, busyId, onAction, onDelete }: {
  title: string;
  subtitle?: string;
  tasks: Task[];
  busyId: string;
  onAction: (id: string, action: 'complete' | 'undo' | 'pause') => void;
  onDelete: (task: Task) => void;
}) {
  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <span className="text-xs text-slate-600">{tasks.length} task{tasks.length === 1 ? '' : 's'}</span>
      </div>
      {tasks.length ? (
        <div className="grid gap-3 xl:grid-cols-2">
          {tasks.map((task) => <TaskCard key={task.id} task={task} busy={busyId === task.id} onAction={onAction} onDelete={onDelete} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-sm text-slate-600">Nothing here.</div>
      )}
    </section>
  );
}

function TaskCard({ task, busy, onAction, onDelete, compact = false }: {
  task: Task;
  busy: boolean;
  onAction: (id: string, action: 'complete' | 'undo' | 'pause') => void;
  onDelete: (task: Task) => void;
  compact?: boolean;
}) {
  const done = isDone(task);
  return (
    <article className={`rounded-2xl border p-4 transition ${done ? 'border-emerald-400/15 bg-emerald-400/[0.035]' : 'border-white/10 bg-black/20'} ${task.status === 'Paused' ? 'opacity-60' : ''}`}>
      <div className="flex gap-3">
        <button
          onClick={() => onAction(task.id, done ? 'undo' : 'complete')}
          disabled={busy || task.status === 'Paused'}
          className={`mt-0.5 shrink-0 transition ${done ? 'text-emerald-300' : 'text-slate-600 hover:text-emerald-300'} disabled:opacity-30`}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        >
          {done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className={`font-medium leading-6 ${done ? 'text-slate-500 line-through' : 'text-slate-100'}`}>{task.title}</h4>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${priorityClasses(task.priority)}`}>{task.priority}</span>
            {!compact && <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${cadenceClasses(task.cadence)}`}>{task.cadence}</span>}
            {task.status === 'Paused' && <span className="rounded-full border border-slate-500/30 px-2 py-0.5 text-[10px] text-slate-400">Paused</span>}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span>{task.area}</span>
            {task.schedule && <span className="flex items-center gap-1"><CalendarDays size={12} /> {task.schedule}</span>}
            {task.estimateMinutes ? <span className="flex items-center gap-1"><Clock3 size={12} /> {task.estimateMinutes} min</span> : null}
          </div>
          {!compact && task.notes && (
            <details className="mt-3 group">
              <summary className="cursor-pointer list-none text-xs text-slate-500 hover:text-slate-300">Details</summary>
              <p className="mt-2 border-l border-white/10 pl-3 text-sm leading-6 text-slate-400">{task.notes}</p>
            </details>
          )}
        </div>
        {!compact && (
          <div className="flex shrink-0 items-start gap-1">
            <button onClick={() => onAction(task.id, 'pause')} disabled={busy} className="rounded-lg p-2 text-slate-600 hover:bg-white/5 hover:text-white" aria-label={task.status === 'Paused' ? 'Resume task' : 'Pause task'}>
              {task.status === 'Paused' ? <Play size={15} /> : <Pause size={15} />}
            </button>
            <button onClick={() => onDelete(task)} disabled={busy} className="rounded-lg p-2 text-slate-700 hover:bg-rose-400/10 hover:text-rose-300" aria-label="Delete task">
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function AddTaskModal({ onClose, onAdd }: { onClose: () => void; onAdd: (task: Omit<Task, 'id' | 'status'>) => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [area, setArea] = useState('FPX / Sutcliffe');
  const [cadence, setCadence] = useState<Cadence>('Weekly');
  const [day, setDay] = useState('Monday');
  const [schedule, setSchedule] = useState('Flexible');
  const [priority, setPriority] = useState<Priority>('P2');
  const [estimateMinutes, setEstimateMinutes] = useState('30');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onAdd({
        title,
        area,
        cadence,
        day: cadence === 'Weekly' ? day : '',
        schedule,
        priority,
        estimateMinutes: Number(estimateMinutes) || undefined,
        notes,
        lastCompleted: null,
      });
    } catch {
      setError('Could not save this task.');
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={submit} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#111113] p-6 text-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <div><p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Life OS</p><h3 className="mt-1 text-2xl font-semibold">Add a task</h3></div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-500 hover:bg-white/5 hover:text-white"><X size={19} /></button>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Task">
            <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What must not be forgotten?" className="input" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Area">
              <select value={area} onChange={(e) => setArea(e.target.value)} className="input">{AREAS.map((item) => <option key={item}>{item}</option>)}</select>
            </Field>
            <Field label="Cadence">
              <select value={cadence} onChange={(e) => setCadence(e.target.value as Cadence)} className="input"><option>Weekly</option><option>Monthly</option><option>Quarterly</option><option>One-off</option></select>
            </Field>
            {cadence === 'Weekly' && <Field label="Day"><select value={day} onChange={(e) => setDay(e.target.value)} className="input">{DAYS.map((item) => <option key={item}>{item}</option>)}</select></Field>}
            <Field label="Schedule / trigger"><input value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="Flexible, 10:00 AM, Month-end…" className="input" /></Field>
            <Field label="Priority"><select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="input"><option>P1</option><option>P2</option><option>P3</option></select></Field>
            <Field label="Estimate (minutes)"><input type="number" min="0" max="1440" value={estimateMinutes} onChange={(e) => setEstimateMinutes(e.target.value)} className="input" /></Field>
          </div>
          <Field label="Notes"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Context, definition of done, dependencies…" className="input resize-none" /></Field>
          {error && <p className="text-sm text-rose-300">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5">Cancel</button>
          <button disabled={saving || !title.trim()} type="submit" className="flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-[#08110d] hover:bg-emerald-300 disabled:opacity-50">{saving ? <RefreshCw size={15} className="animate-spin" /> : <Check size={15} />} Save task</button>
        </div>
      </form>
      <style>{`.input{width:100%;border-radius:.75rem;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.25);padding:.75rem .875rem;font-size:.875rem;outline:none;transition:border-color .2s}.input:focus{border-color:rgba(52,211,153,.55)}.input option{background:#111113;color:white}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-medium text-slate-400">{label}</span>{children}</label>;
}
