const { db } = require("app");
const Material = require("app/models/material");
const express = require("express");
const route = require("./handler");
const exceptionHandler = require("app/middleware/exceptionHandler");
require('dotenv').config()

try {
    const app = express();

    app.use(express.json());
    app.use(route);
    app.use(exceptionHandler);

    app.listen(process.env.MATERIAL_PORT ?? 9091, async () => {
        await db.authenticate();
        Material.sync();
    })
} catch (exc) {
    console.error('unable to start material service: ', exc)
}