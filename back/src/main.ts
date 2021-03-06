import * as cors from 'cors';
import { NestFactory, Reflector } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { sequelize } from './config/database';
import { DtoPipe } from 'nestjs-extensions';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await sequelize.sync({ force: false });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'assets', 'public')));

  app.set('views', path.join(__dirname, 'assets', 'public', 'views'));
  app.set('view engine', 'pug');

  app.useGlobalPipes(new DtoPipe(new Reflector()));

  const options = new DocumentBuilder()
    .setTitle('Word Kombat')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .setDescription('The Word-Kombat API description')
    .setVersion('0.5.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.NODE_PORT || 3000);
}

bootstrap();
