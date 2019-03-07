const db = require('../data/dbConfig.js');
const Cards = require('../cards/cardsModel.js');

describe('cards model', () => {
    describe('insert()', () => {
        afterEach(async () => {
            await db('cards').truncate()
        })

        it('should insert provided card to the db', async () => {
            const card = await Cards.insert({name: '3 of diamonds'});
            
            expect(card.name).toBe('3 of diamonds');
        });
    });
});