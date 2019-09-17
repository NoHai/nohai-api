import { Observable } from 'rxjs';
import { County } from '../models/results/county';
import { IGetCounties } from './i-get-counties';

export class GetCounties implements IGetCounties {
    execute(input: string): Observable<County> {
        throw new Error('Method not implemented.');
    }
}
