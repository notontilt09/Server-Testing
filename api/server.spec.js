const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
    it('should set testing environemt', () => {
        expect(process.env.DB_ENV).toBe('development');
    });
});