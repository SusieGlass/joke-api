const request = require('supertest');
const app = require('../app');  // Assure-toi que le chemin est correct

describe('Joke API Endpoints', () => {

  it('should get all jokes', async () => {
    const res = await request(app).get('/api/v1/blagues');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a joke by ID', async () => {
    const jokeId = 1; // utilise un ID valide pour ton test
    const res = await request(app).get(`/api/V1/blagues/${jokeId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', jokeId);
  });

  it('should get a random joke', async () => {
    const res = await request(app).get('/api/v1/random');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('text');  // Assure-toi que 'text' est bien une propriété de blague
  });

  it('should add a new joke', async () => {
    const newJoke = { text: "This is a test joke" };
    const res = await request(app)
      .post('/api/v1/blagues')
      .send(newJoke);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('text', newJoke.text);
  });
});
