import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import users from '../files/users.json';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/email-parser (POST) with email attachment', () => {
    const emailSource = {
      source: 'files/email-json-attach.eml',
    };

    return request(app.getHttpServer())
      .post('/email-parser')
      .send(emailSource)
      .expect(200)
      .expect(users);
  });

  it('/email-parser (POST) with email attachment', () => {
    const emailSource = {
      source: 'files/email-json-link.eml',
    };

    return request(app.getHttpServer())
      .post('/email-parser')
      .send(emailSource)
      .expect(200)
      .expect(users);
  });
});
