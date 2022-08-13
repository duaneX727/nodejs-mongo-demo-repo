// tests/integration/genres.test.js
/*jshint -W087 */
const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');
const mongoose = require('mongoose');
const config = require('config');

let server;

describe('/api/genres', () => {
  beforeEach(() => {
     server = require('../../app');});
     
  afterEach(async () => {
     server.close().unref();
     await Genre.deleteMany({});
  });
  describe('GET /', () => {
    it('Server config exist', () => {
    expect(config.get('db.host')).toBe('mongodb://localhost/vidlyDB_tests');});
    it('should return all genres', async () => {
      
     await Genre.collection.insertMany([{name: 'genre1'},{name: 'genre2'}]);
   
     const res = await request(server).get('/api/genres');
     expect(res.status).toBe(200);
     expect(res.body.length).toBe(2);
     expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
     expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });
  describe('GET /:id', () => {
     it('should return genre if valid id is passed',   async () => {
       const genre = new Genre({name: 'genres1'});
       await genre.save();
       const res = await request(server).get('/api/genres/' + genre._id);
       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('name', genre.name);
     });
     it('should return 404 if invalid id is passed',  async () => {
      const res = await request(server).get('/api/genres/1');
      expect(res.status).toBe(404);
     });
  });
  describe('POST /', () => {
     it('should return 401 if client is not logged in', async () => {
       const res = await request(server)
        .post('/api/genres')
        .send({ name: 'genre1' });

       expect(res.status).toBe(401);
     });
     it('should return 400 if genre is less than 5 characters', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
       .post('/api/genres')
       .set('x-auth-token', token)
       .send({ name: '1234' });

      expect(res.status).toBe(400);
     });
     it('should return 400 if genre is greater than 50 characters', async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join('a');
      const res = await request(server)
       .post('/api/genres')
       .set('x-auth-token', token)
       .send({ name: name });

      expect(res.status).toBe(400);
     });
  });
 
  it('should save the genre if it is valid', async () => {
    const token = new User().generateAuthToken();
    const res = await request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name:'genre1' });

      const genre = await Genre.find({name:'genre1'});
      //expect(genre === '').toBeTruthy();
    
    expect(genre).not.toBeNull();
  });
  it('should return genre if it is valid', async () => {
    const token = new User().generateAuthToken();
    const res = await request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1' });
    
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name','genre1');
  });
});
