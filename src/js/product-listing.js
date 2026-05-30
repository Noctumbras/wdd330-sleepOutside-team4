import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter, getParam} from "./utils.mjs";

const category = getParam('category');
const data = new ProductData();
const list = new ProductList(category, data, document.querySelector(".product-list"));
const productsTitle = document.querySelector("#products-title");

list.init();
loadHeaderFooter("../partials/header.html", "../partials/footer.html", document.querySelector("#main-header"), document.querySelector("#main-footer"));
productsTitle.textContent = `Top Products: ${category}`;