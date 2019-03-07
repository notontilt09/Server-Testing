require('dotenv').config();

const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    it('should set testing environemt', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        it('should return 200 OK', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
    });
});