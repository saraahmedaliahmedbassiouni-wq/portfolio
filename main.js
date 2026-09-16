// Loader
const hideLoader = () => document.getElementById('loader').classList.add('hide');
window.addEventListener('load', () => setTimeout(hideLoader, 1400));
setTimeout(hideLoader, 2500);

// Clock
function tick(){
  const d = new Date();
  document.getElementById('clock').textContent =
    d.toLocaleTimeString('en-GB');
}
setInterval(tick, 1000); tick();

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Typing effect
const phrases = [
  'Data Analyst 📊',
  'Python • SQL • Power BI',
  'I clean data. I find insights.',
  'Turning raw data into decisions.'
];
let p=0, c=0, deleting=false;
const typedEl = document.getElementById('typed');
function type(){
  const current = phrases[p];
  if(!deleting){
    typedEl.textContent = current.substring(0, c++);
    if(c > current.length){ deleting=true; setTimeout(type, 1400); return; }
  } else {
    typedEl.textContent = current.substring(0, c--);
    if(c === 0){ deleting=false; p=(p+1)%phrases.length; }
  }
  setTimeout(type, deleting?40:80);
}
type();

// Sidebar nav
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const pageTitle = document.getElementById('pageTitle');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').substring(1);
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    sections.forEach(s => s.classList.toggle('active-section', s.id === id));
    pageTitle.textContent = link.textContent.trim();
    document.querySelector('.sidebar').classList.remove('open');
    window.scrollTo({top:0,behavior:'smooth'});
    if(id === 'skills') animateBars();
    if(id === 'overview') animateCounters();
  });
});

// Mobile menu
document.getElementById('menuBtn').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('open');
});

// Counters
function animateCounters(){
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.dataset.target;
    let n = 0;
    const step = Math.max(1, target/60);
    const iv = setInterval(() => {
      n += step;
      if(n >= target){ n = target; clearInterval(iv); }
      el.textContent = Math.floor(n);
    }, 25);
  });
}
animateCounters();

// Skill bars
function animateBars(){
  document.querySelectorAll('.bar span').forEach(b => {
    b.style.width = b.dataset.width;
  });
}

// Tabs
const tabs = document.querySelectorAll('.tab');
tabs.forEach(t => {
  t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(t.dataset.tab).classList.add('active');
  });
});

// Search filter (nav only)
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  navLinks.forEach(l => {
    l.style.display = l.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
  });
});