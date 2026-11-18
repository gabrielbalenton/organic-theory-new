import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Gift, Lightbulb, RotateCcw, Sparkles, X } from 'lucide-react';
import './ChristmasExtras.css';

const CHILDREN = ['Luigi','Marga','Franco','Nathan','Mikee','Mygo','Theo'];
const PRESENT_COLORS = ['red','gold','green','cream','pine','rose'];
const SURPRISES = [
  'Merry Christmas! You found a secret greeting.',
  'You get a Christmas high five!',
  'That present was full of holiday sparkles.',
  'An extra helping of dessert sounds pretty good.',
  'You just earned the title of Christmas explorer!',
  'A little holiday luck is headed your way.',
];

export function ChristmasOpening({ visible, onClose }: {visible:boolean; onClose:()=>void}) {
  const [opening, setOpening] = useState(false);
  useEffect(() => { if (visible) setOpening(false); },[visible]);
  if (!visible) return null;

  const unwrap = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onClose, 1400);
  };

  return <div className={'bcp-intro ' + (opening ? 'bcp-intro-unwrapping' : '')} role="dialog" aria-modal="true" aria-label="Christmas invitation">
    <div className="bcp-intro-snow" aria-hidden="true">
      {Array.from({length:27},(_,i)=><span key={i} style={{
        left:((i*37+11)%97)+'%', animationDelay:(-i*.71)+'s',
        animationDuration:(6+(i%7))+'s', opacity:.22+(i%4)*.12,
      }} />)}
    </div>
    <button type="button" className="bcp-intro-skip" onClick={onClose}>SKIP INTRO <X size={15}/></button>
    <div className="bcp-intro-center">
      <div className="bcp-intro-eyebrow">THE BALENTON FAMILY PRESENTS</div>
      <h2>Someone left you <em>a present.</em></h2>
      <button type="button" className="bcp-intro-present" onClick={unwrap} aria-label="Open your Christmas present">
        <span className="bcp-intro-gift-light" />
        <span className="bcp-intro-present-lid" />
        <span className="bcp-intro-present-box" />
        <span className="bcp-intro-present-ribbon-vertical" />
        <span className="bcp-intro-present-ribbon-horizontal" />
        <span className="bcp-intro-present-bow">✳</span>
        <span className="bcp-intro-explosion" aria-hidden="true">✦ ✳ ✶ ✦ ✳ ✶</span>
      </button>
      <p>{opening ? 'Merry Christmas!' : 'Tap the present to open your invitation.'}</p>
    </div>
    <span className="bcp-intro-corner bcp-intro-corner-tl">✦</span>
    <span className="bcp-intro-corner bcp-intro-corner-br">✦</span>
  </div>;
}

export function GiftPassingDemo() {
  const [offset, setOffset] = useState(0);
  const [lastDirection, setLastDirection] = useState<'left'|'right'|null>(null);
  const pass = (direction:'left'|'right') => {
    setLastDirection(direction);
    setOffset((prev) => prev + (direction === 'left' ? 1 : -1));
  };
  const reset = () => { setOffset(0); setLastDirection(null); };

  return <div className="bcp-demo">
    <div className="bcp-demo-head">
      <div><span className="bcp-mini-heading">TRY THE LEFT / RIGHT IDEA</span><h3>See how the gifts travel.</h3><p>Just a demonstration. At the party, the narrator reads the story and everyone passes together.</p></div>
      <span className="bcp-demo-label">PRACTICE MODE ONLY</span>
    </div>
    <div className="bcp-demo-body">
      <div className="bcp-demo-circle">
        <div className="bcp-demo-middle"><span>✳</span><small>{lastDirection ? 'PASSED '+lastDirection.toUpperCase() : 'TAP A DIRECTION'}</small></div>
        {Array.from({length:6},(_,i)=>{
          const angle = i*2*Math.PI/6-Math.PI/2;
          return <div key={'seat'+i} className="bcp-demo-seat" style={{left:'calc(50% + '+(Math.cos(angle)*138)+'px)',top:'calc(50% + '+(Math.sin(angle)*138)+'px)'}}>
            <span className="bcp-demo-seat-face">{i+1}</span>
          </div>;
        })}
        {PRESENT_COLORS.map((color,index)=>{
          const angle = (index+offset)*Math.PI/3-Math.PI/2;
          return <div className={'bcp-demo-moving-present bcp-demo-present-'+color} key={color} style={{
            transform:'translate(-50%,-50%) translate('+(Math.cos(angle)*87)+'px,'+(Math.sin(angle)*87)+'px)',
          }}><span className="bcp-demo-present-ribbon"/></div>;
        })}
      </div>
      <div className="bcp-demo-controls">
        <p>When you hear a direction, pass your current gift to the next person that way.</p>
        <div className="bcp-demo-buttons">
          <button type="button" onClick={()=>pass('left')}><ArrowLeft size={21}/> PASS LEFT</button>
          <button type="button" onClick={()=>pass('right')}>PASS RIGHT <ArrowRight size={21}/></button>
        </div>
        <button className="bcp-demo-reset" type="button" onClick={reset}><RotateCcw size={15}/> Reset demonstration</button>
      </div>
    </div>
  </div>;
}

