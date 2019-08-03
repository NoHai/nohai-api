import dotenv from 'dotenv';
import { resolve } from 'path';
import 'reflect-metadata';
import { StartupFactory } from './presentation/commands/startup/startup-factory';

dotenv.config({ path: resolve(__dirname, `../.env.${process.env.environment}`) });

const startupFactory = new StartupFactory();
startupFactory.make().execute().subscribe();

