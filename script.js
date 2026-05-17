(function () {
  'use strict';

  /* ----- Language card carousel ----- */
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = document.getElementById('carousel-track');
    const cards = track.querySelectorAll('.language-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    const total = cards.length;
    let index = 0;

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      cards.forEach((card, i) => {
        const inactive = i !== index;
        card.setAttribute('aria-hidden', inactive ? 'true' : 'false');
        card.querySelectorAll('a, button').forEach((el) => {
          if (inactive) el.setAttribute('tabindex', '-1');
          else el.removeAttribute('tabindex');
        });
      });
    }

    function go(delta) {
      index = (index + delta + total) % total;
      update();
    }

    prevBtn.addEventListener('click', () => go(-1));
    nextBtn.addEventListener('click', () => go(1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        index = i;
        update();
      });
    });

    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    });

    update();
  }

  /* ----- Buy form mock submission ----- */
  const buyForm = document.getElementById('buy-form');
  if (buyForm) {
    buyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!buyForm.checkValidity()) return buyForm.reportValidity();
      document.querySelector('.buy-layout').hidden = true;
      const success = document.getElementById('buy-success');
      success.hidden = false;
      success.focus();
    });
  }

  /* ----- Cookie banner ----- */
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    if (!localStorage.getItem('linguora-cookie-choice')) banner.hidden = false;
    banner.addEventListener('click', (e) => {
      const choice = e.target.dataset.cookie;
      if (choice) {
        localStorage.setItem('linguora-cookie-choice', choice);
        banner.hidden = true;
      }
    });
  }
})();