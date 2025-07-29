document.addEventListener('DOMContentLoaded', () => {
  initCartToggle();
  renderSection('main-dishes', window.dishesData.slice(0, 3));
  renderSection('side-dishes', window.dishesData.slice(3));
  const cart = new ShoppingCart('.cart-items', '#subtotal', '#shipping', '#total', 2.50);
  cart.attachAddButtons();
  cart.updateDisplay();
});
