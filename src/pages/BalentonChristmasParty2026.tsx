import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ArrowDown, ArrowLeftRight, CalendarDays, Check, ChevronDown, Clock3, Copy, Gift,
  Heart, MapPin, RefreshCw, Sparkles, Users, UtensilsCrossed, X,
} from 'lucide-react';
import './BalentonChristmasParty2026.css';

type Person = { name: string; drawn: boolean; assignment: string | null };
type Trade = {
  id: string;
  from: string;
  to: string;
  status: 'pending';
  createdAt: string;
};
type PotluckData = {
  people: Person[];
  trades: Trade[];
  drawnCount: number;
  total: number;
};
type Action = 'draw' | 'offer' | 'accept' | 'decline' | 'cancel';

const ADULTS = [
  'Teng', 'Julius', 'Mike M', 'Cj', 'Mark', 'Beth', 'Christine', 'Paulo',
  'Shela', 'Gab', 'Tricia', 'Geneva', 'Mike F', 'Ethel', 'Neriz', 'Jean',
];
const KIDS = ['Luigi', 'Marga', 'Franco', 'Nathan', 'Mikee', 'Mygo', 'Theo'];
const CATEGORIES = [
  { title: 'Mains', icon: '🍗', detail: 'Pork, chicken, beef, seafood or fish' },
  { title: 'Appetizers', icon: '🥗', detail: 'Pasta, noodles or salad greens' },
  { title: 'Dessert', icon: '🍰', detail: 'Cake, ice cream or another sweet treat' },
  { title: 'The essentials', icon: '🥤', detail: 'Drinks, ice (yelo) and utensils' },
];

const VENUE_URL = 'https://maps.app.goo.gl/gAvc23YXg39LwRcK9';
const MAP_EMBED_URL = 'https://maps.google.com/maps?q=14.423767%2C121.011806&hl=en&z=17&output=embed';
const CALENDAR_URL = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
  action: 'TEMPLATE',
  text: 'Balenton Christmas Party 2026',
  dates: '20261227T130000/20261227T140000',
  ctz: 'Asia/Manila',
  details: 'Christmas get-together starts at 1:00 PM. One-hour calendar reminder only; the party may run longer. Bring your potluck assignment and, if joining White Elephant, one wrapped unisex gift worth no more than ₱500. Exact venue: ' + VENUE_URL,
  location: 'SNIP Plant Nursery, Pilar, Las Piñas, Philippines',
}).toString();

const STORY = [
  'Christmas at Pilar was off to a great start. Teng looked LEFT to check the food table, then RIGHT to see who had arrived. Mike M walked in from the RIGHT with a present and asked, "Did I come to the RIGHT house?" Everyone said, "Of course!"',
  'Julius pointed LEFT toward the dining area. CJ turned RIGHT looking for a seat. Mark looked LEFT and saw Beth laughing, while Christine went RIGHT to check the desserts. Paulo took one step LEFT, then another step RIGHT, because someone mentioned there was still food coming.',
  'Shela said, "There is only one RIGHT way to do Christmas, and that is together!" Gab nodded, looked LEFT, and asked who brought the ice. Tricia pointed RIGHT toward the drinks, while Geneva looked LEFT and said, "Save some dessert for me!"',
  'Mike F arrived with a gift in his RIGHT hand and absolutely no idea where to put it. Ethel pointed LEFT. Neriz pointed RIGHT. Jean said, "Just put it RIGHT there!" So Mike F went LEFT, changed his mind, and went RIGHT instead.',
  'Meanwhile, Luigi and Marga were looking LEFT and RIGHT for snacks. Franco turned RIGHT, Nathan ran LEFT, Mikee looked RIGHT, Mygo pointed LEFT, and Theo seemed perfectly happy watching everyone go LEFT and RIGHT.',
  'Someone yelled, "The food is on the LEFT!" Half the family turned LEFT. Someone else yelled, "No, the plates are on the RIGHT!" Everyone turned RIGHT. Then came the best news of all: "The presents are RIGHT here!"',
  'And because every Balenton Christmas ends up a little chaotic, everyone passed one last time to the LEFT, then to the RIGHT, and one more time to the LEFT. Wherever your gift is RIGHT now, that is your Christmas surprise. Merry Christmas!',
];

