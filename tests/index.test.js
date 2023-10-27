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
describe('API Users', () => {
    it('devrait renvoyer un utilisateur existant avec le code 200', async () => {
        const response = await request(app).get('/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: 'Cindy'
        });
    });

    it('devrait renvoyer une erreur 404 pour un utilisateur non existant', async () => {
        const response = await request(app).get('/users/999'); // Utilisateur non existant
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            error: 'Utilisateur non trouvé'
        });
    });
});