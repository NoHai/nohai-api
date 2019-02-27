import { IStorage } from './i-storage';

export interface IStorageFactory {
    make<TEntity>(): IStorage<TEntity>;
}
