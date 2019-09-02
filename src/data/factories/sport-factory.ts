import { Sport } from '../../business/models/results/sport';
import { Sport as SportEntity } from '../entities/sport';

export class SportFactory {
    static result = {
        fromSportEntity: (input: SportEntity) => new Sport(input),
    };

    static entity = {
        fromSportResult: (sport: Sport) => new SportEntity(sport),
    };
}
