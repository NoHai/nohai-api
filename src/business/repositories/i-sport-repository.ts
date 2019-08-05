import { Observable } from 'rxjs';
import { Sport } from '../models/results/sport';

export interface ISportRepository {
    getAll(): Observable<Sport>;
}
