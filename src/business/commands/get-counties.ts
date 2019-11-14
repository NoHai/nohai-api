import { Observable } from 'rxjs';
import { County } from '../models/results/county';
import { IGetCounties } from './i-get-counties';
import { ICountyRepository } from '../repositories/i-county-repository';

export class GetCounties implements IGetCounties {
    constructor(private countyRepository: ICountyRepository) { }

    execute(parameter: string): Observable<County[]> {
        return this.countyRepository.get(parameter);
    }
}
