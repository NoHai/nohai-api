import { City } from '../../../src/data/entities/city';
import { User as UserEntity } from '../../../src/data/entities/user';

describe('user', () => {
    const init: any = {
        id: 'Random id here.',
        firstName: 'First name here.',
        lastName: 'Last name here',
        dateOfBirth: new Date('1989-05-02'),
        height: 165,
        weight: 58,
        picture: '',
        city: new City(),
        login: 'Login here.',
        password: 'Password here.',
    };

    let instance: UserEntity;

    beforeEach(() => {
        instance = new UserEntity(init);
    });

    describe('constructor', () => {
        it('id is set', () => {
            expect(instance.id).toEqual(init.id);
        });

        it('#login is set', () => {
            expect(instance.login).toEqual(init.login);
        });

        it('#password is set', () => {
            expect(instance.password).toEqual(init.password);
        });

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

        it('picture', () => {
            expect(instance.picture).toEqual(init.picture);
        });

        it('city is set', () => {
            expect(instance.city).toEqual(init.city);
        });
    });
});
