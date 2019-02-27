import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDataAutomapper } from './i-data-automapper';

export class DataAutomapper implements IDataAutomapper {
    map<TSource, TDestination>(source: TSource): Observable<TDestination> {
        return Observable.create({}).pipe(tap((destination) => Object.assign(destination, source)));
    }
}
