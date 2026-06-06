import { getLocalStorage, loadHeaderFooter, renderBreadcrumb } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // combine duplicate items
  const summarizedCart = [];

  cartItems.forEach((item) => {
    const existingItem = summarizedCart.find(
      (product) => product.Id === item.Id,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      summarizedCart.push({
        ...item,
        quantity: 1,
      });
    }
  });

  const htmlItems = summarizedCart.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
  <button class="qty-minus" data-id="${item.Id}">-</button>
  <span>qty: ${item.quantity}</span>
  <button class="qty-plus" data-id="${item.Id}">+</button>
</div> 
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

document.addEventListener("click", (e) => {
  let cart = getLocalStorage("so-cart") || [];

  // increase quantity
  if (e.target.classList.contains("qty-plus")) {
    const id = e.target.dataset.id;

    const product = cart.find((p) => p.Id === id);

    if (product) {
      cart.push(product);
    }
  }

  // decrease quantity
  if (e.target.classList.contains("qty-minus")) {
    const id = e.target.dataset.id;

    const index = cart.findIndex((p) => p.Id === id);

    if (index !== -1) {
      cart.splice(index, 1);
    }
  }

  localStorage.setItem("so-cart", JSON.stringify(cart));

  renderCartContents();
});

loadHeaderFooter(
  "../partials/header.html",
  "../partials/footer.html",
  document.querySelector("#main-header"),
  document.querySelector("#main-footer"),
);

renderCartContents();
renderBreadcrumb();

