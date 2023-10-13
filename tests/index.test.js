const request = require('supertest');
const app = require('../index');

describe('Index', () => {
    it('Devrait renvoyer "Hello World" sur la route /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World');
    });

    it('Devrait renvoyer une erreur 404 sur une route inexistante', async () => {
        const response = await request(app).get('/route-inexistante');
        expect(response.status).toBe(404);
    });
});
