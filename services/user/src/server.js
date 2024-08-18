const { db } = require("app");
const User = require("app/models/user");
const express = require("express");
const route = require("./handler");
const exceptionHandler = require("app/middleware/exceptionHandler");
require('dotenv').config()

try {
    const app = express();

    app.use(express.json());
    app.use(route);
    app.use(exceptionHandler);

    app.listen(process.env.USER_PORT ?? 9090, async () => {
        await db.authenticate();
        User.sync();
    })
} catch (exc) {
    console.error('unable to start user service: ', exc)
}