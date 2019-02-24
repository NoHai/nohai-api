import {asClass} from 'awilix';
import {DataAutomapper} from '../../data/mapping/data-automapper';

export const dataAutomapper: ReadonlyArray<any> = [
    {mapper: asClass(DataAutomapper).classic()},
];
