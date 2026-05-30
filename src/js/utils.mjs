// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  const htmlStrings = list.map(templateFn);
  
  if (clear) {
    parentElement.innerHTML = '';
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(headerPath, footerPath, headerElement, footerElement) {
  const headerTemplate = await loadTemplate(headerPath);
  const footerTemplate = await loadTemplate(footerPath);

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  updateCartCount();
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];

  const cartCount = document.querySelector(".cart-count");

  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

export function addProductToCart(product) {
  let cart = getLocalStorage("so-cart") || [];

  cart.push(product);

  setLocalStorage("so-cart", cart);
}

export async function renderBreadcrumb(data) {
  const currentUrl = window.location.pathname;
  let breadcrumb = "";

  if (currentUrl == "/product_listing/")
  {
    const category = getParam('category');
    const products = await data.getData(category);
    breadcrumb = `${category} > (${products.length} items)`;
  }
  else if (currentUrl == "/product_pages/")
  {
    const productId = getParam('product');
    const product = await data.findProductById(productId);
    breadcrumb = `${product.Category}`;
  }
  else
  {
    breadcrumb = currentUrl.split('/')[1];
  }

  document.querySelector("#main-header").insertAdjacentHTML("afterend", `<div class="breadcrumb"><p>${breadcrumb}</p></div>`);
}