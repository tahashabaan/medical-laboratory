import request from 'supertest';
import { app } from '../src/app';
import { Models } from '../src/models';

describe('Lap API', () => {
  let token: string;

  beforeAll(async () => {
    // Optionally, seed a user and get a token if auth is required
    // token = await getTestToken();
  });

  afterAll(async () => {
    // Clean up test data
    await Models.Lap.delete({});
    await Models.Subscription.delete({});
  });

  it('should not create a lab without subscription', async () => {
    const res = await request(app)
      .post('/api/v1/labs/subscription')
      .send({
        email: 'testlab1@example.com',
        password: 'testpass',
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it('should create a lab with a new subscription', async () => {
    const res = await request(app)
      .post('/api/v1/labs/subscription')
      .send({
        email: 'testlab2@example.com',
        password: 'testpass',
        subscription: {
          subscription_name: 'Gold Plan',
          subscription_price: '100',
          subscription_duration: '2024-12-31T00:00:00Z',
        },
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.lap_id).toBeDefined();
    expect(res.body.data.subscription_id).toBeDefined();
  });

  it('should create a lab with an existing subscription', async () => {
    const subscription = await Models.Subscription.save({
      subscription_name: 'Silver Plan',
      subscription_price: '50',
      subscription_duration: '2024-12-31T00:00:00Z',
    });
    const res = await request(app)
      .post('/api/v1/labs/subscription')
      .send({
        email: 'testlab3@example.com',
        password: 'testpass',
        subscription_id: subscription.subscription_id,
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.lap_id).toBeDefined();
    expect(res.body.data.subscription_id).toBe(subscription.subscription_id);
  });
});
