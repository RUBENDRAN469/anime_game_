const H=[
{n:"MOGUL KHAN",c:"莫骨爾 · 可汗",f:"DIRE",g:"M",s:[25,20,18],r:150,m:310,col:"#e0432b",t:"A roaring berserker who thrives in the thick of battle, calling foes into a spinning storm of steel.",q:["Who dares stand before me?","Come closer — I’m not finished.","Blood for the Dire!"]},
{n:"NEVERMORE",c:"影魔",f:"DIRE",g:"N",s:[21,22,20],r:500,m:315,col:"#b32bd1",t:"A shadow of three souls, feeding on the fallen and unleashing razor-lines of ruin.",q:["Souls, feed me.","The raze is eternal.","Nevermore… will you flee."]},
{n:"DRAGON KNIGHT",c:"龍騎士",f:"RADIANT",g:"D",s:[22,15,16],r:150,m:320,col:"#ff8a1f",t:"A knight who wears the dragon’s fire — in his true form, burning anything that stands in his path.",q:["Fire and steel!","Scales harden, will unbent.","Kneel before the dragon."]}];
const $=i=>document.getElementById(i);let cur=0,col=H[0].col;
const tabs=$('tabs'),rk=$('rk');
H.forEach((h,i)=>{const b=document.createElement('button');b.className='tab';b.textContent=h.n;b.onclick=()=>set(i);tabs.append(b);
const r=document.createElement('div');r.className='row';r.innerHTML=`<div class="n">${i+1}<sup>${['st','nd','rd'][i]}</sup>.</div><div><h3>${h.n}</h3><span>${h.c}</span></div><div class="go">VIEW →</div>`;r.onclick=()=>{set(i);$('heroes').scrollIntoView()};rk.append(r)});
let tm;function type(el,txt){clearTimeout(tm);el.textContent='';let k=0;(function s(){if(k<=txt.length){el.textContent=txt.slice(0,k++);tm=setTimeout(s,35)}})()}
let li=0;function line(){type($('q'),H[cur].q[li++%3])}
function set(i){cur=i;const h=H[i];col=h.col;document.documentElement.style.setProperty('--glow',h.col);
$('hn').textContent=h.n;$('hc').textContent=h.c;$('hp').textContent=h.t;$('cn1').textContent=h.n;$('cn2').textContent=h.c;$('cp').textContent=h.t;
$('fac').textContent=h.f;$('big').textContent=h.g;$('ar').textContent=h.r;$('ms').textContent=h.m;
[...tabs.children].forEach((t,k)=>t.classList.toggle('on',k==i));
h.s.forEach((v,k)=>{$('b'+k).style.width=Math.min(100,v*3.6)+'%';let n=0;const e=$('v'+k);clearInterval(e.t);e.t=setInterval(()=>{n+=1;e.textContent=Math.min(n,v);if(n>=v)clearInterval(e.t)},30)});
li=0;line()}
$('nx').onclick=line;
document.querySelectorAll('.acc button').forEach(b=>b.onclick=()=>{const a=b.parentElement,o=a.classList.contains('on');document.querySelectorAll('.acc').forEach(x=>x.classList.remove('on'));if(!o)a.classList.add('on')});
// torn edge
let p=['0% 100%'];for(let i=0;i<=40;i++)p.push((i*2.5)+'% '+(30+Math.random()*60)+'%');p.push('100% 100%');
document.querySelector('.paper').style.setProperty('--torn','polygon('+p.join(',')+')');
// reveal
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
// cursor glow + sigil parallax
const cu=$('cur'),sg=$('sigil');
addEventListener('pointermove',e=>{cu.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
sg.style.transform=`translateY(-50%) translate(${(e.clientX/innerWidth-.5)*-30}px,${(e.clientY/innerHeight-.5)*-30}px)`});
// embers
const cv=$('fx'),x=cv.getContext('2d');let W,Hh,ps=[];
function rs(){W=cv.width=cv.offsetWidth;Hh=cv.height=cv.offsetHeight}rs();addEventListener('resize',rs);
for(let i=0;i<90;i++)ps.push({x:Math.random()*2000,y:Math.random()*1000,r:Math.random()*2+.5,v:Math.random()*.8+.3,d:Math.random()*6});
(function f(t){x.clearRect(0,0,W,Hh);ps.forEach(q=>{q.y-=q.v;q.x+=Math.sin(t/800+q.d)*.4;if(q.y<-10){q.y=Hh+10;q.x=Math.random()*W}
x.globalAlpha=.4+.5*Math.sin(t/300+q.d);x.fillStyle=col;x.shadowColor=col;x.shadowBlur=8;x.beginPath();x.arc(q.x%W,q.y,q.r,0,7);x.fill()});requestAnimationFrame(f)})(0);
set(0);
