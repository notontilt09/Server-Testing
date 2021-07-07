const express = require('express');

const Cards = require('../cards/cardsModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/', async (req, res) => {
    try {
        const { id } = await Cards.insert(req.body)
        const newCard = await Cards.getCard(id);
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Cards.remove(id)
        if (deleted > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({message: `No card with id ${req.params.id} exists}`})
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = server;