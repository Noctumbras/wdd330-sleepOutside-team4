import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./alert.mjs";
import {loadHeaderFooter, getLocalStorage} from "./utils.mjs";

const data = new ProductData("tents");
const list = new ProductList(
  "tents",
  data,
  document.querySelector(".product-list"),
);
list.init();

const alert = new Alert(document.querySelector("main"));
loadHeaderFooter(
  "../partials/header.html",
  "../partials/footer.html",
  document.querySelector("#main-header"),
  document.querySelector("#main-footer"),
);
