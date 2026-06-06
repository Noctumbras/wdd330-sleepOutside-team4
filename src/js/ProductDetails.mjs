import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    // Add to cart listener
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));

    // Comment form listener
    document
      .getElementById("commentForm")
      .addEventListener("submit", this.addComment.bind(this));

    // Load saved comments
    this.loadComments();
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];

    cartItems.push(this.product);

    setLocalStorage("so-cart", cartItems);
  }

  addComment(e) {
    e.preventDefault();

    const name = document.getElementById("commentName").value;
    const text = document.getElementById("commentText").value;

    const newComment = {
      name,
      text,
      date: new Date().toLocaleString(),
    };

    let comments =
      JSON.parse(localStorage.getItem(`comments-${this.productId}`)) || [];

    comments.push(newComment);

    localStorage.setItem(
      `comments-${this.productId}`,
      JSON.stringify(comments),
    );

    document.getElementById("commentForm").reset();

    this.loadComments();
  }

  loadComments() {
    const comments =
      JSON.parse(localStorage.getItem(`comments-${this.productId}`)) || [];

    const commentsList = document.getElementById("commentsList");

    commentsList.innerHTML = comments
      .map(
        (comment) => `
        <div class="comment">
          <h4>${comment.name}</h4>
          <p>${comment.text}</p>
          <small>${comment.date}</small>
        </div>
      `,
      )
      .join("");
  }

  renderProductDetails() {
    const originalPrice = this.product.SuggestedRetailPrice;
    const finalPrice = this.product.FinalPrice;

    const discount = Math.round(
      ((originalPrice - finalPrice) / originalPrice) * 100,
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
        <button id="addToCart" data-id="${this.product.Id}">
          Add to Cart
        </button>
      </div>

      <div class="product-comments">
        <h3>Product Comments</h3>

        <form id="commentForm">
          <input
            type="text"
            id="commentName"
            placeholder="Your name"
            required
          />

          <textarea
            id="commentText"
            placeholder="Write a comment..."
            required
          ></textarea>

          <button type="submit">Post Comment</button>
        </form>

        <div id="commentsList"></div>
      </div>
    `;
  }
}