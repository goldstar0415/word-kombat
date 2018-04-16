import {NestFactory, Reflector} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as path from "path";
import * as bodyParser from 'body-parser';
import {sequelize} from "./config/database";
import {DtoPipe} from "nestjs-extensions";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    await sequelize.sync({force: true});

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.set('views', path.join(__dirname, 'assets', 'template'));
    app.set('view engine', 'pug');

    app.useGlobalPipes(new DtoPipe(new Reflector()));

    const options = new DocumentBuilder()
        .setTitle('Word Kombat')
        .setDescription('The word-kombat API description')
        .setVersion('0.5.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/docs', app, document);

    await app.listen(process.env.NODE_PORT || 3000);
}

bootstrap();
