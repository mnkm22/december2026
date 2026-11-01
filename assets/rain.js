const c=document.getElementById('rain'),x=c.getContext('2d'),s=16;let d=[];
function fit(){c.width=innerWidth;c.height=innerHeight;d=Array(Math.ceil(c.width/s)).fill(0).map(()=>Math.random()*c.height/s)}
fit();addEventListener('resize',fit);
const ch='0123456789<>=+*#%&';
window.rainT=setInterval(()=>{x.fillStyle='rgba(2,10,5,.12)';x.fillRect(0,0,c.width,c.height);x.fillStyle=window.rc||'#37ff7a';x.font=s+'px monospace';
d.forEach((y,i)=>{x.fillText(ch[Math.random()*ch.length|0],i*s,y*s);d[i]=y*s>c.height&&Math.random()>.975?0:y+1})},60);

window.startRuins=()=>{
  clearInterval(window.rainT);c.style.opacity=1;document.body.classList.remove('scan');
  const dust=Array.from({length:80},()=>({x:Math.random(),y:Math.random(),s:Math.random()*2+.5,v:Math.random()*.02+.005})),
    trees=Array.from({length:41},()=>Math.random()*.05),ridge=Array.from({length:31},()=>Math.random()*.05);
  (function f(t){
    const w=c.width,h=c.height,cx=w/2,ly=h*.62,lrx=w*.47,lry=h*.105;
    const temple=(X,Y,S)=>{x.fillStyle='#0a0704';x.fillRect(X-S*.5,Y-S*.12,S,S*.12);x.fillRect(X-S*.4,Y-S*.42,S*.8,S*.3);
      x.beginPath();x.moveTo(X-S*.62,Y-S*.4);x.lineTo(X,Y-S);x.lineTo(X+S*.62,Y-S*.4);x.closePath();x.fill();
      x.fillStyle='rgba(255,170,60,'+(.6+.4*Math.sin(t/160+X))+')';x.fillRect(X-S*.07,Y-S*.3,S*.14,S*.18);
      x.strokeStyle='rgba(255,201,74,.35)';x.lineWidth=2;x.beginPath();x.moveTo(X-S*.62,Y-S*.4);x.lineTo(X,Y-S);x.lineTo(X+S*.62,Y-S*.4);x.stroke()};
    let g=x.createLinearGradient(0,0,0,h*.5);g.addColorStop(0,'#0e1518');g.addColorStop(.6,'#8a5418');g.addColorStop(1,'#e0a23a');
    x.fillStyle=g;x.fillRect(0,0,w,h);
    g=x.createRadialGradient(cx,h*.44,5,cx,h*.44,h*.55);g.addColorStop(0,'rgba(255,214,120,.75)');g.addColorStop(1,'rgba(255,201,74,0)');
    x.fillStyle=g;x.fillRect(0,0,w,h);
    x.fillStyle='#1b130c';x.beginPath();x.moveTo(0,h*.5);ridge.forEach((r,i)=>x.lineTo(i*w/30,h*(.43-r)));x.lineTo(w,h*.5);x.fill();
    x.fillStyle='#0f1710';x.fillRect(0,h*.45,w,h*.08);
    x.fillStyle='#0c0805';x.fillRect(0,h*.52,w,h*.48);
    g=x.createLinearGradient(0,ly-lry,0,ly+lry);g.addColorStop(0,'#d99a35');g.addColorStop(1,'#16140c');
    x.fillStyle=g;x.beginPath();x.ellipse(cx,ly,lrx,lry,0,0,6.283);x.fill();
    for(let i=0;i<22;i++){x.fillStyle='rgba(255,226,150,'+(.25+.3*Math.sin(t/400+i*1.7))+')';const ww=8+i*5;x.fillRect(cx-ww/2,ly-lry*.9+i*lry*.085,ww,2)}
    x.fillStyle='#0a0704';x.beginPath();x.ellipse(cx,ly-h*.005,w*.025,h*.007,0,0,6.283);x.fill();
    x.fillStyle='rgba(255,215,120,.95)';x.fillRect(cx-2,ly-h*.025,4,h*.02);
    x.fillStyle='rgba(255,140,40,'+(.6+.4*Math.sin(t/120))+')';x.fillRect(cx-w*.02,ly-h*.012,3,3);x.fillRect(cx+w*.02,ly-h*.012,3,3);
    for(let i=0;i<26;i++){const a=i/25*Math.PI;x.fillStyle='rgba(255,150,50,'+(.45+.45*Math.sin(t/140+i*2.3))+')';x.fillRect(cx+Math.cos(a)*lrx*1.02,ly+Math.sin(a)*lry*1.02,3,3)}
    for(let i=0;i<3;i++){x.fillStyle='rgba(255,220,150,.06)';x.fillRect(0,ly-h*.04+i*h*.04+Math.sin(t/1800+i*2)*8,w,h*.05)}
    x.fillStyle='#050301';x.beginPath();x.moveTo(0,h);trees.forEach((r,i)=>x.lineTo(i*w/40,h*(.88-r)));x.lineTo(w,h);x.fill();
    temple(w*.13,h*.92,w*.2);temple(w*.88,h*.88,w*.16);
    dust.forEach(p=>{p.y-=p.v;if(p.y<0)p.y=1;x.fillStyle='rgba(255,215,120,'+(.35+.35*Math.sin(t/500+p.x*30))+')';x.fillRect(p.x*w,p.y*h,p.s,p.s)});
    requestAnimationFrame(f)})(0);
};
