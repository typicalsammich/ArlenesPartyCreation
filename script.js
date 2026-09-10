document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-btn');
menu.addEventListener('click',()=>{ const open=header.classList.toggle('menu-open'); menu.setAttribute('aria-expanded',String(open)); });
document.querySelectorAll('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('menu-open')));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const projects = [
  {image:'assets/instagram-03.jpg',category:'BABY SHOWER',title:'Baby Hernandez',script:'In Bloom',description:'A bright and beautiful setup to celebrate a little one on the way. Custom backdrop, balloons, florals, and photo-ready details brought together in one polished look.',tags:['all','baby','backdrops']},
  {image:'assets/instagram-01.jpg',category:'SPECIAL EVENT',title:"She’s a Tini",script:'Bit Older',description:'An olive-green and blush martini-inspired celebration with sculptural balloon work, a custom statement backdrop and playful oversized details.',tags:['all','special','backdrops']},
  {image:'assets/instagram-05.jpg',category:'BIRTHDAY',title:'Leilani & Liani',script:'Berry First Birthday',description:'A juicy strawberry-inspired first birthday with glossy red and pink balloons, florals, custom signage and a statement marquee number.',tags:['all','birthday','backdrops']},
  {image:'assets/instagram-02.jpg',category:'BIRTHDAY',title:'Kaiden',script:'Dodgers 10',description:'A sporty Dodgers setup layered with blue-and-white balloon clusters, oversized baseball details and a custom player-style backdrop.',tags:['all','birthday','backdrops']},
  {image:'assets/instagram-04.jpg',category:'BIRTHDAY',title:'Jaxxon’s',script:'First Lap',description:'A warm race-day first birthday featuring bold balloon clusters, racing details, custom signage and a photo-ready backdrop.',tags:['all','birthday','backdrops']},
  {image:'assets/instagram-06.jpg',category:'SPECIAL EVENT',title:'Charlie Paula',script:'Happy Birthday',description:'A candy-colored birthday scene with layered pink, white and lavender balloon styling, themed props and a playful multi-panel backdrop.',tags:['all','birthday','special','backdrops']},
  {image:'assets/instagram-07.jpg',category:'BALLOON ARCH',title:'Celebrate',script:'In Style',description:'A large-scale balloon arch built to frame the entrance and make the celebration feel special before guests even step inside.',tags:['all','arches','special']},
  {image:'assets/instagram-08.jpg',category:'SPECIAL EVENT',title:'Boo',script:'But Make It Cute',description:'A glam Halloween arrangement with blush, black, white and metallic balloons, hanging fringe and oversized BOO letters.',tags:['all','special']}
];

let current = 0;
let activeFilter = 'all';
const featuredImage = document.getElementById('featuredImage');
const featuredCategory = document.getElementById('featuredCategory');
const featuredTitle = document.getElementById('featuredTitle');
const featuredScript = document.getElementById('featuredScript');
const featuredDescription = document.getElementById('featuredDescription');
const dots = document.querySelector('.project-dots');
const sideCards = [...document.querySelectorAll('.side-card')];

function filteredIndexes(){
  return projects.map((p,i)=>({p,i})).filter(x=>x.p.tags.includes(activeFilter)).map(x=>x.i);
}
function renderDots(){
  const indexes = filteredIndexes();
  dots.innerHTML = indexes.map(i=>`<button aria-label="Show project ${i+1}" class="${i===current?'active':''}" data-dot="${i}"></button>`).join('');
  dots.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{current=Number(btn.dataset.dot);renderProject();}));
}
function renderSideCards(){
  const indexes = filteredIndexes();
  let pos = indexes.indexOf(current);
  if(pos<0){current=indexes[0]??0;pos=0;}
  sideCards.forEach((card,offset)=>{
    const idx = indexes[(pos+offset+1)%indexes.length] ?? current;
    const project = projects[idx];
    card.dataset.index = idx;
    const img = card.querySelector('img');
    img.src = project.image;
    img.alt = `${project.title} ${project.script} setup`;
  });
}
function renderProject(){
  const p = projects[current];
  featuredImage.classList.add('swap');
  setTimeout(()=>{
    featuredImage.src=p.image;
    featuredImage.alt=`${p.title} ${p.script} party setup`;
    featuredCategory.textContent=p.category;
    featuredTitle.textContent=p.title;
    featuredScript.textContent=p.script;
    featuredDescription.textContent=p.description;
    featuredImage.classList.remove('swap');
  },120);
  renderDots();
  renderSideCards();
}
function step(direction){
  const indexes=filteredIndexes();
  if(!indexes.length)return;
  let pos=indexes.indexOf(current);
  if(pos<0)pos=0;
  current=indexes[(pos+direction+indexes.length)%indexes.length];
  renderProject();
}

document.querySelector('.project-arrow.prev').addEventListener('click',()=>step(-1));
document.querySelector('.project-arrow.next').addEventListener('click',()=>step(1));
sideCards.forEach(card=>card.addEventListener('click',()=>{current=Number(card.dataset.index);renderProject();}));
document.querySelectorAll('.project-tab').forEach(tab=>tab.addEventListener('click',()=>{
  activeFilter=tab.dataset.filter;
  document.querySelectorAll('.project-tab').forEach(t=>t.classList.toggle('active',t===tab));
  const indexes=filteredIndexes();
  current=indexes[0]??0;
  renderProject();
}));
renderProject();

function handleSubmit(e){
  e.preventDefault();
  const form=e.currentTarget;
  const status=form.querySelector('.form-status');
  status.textContent='Thanks! Connect this form to Formspree, Basin, or your preferred CRM before launch.';
  return false;
}


// iOS Safari scroll recovery: never leave the document body locked after first paint/history restore.
function ensurePageScrollable(){
  document.documentElement.style.overflowY = 'auto';
  document.documentElement.style.height = 'auto';
  document.body.style.overflowY = 'visible';
  document.body.style.height = 'auto';
  document.body.style.position = '';
}
window.addEventListener('pageshow', ensurePageScrollable, {passive:true});
window.addEventListener('load', ensurePageScrollable, {passive:true});
window.addEventListener('orientationchange', ()=>setTimeout(ensurePageScrollable, 120), {passive:true});
document.addEventListener('DOMContentLoaded', ensurePageScrollable, {once:true});
