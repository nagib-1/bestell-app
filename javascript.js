// // javascript.js
// document.addEventListener('DOMContentLoaded', () => {
//   const burger = document.getElementById('burger');
//   const cartEl = document.getElementById('cart');
//   const backdrop = document.getElementById('backdrop');
//   const itemsList = document.querySelector('.cart-items');
//   const subtotalEl = document.getElementById('subtotal');
//   const shippingEl = document.getElementById('shipping');
//   const totalEl = document.getElementById('total');
//   const closeBtn = document.getElementById('cart-close');
//   const SHIPPING_COST = 2.50;
//   let cart = {};

//   // Deine Gerichte als Variable
//   const dishesData = [
//     { name: "Pizza Krabben", description: "mit Krabben und Peperoni", price: 9.50 },
//     { name: "Pizza Margherita", description: "mit Mozzarella", price: 5.90 },
//     { name: "Pizza Diavolo (scharf)", description: "mit Salami, Peperoni und Knoblauch", price: 8.50 },
//     { name: "Pizzabrötchen", description: "mit Käse und Knoblauch", price: 4.50 },
//     { name: "Pizzasticks", description: "mit Käse und Knoblauch", price: 5.50 },
//     { name: "Salat", description: "mit Oliven und Fetakäse", price: 5.90 }
//   ];

//   // Menü-Rendering nach Kategorie
//   function renderSection(containerId, items) {
//     const container = document.getElementById(containerId);
//     items.forEach(dish => {
//       const div = document.createElement('div');
//       div.className = 'dish-block';
//       div.dataset.name = dish.name;
//       div.dataset.price = dish.price;
//       div.innerHTML = `
//         <h3>${dish.name}</h3>
//         <span>${dish.description}</span>
//         <span class="price">${dish.price.toFixed(2).replace('.', ',')} €</span>
//         <button class="add-to-cart">+</button>
//       `;
//       container.appendChild(div);
//     });
//   }

//   // Banner / Close / Backdrop toggles
//   burger.addEventListener('click', () => {
//     const open = cartEl.classList.toggle('active');
//     backdrop.classList.toggle('active', open);
//     document.body.classList.toggle('no-scroll', open);
//   });
//   closeBtn.addEventListener('click', () => burger.click());
//   backdrop.addEventListener('click', () => burger.click());

//   // Euro-Formatierung
//   function formatEuro(n) {
//     return n.toFixed(2).replace('.', ',') + ' €';
//   }

//   // Warenkorb-Logik
//   function updateCartDisplay() {
//     itemsList.innerHTML = '';
//     let subtotal = 0;
//     for (const key in cart) {
//       const { name, price, qty } = cart[key];
//       subtotal += price * qty;
//       const li = document.createElement('li');
//       li.innerHTML = `
//         <span class="item-name">${name}</span>
//         <div class="item-controls">
//           <button class="dec" aria-label="–">–</button>
//           <span class="item-qty">${qty}</span>
//           <button class="inc" aria-label="+">+</button>
//         </div>
//         <span class="item-price">${formatEuro(price * qty)}</span>
//         <button class="remove" aria-label="🗑️">×</button>
//       `;
//       li.querySelector('.inc').onclick = () => { cart[key].qty++; updateCartDisplay(); };
//       li.querySelector('.dec').onclick = () => {
//         if (--cart[key].qty <= 0) delete cart[key];
//         updateCartDisplay();
//       };
//       li.querySelector('.remove').onclick = () => { delete cart[key]; updateCartDisplay(); };
//       itemsList.appendChild(li);
//     }
//     subtotalEl.textContent = formatEuro(subtotal);
//     shippingEl.textContent = formatEuro(SHIPPING_COST);
//     totalEl.textContent = formatEuro(subtotal + SHIPPING_COST);
//   }

//   // Klick-Handler für "In den Warenkorb"
//   function attachAddButtons() {
//     document.querySelectorAll('.add-to-cart').forEach(btn => {
//       btn.addEventListener('click', () => {
//         const dish = btn.closest('.dish-block');
//         const name = dish.dataset.name;
//         const price = parseFloat(dish.dataset.price);
//         const key = name.replace(/\s+/g, '-').toLowerCase();
//         if (!cart[key]) cart[key] = { name, price, qty: 0 };
//         cart[key].qty++;
//         updateCartDisplay();
//         if (!cartEl.classList.contains('active')) burger.click();
//       });
//     });
//   }

//   // Sections erzeugen und alles initialisieren
//   renderSection('main-dishes', dishesData.slice(0, 3));
//   renderSection('side-dishes', dishesData.slice(3));
//   attachAddButtons();
//   updateCartDisplay();
// });
