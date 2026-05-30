import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import {
  getParam,
  loadHeaderFooter,
  addProductToCart, 
} from "./utils.mjs";

const dataSource = new ProductData();
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);

product.init();
loadHeaderFooter("../partials/header.html", "../partials/footer.html", document.querySelector("#main-header"), document.querySelector("#main-footer"));

// add to cart button event handler
async function addToCartHandler(e) {
  const productToAdd = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(productToAdd);
}

// add listener to Add to Cart button
/*
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
  */
