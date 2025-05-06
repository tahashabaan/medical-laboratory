import request from 'supertest';
import { app } from '../src/app';
import { Models } from '../src/models';

describe('Subscription API', () => {
  let subscriptionId: string;

  afterAll(async () => {
    await Models.Subscription.delete({});
  });

  it('should create a subscription', async () => {
    const res = await request(app)
      .post('/api/v1/subscriptions')
      .send({
        subscription_name: 'Platinum Plan',
        subscription_price: '200',
        subscription_duration: '2025-01-01T00:00:00Z',
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.subscription_id).toBeDefined();
    subscriptionId = res.body.data.subscription_id;
  });

  it('should fetch the created subscription', async () => {
    const res = await request(app)
      .get(`/api/v1/subscriptions/${subscriptionId}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.subscription_id).toBe(subscriptionId);
  });

  it('should update the subscription', async () => {
    const res = await request(app)
      .patch(`/api/v1/subscriptions/${subscriptionId}`)
      .send({ subscription_price: '250' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
  });

  it('should delete the subscription', async () => {
    const res = await request(app)
      .delete(`/api/v1/subscriptions/${subscriptionId}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
  });
});
