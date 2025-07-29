document.addEventListener('DOMContentLoaded', () => {
  initCartToggle();
  renderSection('main-dishes', window.dishesData.slice(0, 3));
  renderSection('side-dishes', window.dishesData.slice(3));

  const cart = new ShoppingCart('.cart-items', '#subtotal', '#shipping', '#total', 2.50);
  cart.attachAddButtons();
  cart.updateDisplay();

  const orderBtn = document.getElementById('order-btn');
  const msgEl = document.getElementById('order-message');
  orderBtn.addEventListener('click', () => {
    cart.clearCart();
    msgEl.textContent = 'Testbestellung erfolgreich abgeschickt!';
    msgEl.style.opacity = '1';
    setTimeout(() => { msgEl.style.opacity = '0'; }, 5000);
  });
});
