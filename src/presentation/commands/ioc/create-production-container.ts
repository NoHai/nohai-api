import { AwilixContainer } from 'awilix';
import { CreateCommonContainer } from './create-common-container';
import { ICreateContainer } from './i-create-container';

export class CreateProductionContainer implements ICreateContainer {
    private readonly createCommonContainer = new CreateCommonContainer();

    execute(): AwilixContainer {
        return this.createCommonContainer.execute();
    }
}