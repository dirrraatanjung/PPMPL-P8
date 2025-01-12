const request = require('supertest');
const app = require('./app'); // Pastikan ini adalah file app.js yang sesuai

describe('API Tests', () => {
    describe('GET /', () => {
        it('responds with Hello, World!', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('Hello, World!');
        });
    });

    describe('Additional Unit and Integration Tests', () => {
        it('responds with 404 for an unknown endpoint', async () => {
            const res = await request(app).get('/unknown');
            expect(res.statusCode).toBe(404);
        });

        it('returns 400 for POST /api/data without required fields', async () => {
            const res = await request(app).post('/api/data').send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({ error: 'Item is required' });
        });

        it('responds with 405 for unsupported HTTP method PUT on /api/data', async () => {
            const res = await request(app).put('/api/data').send({ item: 'Test' });
            expect(res.statusCode).toBe(405); // Custom status code for unsupported method
        });

        it('handles large payload in POST /api/data', async () => {
            const largePayload = { item: 'A'.repeat(1000) };
            const res = await request(app).post('/api/data').send(largePayload);
            expect(res.statusCode).toBe(201);
            expect(res.body).toEqual({
                message: 'Data added',
                item: largePayload.item,
            });
        });
    });
});