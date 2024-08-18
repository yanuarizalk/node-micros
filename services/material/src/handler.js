const express = require("express");
const Material = require("app/models/material");

const route = express.Router();

// get data material
route.get('/', async function (req, res, next) {
    try {
        let data = await Material.findAll();
        res.json(data);
    } catch (exc) {
        next(exc);
    }
});

// get data material by id
route.get('/:id', async function (req, res, next) {
    try {
        let data = await Material.findByPk(req.params.id);
        if (data == null)
            return res.status(404).json({
                'message': 'data not found'
            })
        res.json(data);
    } catch (exc) {
        next(exc);
    }
});

// insert material
route.post('/', async function (req, res, next) {
    try {
        let data = await Material.create(req.body);
        res.status(201).json(data);
    } catch (exc) {
        next(exc);
    }
});

// update material by id
route.put('/:id', async function (req, res, next) {
    try {
        let data = await Material.findByPk(req.params.id);
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

// delete material by id
route.delete('/:id', async function (req, res, next) {
    try {
        let data = await Material.findByPk(req.params.id);
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