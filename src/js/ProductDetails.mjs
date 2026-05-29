import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    const originalPrice = this.product.SuggestedRetailPrice;
    const finalPrice = this.product.FinalPrice;

    const discount = Math.round(
      ((originalPrice - finalPrice) / originalPrice) * 100
    );

    document.querySelector(".product-detail").innerHTML = `
    <h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.NameWithoutBrand}"
        />

        <div class="product-price">
          <p class="original-price">$${originalPrice}</p>

          ${
            discount > 0
              ? `<p class="discount">${discount}% OFF</p>`
              : ""
          }

          <p class="final-price">$${finalPrice}</p>
        </div>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>`;
  }
}