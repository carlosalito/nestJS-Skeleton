import { NestFactory } from '@nestjs/core';
// NestJs
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';


const server: express.Express = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// usado para conectar o express ao nest
const startNestApplication = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

  if (process.env.NODE_ENV !== 'production') {
    app.setGlobalPrefix('api');
  }

  app.enableCors();
  await app.init();
  await app.listen('5000');
};

void startNestApplication(server);

// usado para conectar o firebase ao express
export const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`;
  }
  return server(request, response);
});