function StoryText({ paragraph }: { paragraph: string }) {
  return (
    <p>
      {paragraph.split(/(LEFT|RIGHT)/g).map((part, index) =>
        part === 'LEFT' || part === 'RIGHT' ? (
          <strong className={'bcp-cue bcp-cue-' + part.toLowerCase()} key={index}>{part}</strong>
        ) : <span key={index}>{part}</span>
      )}
    </p>
  );
}

export default function BalentonChristmasParty2026() {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState<PotluckData | null>(null);
  const [target, setTarget] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [readerMode, setReaderMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const response = await fetch('/api/balenton-potluck', { cache: 'no-store' });
      if (!response.ok) throw new Error('Could not load the live potluck board.');
      const result = await response.json();
      setData(result);
      if (!quiet) setError('');
    } catch (err) {
      if (!quiet) setError(err instanceof Error ? err.message : 'Could not load potluck.');
    } finally {
      if (!quiet) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => { void refresh(true); }, 12000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const current = useMemo(() => data?.people.find((person) => person.name === selected), [data, selected]);
  const incoming = data?.trades.find((trade) => trade.to === selected);
  const outgoing = data?.trades.find((trade) => trade.from === selected);
  const canTradeWith = data?.people.filter((person) => person.drawn && person.name !== selected) || [];
  const allDrawn = data?.drawnCount === data?.total;

  const send = async (action: Action, extra: Record<string, string> = {}) => {
    if (!selected || busy) return;
    setBusy(true);
    setError('');
    setNotice('');
    if (action === 'draw') setDrawing(true);
    try {
      const request = fetch('/api/balenton-potluck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, name: selected, ...extra }),
      });
      const [response] = await Promise.all([
        request,
        action === 'draw' ? new Promise<void>((resolve) => window.setTimeout(resolve, 1450)) : Promise.resolve(),
      ]);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.');
      setData(result);
      setNotice(result.message || 'Saved.');
      if (action === 'offer') setTarget('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save your action.');
    } finally {
      setBusy(false);
      setDrawing(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Could not copy the link. Please copy it from your browser.');
    }
  };

  return (
    <div className="bcp use-native-cursor">
      <Helmet>
        <title>Balenton Christmas Party 2026 | The Family Get-Together</title>
        <meta name="description" content="Details, the potluck draw and the Balenton family Christmas gift exchange." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="bcp-topline"><span>✦</span> THE BALENTON FAMILY <span>✦</span> CHRISTMAS 2026 <span>✦</span></div>
      <header className="bcp-header">
        <a className="bcp-brand" href="#home"><span className="bcp-brand-mark">B<span>✳</span></span> <span>BALENTON <small>CHRISTMAS CLUB</small></span></a>
        <nav aria-label="On this page" className="bcp-nav">
          <a href="#details">The plan</a>
          <a href="#potluck">Potluck draw</a>
          <a href="#white-elephant">Gift exchange</a>
        </nav>
        <button type="button" className="bcp-share" onClick={copyLink}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied!' : 'Share link'}</button>
      </header>

      <main id="home">
        <section className="bcp-hero">
          <div className="bcp-hero-stars" aria-hidden="true">✳　·　✦　·　✳</div>
          <div className="bcp-hero-copy">
            <div className="bcp-eyebrow"><span className="bcp-eyebrow-line" /> AN INVITATION TO OUR FAVORITE PEOPLE</div>
            <h1>It&apos;s the most <em>wonderful</em> time to be <span>together.</span></h1>
            <p>Good food, loud laughs, a little chaos and a whole lot of family. You know the drill. It&apos;s Christmas with the Balentons.</p>
            <div className="bcp-hero-date">SUNDAY, DECEMBER 27, 2026 <span>✳</span> 1:00 PM <span>✳</span> PILAR</div>
            <div className="bcp-hero-actions"><a className="bcp-primary" href="#potluck">Pick your potluck <ArrowDown size={17} /></a><a className="bcp-calendar-button" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"><CalendarDays size={16} /> Add to Google Calendar</a></div>
          </div>
          <div className="bcp-hero-art" aria-hidden="true">
            <div className="bcp-art-glow" />
            <div className="bcp-art-word bcp-art-word-top">MERRY</div>
            <div className="bcp-tree">
              <span className="bcp-tree-star">✶</span>
              <div className="bcp-tree-tier bcp-tree-tier-1" />
              <div className="bcp-tree-tier bcp-tree-tier-2" />
              <div className="bcp-tree-tier bcp-tree-tier-3" />
              <div className="bcp-tree-trunk" />
              <span className="bcp-bauble bcp-bauble-a" />
              <span className="bcp-bauble bcp-bauble-b" />
              <span className="bcp-bauble bcp-bauble-c" />
              <span className="bcp-bauble bcp-bauble-d" />
              <span className="bcp-bauble bcp-bauble-e" />
            </div>
            <div className="bcp-art-word bcp-art-word-bottom">CHRISTMAS!</div>
            <div className="bcp-art-spark bcp-art-spark-one">✦</div>
            <div className="bcp-art-spark bcp-art-spark-two">✧</div>
          </div>
        </section>

        <section className="bcp-details" id="details">
          <div className="bcp-section-kicker"><span>01 / THE DETAILS</span><span>MARK YOUR CALENDAR</span></div>
          <div className="bcp-details-inner">
            <div>
              <span className="bcp-mini-heading">YOU&apos;RE INVITED</span>
              <h2>Same family.<br /><i>New memories.</i></h2>
              <p>Come hungry and ready for the yearly family catch-up. Let&apos;s make this one a good one.</p>
            </div>
            <div className="bcp-detail-grid">
              <article><span className="bcp-detail-icon"><Clock3 size={23} /></span><small>WHEN</small><strong>Dec 27, 2026</strong><span>Sunday, 1:00 PM</span></article>
              <article><span className="bcp-detail-icon"><MapPin size={23} /></span><small>WHERE</small><strong>Pilar</strong><span>SNIP Plant Nursery · Exact map below</span></article>
              <article><span className="bcp-detail-icon"><UtensilsCrossed size={23} /></span><small>WHAT TO BRING</small><strong>Potluck!</strong><span>More food is always welcome</span></article>
              <article><span className="bcp-detail-icon"><Gift size={23} /></span><small>GIFT EXCHANGE</small><strong>₱500 max</strong><span>Spend less if you like. Unisex gifts.</span></article>
            </div>
          </div>
        </section>

        <section className="bcp-venue" aria-labelledby="bcp-venue-title">
          <div className="bcp-venue-copy">
            <span className="bcp-mini-heading">THE EXACT MEETING POINT</span>
            <h2 id="bcp-venue-title">Find us in <i>Pilar.</i></h2>
            <p>We&apos;ll see you at SNIP Plant Nursery. Use the map below for the exact pin.</p>
            <div className="bcp-venue-links">
              <a href={VENUE_URL} target="_blank" rel="noopener noreferrer"><MapPin size={17} /> Open the exact pin in Google Maps</a>
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} /> Save December 27</a>
            </div>
          </div>
          <div className="bcp-map-shell">
            <iframe title="Balenton Christmas Party exact venue map" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <a href={VENUE_URL} target="_blank" rel="noopener noreferrer">Get directions to this pin ↗</a>
          </div>
        </section>

        <section className="bcp-potluck" id="potluck">
          <div className="bcp-section-kicker bcp-kicker-cream"><span>02 / THE POTLUCK DRAW</span><span>LET FATE DECIDE YOUR DISH</span></div>
          <div className="bcp-potluck-heading">
            <div><span className="bcp-mini-heading">WHAT&apos;S COOKING?</span><h2>Draw a dish.<br /><i>Bring the love.</i></h2></div>
            <p>Seven people. Seven food assignments. Pick your name, draw once and let the Christmas food planning begin. Want to swap? You can request a trade with someone else.</p>
          </div>

          <div className="bcp-potluck-panel">
            <div className="bcp-draw-area">
              <div className="bcp-draw-head"><span className="bcp-panel-overline">YOUR LUCKY CHRISTMAS DRAW</span><span className="bcp-draw-counter">{data?.drawnCount ?? '·'} / 7 DRAWN</span></div>
              <div className="bcp-draw-graphic" aria-hidden="true"><span className={drawing ? 'bcp-gift-emblem bcp-shuffling' : 'bcp-gift-emblem'}>🎁</span><span className="bcp-draw-deco">✦</span><span className="bcp-draw-deco right">✳</span></div>
              <label className="bcp-form-label" htmlFor="bcp-name-select">FIRST, FIND YOUR NAME</label>
              <div className="bcp-select-wrap">
                <select id="bcp-name-select" value={selected} onChange={(event) => {setSelected(event.target.value); setTarget(''); setNotice(''); setError('');}}>
                  <option value="">Choose your name</option>
                  {(data?.people || ['Teng', 'Mike', 'Mark', 'Christine', 'Paulo', 'Gab', 'Geneva'].map((name) => ({ name, drawn: false, assignment: null }))).map((person) => (
                    <option key={person.name} value={person.name}>{person.name}{person.drawn ? ' ✓ Drawn' : ''}</option>
                  ))}
                </select>
                <ChevronDown size={19} aria-hidden="true" />
              </div>
              {current?.drawn ? (
                <div className="bcp-reveal" aria-live="polite">
                  <span className="bcp-reveal-tiny"><Check size={14} /> YOUR ASSIGNMENT IS LOCKED</span>
                  <strong>{current.assignment}</strong>
                  <span>Thanks, {current.name}! No redraws, but trades are allowed below.</span>
                </div>
              ) : (
                <button className="bcp-draw-button" type="button" disabled={!selected || busy || loading} onClick={() => {void send('draw');}}>
                  {drawing ? 'Picking your dish...' : loading ? 'Loading the draw...' : 'Draw my potluck'} <Sparkles size={18} />
                </button>
              )}
              <p className="bcp-honor">Honor system, please select only your own name. One permanent draw per person, no PIN required.</p>
              {error && <div className="bcp-alert bcp-alert-error" role="alert">{error}</div>}
              {notice && <div className="bcp-alert bcp-alert-success" role="status">{notice}</div>}
            </div>

            <div className="bcp-board">
              <div className="bcp-board-header"><div><span className="bcp-panel-overline">THE FAMILY FOOD BOARD</span><h3>Who&apos;s bringing what?</h3></div><button type="button" aria-label="Refresh potluck board" onClick={() => {void refresh();}} className="bcp-refresh"><RefreshCw size={17} /></button></div>
              <div className="bcp-board-list">
                {(data?.people || ['Teng', 'Mike', 'Mark', 'Christine', 'Paulo', 'Gab', 'Geneva'].map((name) => ({ name, drawn: false, assignment: null }))).map((person, index) => (
                  <div className="bcp-board-person" key={person.name}>
                    <span className="bcp-board-number">{String(index + 1).padStart(2, '0')}</span>
                    <strong>{person.name}</strong>
                    <span className={person.drawn ? 'bcp-person-dish' : 'bcp-not-drawn'}>{person.drawn ? person.assignment : 'Waiting for a draw'}</span>
                    <span className={person.drawn ? 'bcp-status-dot done' : 'bcp-status-dot'} aria-label={person.drawn ? 'Drawn' : 'Not drawn'} />
                  </div>
                ))}
              </div>
              <div className="bcp-board-bottom">{allDrawn ? 'All seven dishes have been assigned. See you at the feast!' : 'The board updates as everyone draws. Each category is assigned once.'}</div>
            </div>
          </div>

          {current?.drawn && (
            <div className="bcp-trade-panel">
              <div className="bcp-trade-intro"><span className="bcp-trade-icon"><ArrowLeftRight size={22} /></span><div><h3>Want to trade dishes?</h3><p>Send a request. The other person must accept before anything changes.</p></div></div>
              {incoming ? (
                <div className="bcp-trade-live">
                  <p><strong>{incoming.from}</strong> wants to swap <strong>{data?.people.find((person) => person.name === incoming.from)?.assignment}</strong> for your <strong>{current.assignment}</strong>.</p>
                  <div className="bcp-trade-actions">
                    <button type="button" disabled={busy} onClick={() => {void send('accept', { tradeId: incoming.id });}} className="bcp-trade-accept"><Check size={16} /> Accept swap</button>
                    <button type="button" disabled={busy} onClick={() => {void send('decline', { tradeId: incoming.id });}} className="bcp-trade-decline"><X size={16} /> No thanks</button>
                  </div>
                </div>
              ) : outgoing ? (
                <div className="bcp-trade-live">
                  <p>Waiting for <strong>{outgoing.to}</strong> to answer your trade request.</p>
                  <button type="button" disabled={busy} className="bcp-text-button" onClick={() => {void send('cancel', {tradeId: outgoing.id});}}>Cancel request</button>
                </div>
              ) : (
                <div className="bcp-trade-form">
                  <div className="bcp-select-wrap bcp-trade-select"><select aria-label="Choose a person to request a swap" value={target} onChange={(event) => setTarget(event.target.value)}>
                    <option value="">Choose someone who has drawn</option>
                    {canTradeWith.map((person) => <option key={person.name} value={person.name}>{person.name} ({person.assignment})</option>)}
                  </select><ChevronDown size={18} /></div>
                  <button type="button" disabled={!target || busy} onClick={() => {void send('offer', { to: target });}}>Request trade <ArrowLeftRight size={16} /></button>
                </div>
              )}
              <p className="bcp-trade-note">No secret approvals or redraws. Trades take effect only after acceptance. Ask the recipient to select their name above to respond.</p>
            </div>
          )}

          <div className="bcp-menu">
            <div className="bcp-menu-title"><span className="bcp-mini-heading">THE CHRISTMAS SPREAD</span><h3>What counts as potluck?</h3><p>These are our food categories. Your actual assignment comes from the draw.</p></div>
            <div className="bcp-menu-cards">{CATEGORIES.map((category) => <article key={category.title}><span>{category.icon}</span><h4>{category.title}</h4><p>{category.detail}</p></article>)}</div>
          </div>
          <div className="bcp-extra"><span>✳</span><p><strong>Feeling extra generous?</strong> Bring anything else you&apos;d like, even if it isn&apos;t your assigned dish. Extra food, snacks and surprises are always welcome!</p></div>
        </section>

        <section className="bcp-elephant" id="white-elephant">
          <div className="bcp-section-kicker"><span>03 / THE GIFT EXCHANGE</span><span>THE LEFT &amp; RIGHT EDITION</span></div>
          <div className="bcp-elephant-hero">
            <div><span className="bcp-mini-heading">NOT YOUR ORDINARY SECRET SANTA</span><h2>White Elephant.<br /><i>Balenton style.</i></h2><p>No drawing a name. No guessing who your recipient is. Just one wrapped gift, a hilarious story and a whole lot of passing LEFT and RIGHT.</p></div>
            <div className="bcp-budget-sticker"><span>THE GIFT LIMIT</span><strong>₱500</strong><span>MAXIMUM ONLY</span><small>LESS IS FINE • UNISEX • FUN</small></div>
          </div>
          <div className="bcp-rules">
            <div className="bcp-rules-heading"><Gift size={24} /><h3>The rules of the game</h3><span>KEEP IT FUN, KEEP IT FAIR</span></div>
            <div className="bcp-rules-grid">
              <article><span className="bcp-step">01</span><h4>Bring one wrapped gift</h4><p>Spend no more than ₱500. Less is completely fine. One gift per participating player. Don&apos;t write your name or the recipient&apos;s name on it.</p></article>
              <article><span className="bcp-step">02</span><h4>Unisex, no exceptions</h4><p>Make sure anyone can use or enjoy it. Food is absolutely welcome. Just skip gender-specific gifts, prank junk and things that only suit one person.</p></article>
              <article><span className="bcp-step">03</span><h4>Get in a circle</h4><p>Put gifts in a pile. Each player picks a random gift that is not their own and forms a circle. Keep it wrapped until the story ends.</p></article>
              <article><span className="bcp-step">04</span><h4>Listen for LEFT &amp; RIGHT</h4><p>Every time the reader says LEFT, pass the gift one person left. Every time they say RIGHT, pass it one person right. No skipping!</p></article>
              <article><span className="bcp-step">05</span><h4>The story decides</h4><p>No stealing, no swapping and no peeking during the game. When the story ends, the gift in your hands is yours.</p></article>
              <article><span className="bcp-step">06</span><h4>Unwrap and enjoy!</h4><p>Open your gift together, celebrate the weird and wonderful surprises, and don&apos;t forget to thank whoever brought yours.</p></article>
            </div>
          </div>

          <div className={readerMode ? 'bcp-story bcp-story-reader' : 'bcp-story'} id="christmas-story">
            <div className="bcp-story-toolbar"><span>✳ THE OFFICIAL GAME STORY</span><button type="button" onClick={() => setReaderMode(!readerMode)}>{readerMode ? 'Exit reader mode' : 'Reader mode'}</button></div>
            <div className="bcp-story-intro"><span>THE BALENTON FAMILY PRESENTS</span><h3>The Great Christmas <em>Left &amp; Right</em> Adventure</h3><p>Choose one reader. Read the passage slowly and put extra emphasis on the highlighted words. Each LEFT or RIGHT means one pass.</p><div className="bcp-directions"><span><b>← LEFT</b> pass left</span><span><b>RIGHT →</b> pass right</span></div></div>
            <div className="bcp-story-body">{STORY.map((paragraph, index) => <StoryText paragraph={paragraph} key={index} />)}</div>
            <div className="bcp-story-end">THE END <span>✳</span> NOW OPEN THOSE GIFTS!</div>
          </div>
        </section>

        <section className="bcp-guests" id="family">
          <div className="bcp-section-kicker bcp-kicker-cream"><span>04 / THE WHOLE CREW</span><span>FAMILY MAKES THE HOLIDAY</span></div>
          <div className="bcp-guests-heading"><div><span className="bcp-mini-heading">THE PEOPLE WHO MAKE IT SPECIAL</span><h2>All our <i>favorite</i> faces.</h2></div><p>Our White Elephant lineup plus the little ones who make Christmas extra fun.</p></div>
          <div className="bcp-guest-panels">
            <div className="bcp-guest-card"><div className="bcp-guest-card-title"><span><Users size={20} /> WHITE ELEPHANT PLAYERS</span><strong>{ADULTS.length}</strong></div><div className="bcp-name-grid">{ADULTS.map((name, index) => <span key={index}><i>✳</i> {name}</span>)}</div></div>
            <div className="bcp-guest-card bcp-kids-card"><div className="bcp-guest-card-title"><span><Heart size={20} /> THE LITTLE CREW</span><strong>{KIDS.length}</strong></div><div className="bcp-name-grid">{KIDS.map((name, index) => <span key={index}><i>✦</i> {name}</span>)}</div><p className="bcp-guest-footnote">Kids are listed separately from the main White Elephant players.</p></div>
          </div>
        </section>

        <section className="bcp-finale"><div className="bcp-finale-spark">✶</div><span>FROM OUR FAMILY TO YOURS</span><h2>See you around<br />the <i>Christmas table.</i></h2><p>Bring your appetite, your wrapped gift and your best Christmas spirit.</p><a href="#home">BACK TO TOP ↑</a></section>
      </main>
      <footer className="bcp-footer"><span>© 2026 THE BALENTON FAMILY</span><span>MADE FOR FAMILY, WITH LOVE ♡</span></footer>
    </div>
  );
}
