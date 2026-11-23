const request = require('supertest');

// Always use the in-memory database for tests
delete process.env.MONGODB_URI;

const app = require('../src/app');
const { connectDb, disconnectDb } = require('../src/db');
const Task = require('../src/models/task');

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await disconnectDb();
});

beforeEach(async () => {
  await Task.deleteMany({});
});

// Example test - use it as a template for your own tests.
describe('POST /api/tasks', () => {
  it('creates a task', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Write tests' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Write tests');
    expect(res.body.status).toBe('open');
    expect(res.body.id).toBeDefined();
  });
});


describe('GET /api/tasks/123', () => {
  // Bug 5 ungültige Id
  it('returns 400 for an invalid ID', async () => {
    const res = await request(app).get('/api/tasks/123');

    expect(res.status).toBe(400);
  });
});

describe('GET /api/tasks', () => {
  // Bug 1 Taskliste leer
  it('returns created tasks in the task list', async () => {
    await request(app).post('/api/tasks').send({
      title: 'My test task'
    });

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('My test task');
  });
});

describe('POST /api/tasks', () => {
  // Bug 3 Fälligkeitdatum zeigt falschen Tag an
  it('saves the correct due date', async () => {
    const res = await request(app).post('/api/tasks').send({
      title: 'Test due date',
      dueDate: '2026-12-20'
    });

    expect(res.status).toBe(201);
    expect(res.body.dueDate).toContain('2026-12-20');
  });
});