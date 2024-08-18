const express = require("express");
const User = require("app/models/user");

const route = express.Router();

// get data user
route.get('/', async function (req, res, next) {
    try {
        let data = await User.findAll();
        res.json(data);
    } catch (exc) {
        next(exc);
    }
});

// get data user by id
route.get('/:id', async function (req, res, next) {
    try {
        let data = await User.findByPk(req.params.id);
        if (data == null)
            return res.status(404).json({
                'message': 'data not found'
            })
        res.json(data);
    } catch (exc) {
        next(exc);
    }
});

// insert user
route.post('/', async function (req, res, next) {
    try {
        console.log(req.body);
        let data = await User.create(req.body);
        res.status(201).json(data);
    } catch (exc) {
        next(exc);
    }
});

// update user by id
route.put('/:id', async function (req, res, next) {
    try {
        let data = await User.findByPk(req.params.id);
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

// delete user by id
route.delete('/:id', async function (req, res, next) {
    try {
        let data = await User.findByPk(req.params.id);
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