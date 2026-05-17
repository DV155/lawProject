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
  /* ----- Buy page: read plan from URL ----- */
  const planNameEl = document.querySelector('.order-line span:first-child');
  const planPriceEl = document.querySelector('.order-line span:last-child');
  const totalEl = document.querySelector('.order-total span:last-child');
  if (planNameEl && planPriceEl && totalEl) {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    const plans = {
      monthly:  { name: 'Frei',   price: '€0.00' },
      annual:   { name: 'Monatlich',    price: '€9.99' },
      lifetime: { name: 'Jährlich',  price: '€99.00' }
    };
    if (plans[plan]) {
      planNameEl.textContent = plans[plan].name;
      planPriceEl.textContent = plans[plan].price;
      totalEl.textContent = plans[plan].price;
    }
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
  /* ----- Contact form mock submission ----- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) return contactForm.reportValidity();
      document.querySelector('.contact-grid').hidden = true;
      const success = document.getElementById('contact-success');
      success.hidden = false;
      success.focus();
    });
  }
})();