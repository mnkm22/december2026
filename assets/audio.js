// Ambient drone + effects, generated in the browser (no audio files). Starts on first tap/keypress.
let ctx,master,started=0,muted=false;
try{muted=localStorage.getItem('wm')==='1'}catch{}
function drone(){
  const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=380;lp.Q.value=6;
  const g=ctx.createGain();g.gain.value=.16;lp.connect(g);g.connect(master);
  [55,55.4,82.4,110.3].forEach((f,i)=>{const o=ctx.createOscillator();o.type=i<2?'sawtooth':'triangle';o.frequency.value=f;o.connect(lp);o.start()});
  const l=ctx.createOscillator(),lg=ctx.createGain();l.frequency.value=.08;lg.gain.value=220;l.connect(lg);lg.connect(lp.frequency);l.start();
  let k=0;const notes=[220,261.6,196,174.6];
  const step=()=>{const t=ctx.currentTime,o=ctx.createOscillator(),e=ctx.createGain();o.type='sine';o.frequency.value=notes[k++%4];
    e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(.05,t+.05);e.gain.exponentialRampToValueAtTime(.0001,t+2.2);
    o.connect(e);e.connect(master);o.start(t);o.stop(t+2.4)};
  step();setInterval(step,2400);
}
window.snd={
  start(){
    if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=muted?0:.5;master.connect(ctx.destination)}
    if(ctx.state==='suspended')ctx.resume();
    if(!started){started=1;drone()}
  },
  ping(){
    if(!ctx||muted)return;const t=ctx.currentTime,o=ctx.createOscillator(),e=ctx.createGain();
    o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.exponentialRampToValueAtTime(1760,t+.08);
    e.gain.setValueAtTime(.3,t);e.gain.exponentialRampToValueAtTime(.001,t+.25);
    o.connect(e);e.connect(master);o.start(t);o.stop(t+.3);
  },
  mute(m){muted=m;try{localStorage.setItem('wm',m?'1':'0')}catch{}if(master)master.gain.value=m?0:.5},
  isMuted:()=>muted
};
