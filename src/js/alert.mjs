import { renderListWithTemplate } from "./utils.mjs";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
};

function alertTemplate(alert) {
    return `
        <section class="alert-list">
        <p style="background-color:${alert.background}; color:${alert.color}">
        ${alert.message}
        </p>
        </section>
    `;
};

export default class Alert {
  constructor(element) {
    this.alertsPath = '../json/alerts.json';
    this.htmlElement = element;
    this.createAlerts();
  }
  getData() {
    return fetch(this.alertsPath)
      .then(convertToJson)
      .then((data) => data);
  }
  async createAlerts() {
    const alerts = await this.getData();
    renderListWithTemplate(alertTemplate, this.htmlElement, alerts);
  }
};