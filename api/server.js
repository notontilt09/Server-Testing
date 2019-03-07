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

module.exports = server;