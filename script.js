// Mobile menu (simple toggle for demo)
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = nav.style.display === 'block';
    nav.style.display = open ? 'none' : 'block';
    menuBtn.setAttribute('aria-expanded', String(!open));
  });
}

// Filter logic
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

function applyFilter(category){
  cards.forEach(c => {
    const match = category === 'all' || c.dataset.category === category;
    c.style.display = match ? 'block' : 'none';
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.category);
  });
});

// Scroll reveal with IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });
reveals.forEach(el => io.observe(el));

// Lightbox
const lightbox = document.getElementById('lightbox');
const iframe = document.getElementById('lightbox-iframe');

function openLightbox(src){
  iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function closeLightbox(){
  iframe.src = '';
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

lightbox?.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-close')) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

// Card click opens lightbox
const cardsArr = Array.from(cards);
cardsArr.forEach(card => {
  card.addEventListener('click', () => {
    const url = card.getAttribute('data-video');
    if (url) openLightbox(url);
  });
});
