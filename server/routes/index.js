"use strict";

const mainStaticRoutes = require("./static/main");

module.exports = {
  init: async function (app) {
    mainStaticRoutes.init(app);

    app.log.info("Routes initialized");
  }
};
