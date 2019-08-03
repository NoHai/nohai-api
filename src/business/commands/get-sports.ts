import { Observable } from 'rxjs';
import { Sport } from '../models/results/sport';
import { ISportRepository } from '../repositories/i-sport-repository';
import { IGetSports } from './i-get-sports';

export class GetSports implements IGetSports {

    constructor(private sportRepository: ISportRepository) {
    }

    execute(): Observable<Sport> {
        return this.sportRepository.getAll();
    }
}
