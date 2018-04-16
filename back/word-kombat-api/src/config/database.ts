import {Sequelize} from "sequelize-typescript";
import {ENTITIES} from "../entity";
import * as dotenv from 'dotenv';

dotenv.config();

const database = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    operatorsAliases: false
};

const sequelize = new Sequelize(database as any);

sequelize.addModels(ENTITIES);

export {database, sequelize};