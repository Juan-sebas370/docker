const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/userModel');

describe('User API', () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await User.deleteMany({}); // Delete all users before each test
  });

  // Test POST /api/users/register
  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123',
        });

      // Check if the response status is 201 (Created)
      expect(res.statusCode).toBe(201);
      // Check if the response body contains the username
      expect(res.body.data).toHaveProperty('username', 'testuser');
      // Ensure password is not returned in the response
      expect(res.body.data).not.toHaveProperty('password');
    });
  });

  // Test POST /api/users/login
  describe('POST /api/users/login', () => {
    // Create a user before running the login test
    beforeEach(async () => {
      await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123',
        });
    });

    it('should login successfully', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@test.com',
          password: 'password123',
        });

      // Check if the response status is 200 (OK)
      expect(res.statusCode).toBe(200);
      // Ensure the response contains a token
      expect(res.body.data).toHaveProperty('token');
      // Ensure the user data is returned with the correct username
      expect(res.body.data.user).toHaveProperty('username', 'testuser');
    });
  });
});