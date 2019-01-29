import { Observable } from 'rxjs';
import { Entity } from './entities/entity';

export interface IStorage<TEntity extends Entity> {
    getMany(predicate: any): Observable<TEntity[]>;

    insert(entity: TEntity): Observable<TEntity>;

    update(entity: TEntity): Observable<TEntity>;

    delete(entity: TEntity): Observable<TEntity>;
}
