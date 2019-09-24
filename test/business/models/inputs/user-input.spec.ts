import { UserInput } from '../../../../src/business/models/inputs/user-input';

describe('user-input', () => {
    const init: Partial<UserInput> = {
        firstName: 'First name here.',
        lastName: 'Last name here',
        dateOfBirth: '1989-05-02',
        height: 165,
        weight: 58,
        city: 'Sibiu',
    };

    let instance: UserInput;

    beforeEach(() => {
        instance = new UserInput(init);
    });

    describe('constructor', () => {
        it('#firstName is set', () => {
            expect(instance.firstName).toEqual(init.firstName);
        });

        it('#lastName is set', () => {
            expect(instance.lastName).toEqual(init.lastName);
        });

        it('#dateOfBirth is set', () => {
            expect(instance.dateOfBirth).toEqual(init.dateOfBirth);
        });

        it('#height is set', () => {
            expect(instance.height).toEqual(init.height);
        });

        it('#weight is set', () => {
            expect(instance.weight).toEqual(init.weight);
        });

        it('#city is set', () => {
            expect(instance.city).toEqual(init.city);
        });
    });
});
