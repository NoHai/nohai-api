import { IStorage } from './i-storage';
import { IStorageFactory } from './i-storage-factory';
import { Storage } from './storage';

export class StorageFactory implements IStorageFactory {
    make<TEntity>(): IStorage<TEntity> {
        return new Storage<TEntity>();
    }
}
