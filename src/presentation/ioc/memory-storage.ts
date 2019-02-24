import {asClass} from 'awilix';
import {StorageFactory} from '../../data/storage-factory';

export const memoryStorage: ReadonlyArray<any> = [
    {storageFactory: asClass(StorageFactory).singleton()},
];
