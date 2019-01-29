import { Observable } from 'rxjs';

export interface IDataAutomapper {
    map<TSource, TDestination>(source: TSource): Observable<TDestination>;
}
