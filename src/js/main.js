import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const myList = new ProductList("tents", dataSource, listElement);

myList.init();
import Alert from "./alert.mjs";
import {loadHeaderFooter, getLocalStorage} from "./utils.mjs";



const alert = new Alert(document.querySelector('main'));
loadHeaderFooter("../partials/header.html", "../partials/footer.html", document.querySelector("#main-header"), document.querySelector("#main-footer"));
