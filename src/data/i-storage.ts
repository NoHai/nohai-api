import { Observable } from 'rxjs';

export interface IStorage<TEntity> {
    getMany(predicate: any): Observable<TEntity[]>;

    insert(entity: TEntity): Observable<TEntity>;

    update(entity: TEntity): Observable<TEntity>;

    delete(entity: TEntity): Observable<TEntity>;
}
