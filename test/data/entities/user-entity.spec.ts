import { User as UserEntity } from '../../../src/data/entities/user';
import { City } from '../../../src/data/entities/city';

describe('user', () => {
    const init: Partial<UserEntity> = {
        id: 'Random id here.',
        firstName: 'First name here.', 
        lastName: 'Last name here', 
        dateOfBirth:  new Date('1989-05-02'),
        height: 165,
        weight: 58,
        picture: '',
        city:  new City()
        
    };

    let instance: UserEntity;

    beforeEach(() => {
        instance = new UserEntity(init);
    });

    describe('constructor', () => {
        it('id is set', () => {
            expect(instance.id).toEqual(init.id);
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
