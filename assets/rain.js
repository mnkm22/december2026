const c=document.getElementById('rain'),x=c.getContext('2d'),s=16;let d=[];
function fit(){c.width=innerWidth;c.height=innerHeight;d=Array(Math.ceil(c.width/s)).fill(0).map(()=>Math.random()*c.height/s)}
fit();addEventListener('resize',fit);
const ch='0123456789<>=+*#%&';
setInterval(()=>{x.fillStyle='rgba(2,10,5,.12)';x.fillRect(0,0,c.width,c.height);x.fillStyle=window.rc||'#37ff7a';x.font=s+'px monospace';
d.forEach((y,i)=>{x.fillText(ch[Math.random()*ch.length|0],i*s,y*s);d[i]=y*s>c.height&&Math.random()>.975?0:y+1})},60);
