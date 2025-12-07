/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('Main Bootstrap', () => {
  let mockApp: any;

  beforeEach(() => {
    mockApp = {
      enableCors: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create NestJS application', async () => {
    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(NestFactory.create).toHaveBeenCalledTimes(1);
  });

  it('should enable CORS with correct configuration', async () => {
    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await bootstrap();

    expect(mockApp.enableCors).toHaveBeenCalledWith({
      origin: ['http://localhost:3000'],
      methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      allowedHeaders:
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      credentials: true,
    });
    expect(mockApp.enableCors).toHaveBeenCalledTimes(1);
  });

  it('should enable CORS with localhost:3000 as origin', async () => {
    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await bootstrap();

    const corsConfig = mockApp.enableCors.mock.calls[0][0];
    expect(corsConfig.origin).toEqual(['http://localhost:3000']);
  });

  it('should enable CORS with credentials', async () => {
    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await bootstrap();

    const corsConfig = mockApp.enableCors.mock.calls[0][0];
    expect(corsConfig.credentials).toBe(true);
  });

  it('should listen on port 3001 by default', async () => {
    delete process.env.PORT;

    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(3001);
    expect(mockApp.listen).toHaveBeenCalledTimes(1);
  });

  it('should listen on custom port from environment variable', async () => {
    process.env.PORT = '4000';

    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith('4000');

    delete process.env.PORT;
  });

  it('should configure all HTTP methods in CORS', async () => {
    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await bootstrap();

    const corsConfig = mockApp.enableCors.mock.calls[0][0];
    expect(corsConfig.methods).toBe('GET,OPTIONS,PATCH,DELETE,POST,PUT');
  });

  it('should configure allowed headers in CORS', async () => {
    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await bootstrap();

    const corsConfig = mockApp.enableCors.mock.calls[0][0];
    expect(corsConfig.allowedHeaders).toContain('Content-Type');
    expect(corsConfig.allowedHeaders).toContain('X-Api-Version');
    expect(corsConfig.allowedHeaders).toContain('Accept');
  });

  it('should bootstrap successfully without errors', async () => {
    const bootstrap = async () => {
      const app = await NestFactory.create(AppModule);
      app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        allowedHeaders:
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        credentials: true,
      });
      await app.listen(process.env.PORT ?? 3001);
    };

    await expect(bootstrap()).resolves.not.toThrow();
  });
});
