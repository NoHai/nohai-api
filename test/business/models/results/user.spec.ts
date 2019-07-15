import { User as UserModel } from '../../../../src/business/models/results/user';

describe('user', () => {
    const init: Partial<UserModel> = {
        firstName: 'First name here.',
        lastName: 'Last name here', 
        dateOfBirth:  new Date('1989-05-02'),
        height: 165,
        weight: 58,
        picture: '',
        city:  'Sibiu',
    };

    let instance: UserModel;

    beforeEach(() => {
        instance = new UserModel(init);
    });

    describe('constructor', () => {
        it('first name is set', () => {
            expect(instance.firstName).toEqual(init.firstName);
        });

        it('last name is set', () => {
            expect(instance.lastName).toEqual(init.lastName);
        });

        it('date of birth is set', () => {
            expect(instance.dateOfBirth).toEqual(init.dateOfBirth);
        });

        it('height is set', () => {
            expect(instance.height).toEqual(init.height);
        });

        it('weight is set', () => {
            expect(instance.weight).toEqual(init.weight);
        });

        it('picture is set', () => {
            expect(instance.picture).toEqual(init.picture);
        });

        it('city is set', () => {
            expect(instance.city).toEqual(init.city);
        });
    });
});
