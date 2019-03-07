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
            const response = await request(server).delete('/1');
            expect(response.status).toBe(204);
        });
    });
});