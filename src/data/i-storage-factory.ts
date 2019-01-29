import { Observable } from 'rxjs';
import { Entity } from './entities/entity';
import { IStorage } from './i-storage';

export interface IStorageFactory {
    make<TEntity extends Entity>(): Observable<IStorage<TEntity>>;
}
