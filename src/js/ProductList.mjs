export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.path = `../json/${this.category}.json`;
    this.products = [];
  }

  async init() {

    this.products = await this.dataSource.getData();

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      this.products
    );

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
  }
}