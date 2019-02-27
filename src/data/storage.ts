import { Db } from 'mongodb';
import { Observable } from 'rxjs';

export class Storage<TEntity> {
    private readonly db!: Db;

    getMany(predicate: any): Observable<TEntity[]> {
        return Observable.create(this.db.collection('').find(predicate));
    }

    insert(entity: TEntity): Observable<TEntity> {
        return Observable.create(this.db.collection('').insertOne(entity));
    }

    update(entity: TEntity): Observable<TEntity> {
        return Observable.create(this.db.collection('').updateOne({ _id: (<any>entity).id }, entity));
    }

    delete(entity: TEntity): Observable<TEntity> {
        return Observable.create(this.db.collection('').deleteOne({ _id: (<any>entity).id }));
    }
}
