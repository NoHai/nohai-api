import { Db } from 'mongodb';
import { Observable } from 'rxjs';
import { Entity } from './entities/entity';
import { IStorage } from './i-storage';

export class Storage<TEntity extends Entity> implements IStorage<TEntity> {
    private readonly db!: Db;

    getMany(predicate: any): Observable<TEntity[]> {
        return Observable.create(this.db.collection('').find(predicate));
    }

    insert(entity: TEntity): Observable<TEntity> {
        return Observable.create(this.db.collection('').insertOne(entity));
    }

    update(entity: TEntity): Observable<TEntity> {
        return Observable.create(this.db.collection('').updateOne({ _id: entity.id }, entity));
    }

    delete(entity: TEntity): Observable<TEntity> {
        return Observable.create(this.db.collection('').deleteOne({ _id: entity.id }));
    }
}
