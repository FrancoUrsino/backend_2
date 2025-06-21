import request from 'supertest';
import app from '../src/app.js';

describe('Adoption Routes', () => {
  it('GET /api/adoption debe devolver estado 200', async () => {
    const res = await request(app).get('/api/adoption');
    expect(res.statusCode).toBe(200);
  });

});
