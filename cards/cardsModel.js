const db = require('../data/dbConfig.js')

module.exports = {
    insert,
    getAll,
    getCard,
    remove
};

async function insert(card) {
    const [id] = await db('cards').insert(card);

    return db('cards').where({id}).first();
}

function getAll() {
    return db('cards')
}

function getCard(id) {
    return db('cards')
        .where({ id: id })
        .first();
}

function remove(id) {
    return db('cards').del().where({id})
}