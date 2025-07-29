function initCartToggle() {
  const burger = document.getElementById('burger');
  const closeBtn = document.getElementById('cart-close');
  const cartEl = document.getElementById('cart');
  const backdrop = document.getElementById('backdrop');
  function toggle() {
    const open = cartEl.classList.toggle('active');
    backdrop.classList.toggle('active', open);
    document.body.classList.toggle('no-scroll', open);
  }
  burger.addEventListener('click', toggle);
  closeBtn.addEventListener('click', toggle);
  backdrop.addEventListener('click', toggle);
}

function renderSection(containerId, dishes) {
  const cont = document.getElementById(containerId);
  dishes.forEach(d => {
    const div = document.createElement('div');
    div.className = 'dish-block';
    div.dataset.name = d.name;
    div.dataset.price = d.price;
    div.innerHTML = `
      <h3>${d.name}</h3>
      <span>${d.description}</span>
      <span class="price">${d.price.toFixed(2).replace('.', ',')} €</span>
      <button class="add-to-cart">+</button>
    `;
    cont.appendChild(div);
  });
}

class ShoppingCart {
  constructor(listSel, subSel, shipSel, totSel, shipCost) {
    this.cart = {};
    this.listEl = document.querySelector(listSel);
    this.subEl = document.querySelector(subSel);
    this.shipEl = document.querySelector(shipSel);
    this.totalEl = document.querySelector(totSel);
    this.shipCost = shipCost;
  }

  formatEuro(n) {
    return n.toFixed(2).replace('.', ',') + ' €';
  }

  updateDisplay() {
    this.listEl.innerHTML = '';
    let subtotal = 0;
    for (let key in this.cart) {
      const { name, price, qty } = this.cart[key];
      subtotal += price * qty;
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="item-name">${name}</span>
        <div class="item-controls">
          <button class="dec" aria-label="–">–</button>
          <span class="item-qty">${qty}</span>
          <button class="inc" aria-label="+">+</button>
        </div>
        <span class="item-price">${this.formatEuro(price * qty)}</span>
        <button class="remove" aria-label="🗑️">×</button>
      `;
      li.querySelector('.inc').onclick = () => this.changeQty(key, +1);
      li.querySelector('.dec').onclick = () => this.changeQty(key, -1);
      li.querySelector('.remove').onclick = () => this.removeItem(key);
      this.listEl.appendChild(li);
    }
    this.subEl.textContent = this.formatEuro(subtotal);
    this.shipEl.textContent = this.formatEuro(this.shipCost);
    this.totalEl.textContent = this.formatEuro(subtotal + this.shipCost);
  }

  changeQty(key, delta) {
    if (!this.cart[key]) return;
    this.cart[key].qty += delta;
    if (this.cart[key].qty <= 0) delete this.cart[key];
    this.updateDisplay();
  }

  removeItem(key) {
    delete this.cart[key];
    this.updateDisplay();
  }

  attachAddButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn =>
      btn.addEventListener('click', () => {
        const block = btn.closest('.dish-block');
        const name = block.dataset.name;
        const price = parseFloat(block.dataset.price);
        const key = name.replace(/\s+/g, '-').toLowerCase();
        if (!this.cart[key]) this.cart[key] = { name, price, qty: 0 };
        this.cart[key].qty++;
        this.updateDisplay();
        const cartEl = document.getElementById('cart');
        if (!cartEl.classList.contains('active')) {
          document.getElementById('burger').click();
        }
      })
    );
  }
}

window.initCartToggle = initCartToggle;
window.renderSection = renderSection;
window.ShoppingCart = ShoppingCart;
