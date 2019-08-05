import { Sport } from '../../business/models/results/sport';
import { Sport as SportEntity } from '../entities/sport';

export class SportFactory {
    static result = {
        fromUserEntity: (input: SportEntity) => new Sport(input),
    };
}
