import Alert from "./alert.mjs";
import {loadHeaderFooter} from "./utils.mjs";



const alert = new Alert(document.querySelector('main'));
loadHeaderFooter("../partials/header.html", "../partials/footer.html", document.querySelector("#main-header"), document.querySelector("#main-footer"));
