import 'reflect-metadata';
import {StartupFactory} from './presentation/commands/startup/startup-factory';

const startupFactory = new StartupFactory();
startupFactory.make().execute();
