const { db } = require("app");
const Transaction = require("app/models/transaction");
const express = require("express");
const route = require("./handler");
const exceptionHandler = require("app/middleware/exceptionHandler");
require('dotenv').config()

try {
    const app = express();

    app.use(express.json());
    app.use(route);
    app.use(exceptionHandler);

    app.listen(process.env.TRANSACTION_PORT ?? 9092, async () => {
        await db.authenticate();
        Transaction.sync();
    })
} catch (exc) {
    console.error('unable to start transaction service: ', exc)
}