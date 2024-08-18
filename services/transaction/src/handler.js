const express = require("express");
const Transaction = require("app/models/transaction");

const route = express.Router();

// get data transaction
route.get('/', async function (req, res, next) {
    try {
        let data = await Transaction.withMaterials();
        res.json(data);
    } catch (exc) {
        next(exc);
    }
});

// get data transaction by id
route.get('/:id', async function (req, res, next) {
    try {
        let data = await Transaction.findByPk(req.params.id);
        if (data == null)
            return res.status(404).json({
                'message': 'data not found'
            })
        res.json(data);
    } catch (exc) {
        next(exc);
    }
});

// insert transaction
route.post('/', async function (req, res, next) {
    try {
        console.log(req.body);
        let data = await Transaction.create(req.body);
        res.status(201).json(data);
    } catch (exc) {
        next(exc);
    }
});

// update transaction by id
route.put('/:id', async function (req, res, next) {
    try {
        let data = await Transaction.findByPk(req.params.id);
        if (data == null)
            return res.status(404).json({
                'message': 'data not found'
            })
        await data.update(req.body);
        res.json(data);
    } catch (exc) {
        next(exc);
    }
});

// delete transaction by id
route.delete('/:id', async function (req, res, next) {
    try {
        let data = await Transaction.findByPk(req.params.id);
        if (data == null)
            return res.status(404).json({
                'message': 'data not found'
            })
        await data.destroy()
        res.status(204).send();
    } catch (exc) {
        next(exc);
    }
});

module.exports = route;