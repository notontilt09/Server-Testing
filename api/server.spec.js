require('dotenv').config();

const request = require('supertest');

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
});