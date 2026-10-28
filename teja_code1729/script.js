const CONFIG={pin:"1729",petalsWelcome:18,petalsRose:55,petalsLetter:24,petalsEnding:65,petalsSurprise:180};
let transitionBusy=false;
function go(id){
 const target=document.getElementById(id), current=document.querySelector('.scene:target')||[...document.querySelectorAll('.scene')].find(s=>s.getBoundingClientRect().top<=5&&s.getBoundingClientRect().bottom>5);
 if(!target)return;
 const order=['intro','birthday','unlock','roses','memories','music','letter','ending'];const progress=document.querySelectorAll('.journey-dot');const index=order.indexOf(id);progress.forEach((dot,i)=>dot.classList.toggle('active',i===Math.round(index*(progress.length-1)/(order.length-1))));
 if(transitionBusy){target.scrollIntoView({behavior:'smooth'});return;}
 if(id==='birthday')petalShower(CONFIG.petalsSurprise);
 else if(id==='roses')petalShower(CONFIG.petalsRose);
 else if(id==='letter')petalShower(CONFIG.petalsLetter);
 else if(id==='ending')petalShower(CONFIG.petalsEnding);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){target.scrollIntoView({behavior:'auto'});return;}
 transitionBusy=true;const veil=document.getElementById('transitionVeil');
 if(current)current.classList.add('leaving');veil.classList.remove('fade');veil.classList.add('active');
 setTimeout(()=>{target.scrollIntoView({behavior:'smooth'});target.classList.add('arriving');veil.classList.add('fade');setTimeout(()=>{veil.classList.remove('active','fade');if(current)current.classList.remove('leaving');target.classList.remove('arriving');transitionBusy=false;},900);},320);
}
function missing(img,label){img.style.display='none';const p=img.parentElement;p.classList.add('missing');const span=document.createElement('span');span.className='placeholder';span.textContent=label;p.appendChild(span)}
document.querySelectorAll('.pin input').forEach((input,i,all)=>{input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(-1);if(input.value&&all[i+1])all[i+1].focus();if(i===all.length-1&&input.value)unlock()});input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value&&all[i-1])all[i-1].focus();if(e.key==='Enter')unlock()})});
function unlock(){const value=[...document.querySelectorAll('.pin input')].map(i=>i.value).join('');const msg=document.getElementById('pinmsg');if(value===CONFIG.pin){msg.textContent='You found our little secret…';document.getElementById('secretReveal').classList.add('show');petalShower(90)}else{msg.textContent='Not quite — try again.';document.querySelectorAll('.pin input').forEach(i=>i.value='')}}
function continueAfterSecret(){document.getElementById('secretReveal').classList.remove('show');go('roses')}
function petalShower(count=10){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;for(let i=0;i<count;i++){const p=document.createElement('div');p.className='petal';p.textContent=Math.random()>.18?['❀','✿','❁','❀'][Math.floor(Math.random()*4)]:'♡';p.style.left=Math.random()*100+'vw';p.style.top=(-15-Math.random()*95)+'px';p.style.fontSize=(13+Math.random()*24)+'px';p.style.color=Math.random()>.18?'#fffdf5':(Math.random()>.5?'#f3d7df':'#d7a0ac');p.style.setProperty('--drift',(Math.random()*180-90)+'px');p.style.setProperty('--rot',(Math.random()*900-450)+'deg');p.style.animationDuration=(5+Math.random()*7)+'s';p.style.animationDelay=(Math.random()*2.1)+'s';p.addEventListener('click',()=>{p.textContent='✧';p.animate([{transform:'scale(1)',opacity:.8},{transform:'scale(2)',opacity:0}],{duration:450});setTimeout(()=>p.remove(),460)});document.body.appendChild(p);setTimeout(()=>p.remove(),14500)}}
document.querySelectorAll('.note-card').forEach(card=>card.addEventListener('click',()=>{if(card.classList.contains('open'))petalShower(8)}));
function magic(){petalShower(35);const b=document.getElementById('bouquet');if(b)b.animate([{transform:'scale(1)'},{transform:'scale(1.12) rotate(3deg)'},{transform:'scale(1)'}],{duration:850,easing:'ease-out'})}
function openLetter(){const r=document.getElementById('letterReveal');r.classList.add('show');document.getElementById('envelope').classList.add('open');petalShower(9)}
const audio=document.getElementById('audio'),vinyl=document.getElementById('vinyl'),playBtn=document.getElementById('play');
audio.addEventListener('loadedmetadata',()=>{document.getElementById('duration').textContent=time(audio.duration);document.getElementById('state').textContent='Ready to play'});
audio.addEventListener('timeupdate',()=>{document.getElementById('current').textContent=time(audio.currentTime);document.getElementById('seek').value=audio.duration?audio.currentTime/audio.duration*100:0});
audio.addEventListener('play',()=>{vinyl.classList.add('playing');playBtn.textContent='Ⅱ';document.getElementById('state').textContent='Now playing'});
audio.addEventListener('pause',()=>{vinyl.classList.remove('playing');playBtn.textContent='▶';document.getElementById('state').textContent='Paused'});
audio.addEventListener('ended',()=>{vinyl.classList.remove('playing');playBtn.textContent='▶';document.getElementById('state').textContent='Song finished'});
function togglePlay(){if(audio.paused)audio.play().catch(()=>document.getElementById('state').textContent='Could not play file — check the MP3.');else audio.pause()}
document.getElementById('seek').addEventListener('input',e=>{if(audio.duration)audio.currentTime=Number(e.target.value)/100*audio.duration});
document.getElementById('volume').addEventListener('input',e=>audio.volume=Number(e.target.value));
function time(s){if(!Number.isFinite(s))return'0:00';return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0')}
function restart(){document.getElementById('secretReveal').classList.remove('show');audio.pause();audio.currentTime=0;document.querySelectorAll('.note-card').forEach(c=>c.classList.remove('open'));document.getElementById('letterReveal').classList.remove('show');document.getElementById('envelope').classList.remove('open');document.querySelectorAll('.pin input').forEach(i=>i.value='');go('intro')}
petalShower(CONFIG.petalsWelcome);
// Keep the first chapter highlighted on initial load.
document.querySelectorAll('.journey-dot').forEach((dot,i)=>dot.classList.toggle('active',i===0));
