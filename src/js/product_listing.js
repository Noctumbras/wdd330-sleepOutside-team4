import ProductData from './ProductData.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter("../partials/header.html", "../partials/footer.html", document.querySelector("#main-header"), document.querySelector("#main-footer"));

const category = getParam('category');
// first create an instance of the ProductData class.
const dataSource = new ProductData();
// then get the element you want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();