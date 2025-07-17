document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const cartEl = document.getElementById('cart');
  const backdrop = document.getElementById('backdrop');
  const addButtons = document.querySelectorAll('.add-to-cart');
  const itemsList = document.querySelector('.cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');
  const SHIPPING_COST = 2.50;
  let cart = {}, scrollPos = 0;
  
  const closeBtn = document.getElementById('cart-close');
  closeBtn.addEventListener('click', () => {
    const isOpen = cartEl.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  burger.addEventListener('click', () => {
    const isOpen = cartEl.classList.toggle('active');
    backdrop.classList.toggle('active', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });

  backdrop.addEventListener('click', () => burger.click());

  function formatEuro(n) { return n.toFixed(2).replace('.', ',') + ' €'; }

  function updateCartDisplay() {
    itemsList.innerHTML = '';
    let subtotal = 0;
    for (const k in cart) {
      const { name, price, qty } = cart[k];
      subtotal += price * qty;
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="item-name">${name}</span>
        <div class="item-controls">
          <button class="dec" aria-label="–">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="7" width="12" height="2"/></svg>
          </button>
          <span class="item-qty">${qty}</span>
          <button class="inc" aria-label="+">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="2" width="2" height="12"/><rect x="2" y="7" width="12" height="2"/></svg>
          </button>
        </div>
        <span class="item-price">${formatEuro(price * qty)}</span>
        <button class="remove" aria-label="🗑️">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      `;
      li.querySelector('.inc').onclick = () => { cart[k].qty++; updateCartDisplay(); };
      li.querySelector('.dec').onclick = () => { if (--cart[k].qty <= 0) delete cart[k]; updateCartDisplay(); };
      li.querySelector('.remove').onclick = () => { delete cart[k]; updateCartDisplay(); };
      itemsList.appendChild(li);
    }
    subtotalEl.textContent = formatEuro(subtotal);
    shippingEl.textContent = formatEuro(SHIPPING_COST);
    totalEl.textContent = formatEuro(subtotal + SHIPPING_COST);
  }

  addButtons.forEach(btn => btn.addEventListener('click', () => {
    const dish = btn.closest('.dish-block');
    const name = dish.dataset.name;
    const price = parseFloat(dish.dataset.price);
    const key = name.replace(/\s+/g, '-').toLowerCase();
    if (!cart[key]) cart[key] = { name, price, qty: 0 };
    cart[key].qty++;
    updateCartDisplay();
    if (!cartEl.classList.contains('active')) burger.click();
  }));

  updateCartDisplay();
});
