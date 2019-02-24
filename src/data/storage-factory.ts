import { Observable } from 'rxjs';
import { Entity } from './entities/entity';
import { IStorage } from './i-storage';
import { IStorageFactory } from './i-storage-factory';
import { Storage } from './storage';

export class StorageFactory implements IStorageFactory {
    make<TEntity extends Entity>(): IStorage<TEntity> {
        return new Storage<TEntity>();
    }
}
