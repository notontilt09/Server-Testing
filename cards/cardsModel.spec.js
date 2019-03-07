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
        
        it('should add multiple cards to database', async () => {
            await Cards.insert({name: '3 of diamonds'});
            await Cards.insert({name: '5 of diamonds'});
            
            const cards = await Cards.getAll();
            expect(cards.length).toBe(2);
            
        });
        
        it.skip('should throw error if duplicate card added', async () => {
            await Cards.insert({name: '3 of diamonds'});
            expect(await Cards.insert({name: '3 of diamonds'})).toThrow();
        });
    });
    
    describe('remove()', () => {
        afterEach(async () => {
            await db('cards').truncate()
        })

        it('should remove a card from the db with whatever id is passed', async () => {
            const card = await Cards.insert({name: '3 of diamonds'})
            let allCards = await Cards.getAll();
            // should be 1 card is db after the insert
            expect(allCards.length).toBe(1);
            // call the remove card function
            await Cards.remove(1);
            allCards = await Cards.getAll();
            // expect cards to be empty after the remove
            expect(allCards.length).toBe(0);
        });
    });
});