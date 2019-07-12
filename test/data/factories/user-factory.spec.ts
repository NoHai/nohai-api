import { User as UserEntity } from '../../../src/data/entities/user';
import { UserInput } from '../../../src/business/models/inputs/user-input';
import { UserFactory } from '../../../src/data/factories/user-factory';
import { User as UserResult } from '../../../src/business/models/results/user';

describe('event-factory', () => {
    describe('makeEntity', () => {
        const input = new UserInput({
            firstName: 'Random input first name here.',
            lastName: 'Random entity last name here.'
        });

        let actual: UserEntity;

        beforeEach(() => {
            actual = UserFactory.makeEntity(input);
        });

        it('first name is set', () => {
            expect(actual.firstName).toEqual(input.firstName);
        });

        it('last name is set', () => {
            expect(actual.lastName).toEqual(input.lastName);
        });
    });

    describe('makeResult', () => {
        const entity = new UserEntity({
            firstName: 'Random entity first name here.',
            lastName: 'Random entity last name here.',
        });

        let actual: UserResult;

        beforeEach(() => {
            actual = UserFactory.makeResult(entity);
        });

        it('first name is set', () => {
            expect(actual.firstName).toEqual(entity.firstName);
        });

        it('last name is set', () => {
            expect(actual.lastName).toEqual(entity.lastName);
        })
    });
});
