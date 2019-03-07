require('dotenv').config();

const request = require('supertest');
const db = require('../data/dbConfig.js');
const Cards = require('../cards/cardsModel.js');

const server = require('./server.js');

describe('server.js', () => {
    it('should set testing environemt', () => {
        expect(process.env.DB_ENV).toBe('development');
    });

    describe('GET /', () => {
        it('should return 200 OK', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            const response = await request(server).get('/');

            expect(response.type).toBe('application/json');
        });

        it('should return { api: running }', async () => {
            const response = await request(server).get('/');

            expect(response.body).toEqual({ api: 'running' });
        });
    });

    describe('POST /', () => {
        afterEach(async () => {
            await db('cards').truncate();
        })

        it('should return the new card added with id and name', async () => {
            const response = await request(server).post('/').send({name: '3 of diamonds'});
            expect(response.body).toEqual({"id": 1, "name": "3 of diamonds"});
        });

        it('should return a status 201 when successful ', async () => {
            const response = await request(server).post('/').send({name: '3 of diamonds'});
            expect(response.status).toBe(201);
        });
    });

    describe('DELETE /:id', () => {
        afterEach(async () => {
            await db('cards').truncate();
        })

        it('should return successful 204 status', async () => {
            // first add a card to be deleted
            await Cards.insert({name: 'test'})
            // hit the delete endpoint with the id of the resource just created
            const response = await request(server).delete('/1');
            // expect status to be 204
            expect(response.status).toBe(204);
        });
        
        it('should delete 1 item from the db', async () => {
            // add a card to be delete
            await Cards.insert({name: 'test'})
            // get the length of all the Cards
            const cardsAfterAdd = await Cards.getAll();
            const lengthAfterAdd = cardsAfterAdd.length;
            // hit the remove endpoind wit the correct id
            await request(server).delete('/1');
            const cardsAfterDelete = await Cards.getAll();
            const lengthAfterDelete = cardsAfterDelete.length;
            // expect length of all Cards to be 1 less then length before the deletion
            expect(lengthAfterDelete).toBe(lengthAfterAdd - 1);
        })

        // not working, giving 204 when it should be 500
        it('should return 500 status if we try to delete non-existant item', async () => {
            const response = await request(server).delete('/100')
            expect(response.status).toBe(500);
        });
    });
});