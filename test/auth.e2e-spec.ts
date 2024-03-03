import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a register request', () => {
    const email = 'test1@example.com';
    const password = 't@eSt1234';
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201)
      .then((response) => {
        expect(response.get('Set-Cookie')).toBeDefined();
        const { id, email } = response.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});