export function KidsChristmasCorner() {
  const [lightsOn, setLightsOn] = useState(true);
  const [ornaments,setOrnaments] = useState<number[]>([0,1,2,3]);
  const [surprise,setSurprise] = useState<string|null>(null);
  const [opened,setOpened] = useState<number[]>([]);
  const dots = [[44,40],[59,48],[34,62],[53,70],[66,79],[39,82],[50,29],[49,57],[59,64]];
  const addOrnament = () => {
    setOrnaments((current) => current.length >= dots.length ? [0,1,2,3] : [...current,current.length]);
  };
  const openPresent = (index:number) => {
    setOpened((current)=>current.includes(index)?current:[...current,index]);
    setSurprise(SURPRISES[index]);
  };

  return <section className="bcp-kids-corner" id="kids-corner">
    <div className="bcp-section-kicker bcp-kicker-cream"><span>05 / CHRISTMAS FUN FOR THE KIDS</span><span>THE LITTLE CREW</span></div>
    <div className="bcp-kids-heading"><span className="bcp-mini-heading">A LITTLE SOMETHING EXTRA</span><h2>The kids&apos; <i>Christmas corner.</i></h2><p>Help decorate the tree, light it up and discover what&apos;s hiding inside the presents.</p></div>
    <div className="bcp-kids-playground">
      <div className="bcp-kids-tree-section">
        <span className="bcp-kids-label">MAKE THIS TREE YOURS</span>
        <div className={'bcp-kids-tree '+(lightsOn?'bcp-kids-lights-on':'bcp-kids-lights-off')}>
          <div className="bcp-kids-tree-star" aria-hidden="true">✶</div>
          <div className="bcp-kids-tree-shape" aria-hidden="true" />
          <div className="bcp-kids-tree-trunk" aria-hidden="true" />
          {ornaments.map((n)=><span key={n} className="bcp-kids-ornament" style={{left:dots[n][0]+'%',top:dots[n][1]+'%',backgroundColor:['#edb45e','#a72f35','#eedc9b','#e96b56'][n%4]}} />)}
        </div>
        <div className="bcp-kids-tree-actions">
          <button type="button" onClick={addOrnament}><Sparkles size={17}/> {ornaments.length===dots.length ? 'Start decorating again' : 'Add an ornament'}</button>
          <button type="button" onClick={()=>setLightsOn(v=>!v)}><Lightbulb size={17}/>{lightsOn?'Turn off lights':'Turn on lights'}</button>
        </div>
      </div>
      <div className="bcp-kids-presents-section">
        <span className="bcp-kids-label">PICK A PRESENT TO UNWRAP</span>
        <h3>Every box has a tiny surprise.</h3>
        <div className="bcp-kids-gift-grid">
          {PRESENT_COLORS.map((color,index)=><button type="button" className={'bcp-kids-gift bcp-kids-gift-'+color+(opened.includes(index)?' is-open':'')} key={color} onClick={()=>openPresent(index)} aria-label={'Open surprise present '+(index+1)}>
            <span className="bcp-kids-box"><span className="bcp-kids-bow">✳</span></span>
            <small>{opened.includes(index)?'OPEN AGAIN':'TAP TO OPEN'}</small>
          </button>)}
        </div>
        <div className="bcp-kids-surprise" role="status" aria-live="polite">{surprise ? <><Sparkles size={19}/><strong>{surprise}</strong></> : <><Gift size={19}/><span>Choose a present to reveal a Christmas message.</span></>}</div>
        <div className="bcp-kids-names">{CHILDREN.map((name)=><span key={name}>{name}</span>)}</div>
      </div>
    </div>
  </section>;
}
