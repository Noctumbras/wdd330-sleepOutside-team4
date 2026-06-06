import { loadHeaderFooter, renderBreadcrumb } from "./utils.mjs";

loadHeaderFooter("../partials/header.html", "../partials/footer.html", document.querySelector("#main-header"), document.querySelector("#main-footer"));
renderBreadcrumb();
