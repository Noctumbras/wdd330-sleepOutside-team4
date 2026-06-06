import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="#">
        <img src="${product.Image}" alt="${product.Name}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
     </a>
    </li>
  `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    renderList(products) {
        renderListWithTemplate(
            productCardTemplate,
            this.listElement,
            products
        );
    }

    async init() {
        this.products = await this.dataSource.getData();
        this.renderList(this.products);
    }

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="../product_pages/?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">$${product.ListPrice}</p>
            </a>
          </li>
        `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.path = `../json/${this.category}.json`;
    this.products = [];
  }

  async init() {

    this.products = await this.dataSource.getData(this.category);

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      this.products
    );

    // There's no #sortProducts element anywhere and I'm not sure where it is meant to go, so this section is commented out for the moment.
    /*
    const sortElement = document.querySelector("#sortProducts");

    sortElement.addEventListener("change", () => {

      if (sortElement.value === "name") {

        this.products.sort((a, b) =>
          a.Name.localeCompare(b.Name)
        );

      } else {

        this.products.sort((a, b) =>
          a.ListPrice - b.ListPrice
        );
      }

      this.listElement.innerHTML = "";

      renderListWithTemplate(
        productCardTemplate,
        this.listElement,
        this.products
      );
     
    });
    */
  }
}