import { Observable } from 'rxjs';
import { County } from '../models/results/county';

export interface ICountyRepository {
    get(parameter: string): Observable<County[]>;
}
