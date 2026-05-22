import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const data = new ProductData("tents");
const list = new ProductList("tents", data, document.querySelector(".product-list"));
list.init();