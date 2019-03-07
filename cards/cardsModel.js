const db = require('../data/dbConfig.js')

module.exports = {
    insert
};

async function insert(card) {
    const [id] = await db('cards').insert(card);

    return db('cards').where({id}).first();
}