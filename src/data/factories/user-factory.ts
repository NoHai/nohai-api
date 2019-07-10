import { UserInput } from '../../business/models/inputs/user-input';
import { User as UserResult } from '../../business/models/results/user';
import { User as UserEntity } from '../entities/user';

export class UserFactory {
    static makeEntity(input: UserInput): UserEntity {
        return new UserEntity(input);
    }

    static makeResult(entity: UserEntity): UserResult {
        return new UserResult(entity);
    }
}
