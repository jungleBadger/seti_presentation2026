"use strict";

const fastifyStatic = require("@fastify/static");
const fs = require("fs");
const path = require("path");

const presentationRoot = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "client",
  "presentation_module",
  "dist"
);

function getBuildPrefix() {
  try {
    const indexHtml = fs.readFileSync(
      path.join(presentationRoot, "index.html"),
      "utf8"
    );
    const assetPath = indexHtml.match(
      /(?:src|href)="(\/[^"]*\/assets\/)/
    )?.[1];
    return assetPath?.slice(0, -"assets/".length) || "/";
  } catch {
    return "/";
  }
}

module.exports = {
  init: function (app) {
    app.log.info("Initializing static routes");
    const buildPrefix = getBuildPrefix();

    app.register(fastifyStatic, {
      root: presentationRoot,
      prefix: buildPrefix,
      decorateReply: true
    });

    if (buildPrefix !== "/") {
      app.register(fastifyStatic, {
        root: presentationRoot,
        prefix: "/",
        decorateReply: false
      });
    }

    app.get("/", (_request, reply) => {
      reply.sendFile("index.html", presentationRoot);
    });

    return app;
  }
};
