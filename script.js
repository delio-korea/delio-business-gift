const header = document.querySelector('[data-header]');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const productFilters = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('[data-price]');

productFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    productFilters.forEach((item) => item.classList.toggle('active', item === button));
    productCards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.price === selected;
      card.classList.toggle('product-hidden', !visible);
    });
  });
});

const productToggles = document.querySelectorAll('[data-product-toggle]');
productToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.gift-card');
    const willOpen = !card.classList.contains('detail-open');

    productToggles.forEach((otherToggle) => {
      otherToggle.closest('.gift-card').classList.remove('detail-open');
      otherToggle.setAttribute('aria-expanded', 'false');
      otherToggle.textContent = '+';
    });

    if (willOpen) {
      card.classList.add('detail-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.textContent = '−';
    }
  });
});

const inquiryForm = document.querySelector('[data-inquiry-form]');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = [...new FormData(inquiryForm).entries()];
    const body = values.map(([label, value]) => `${label}: ${value}`).join('\\n');
    const subject = encodeURIComponent('DELIO 기업 선물세트 견적 문의');
    window.location.href = `mailto:deli_o@naver.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  });
}
