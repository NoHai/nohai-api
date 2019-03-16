﻿import { reset, fake, assert } from 'sinon';
import { InitializeGraph } from '../../../../src/presentation/commands/graph/initialize-graph';

describe('initialize-graph', () => {
    const use = fake();

    let instance: InitializeGraph;

    beforeEach(() => {
        instance = new InitializeGraph({use});
    });

    afterEach(() => {
        reset();
    });

    describe('execute', () => {
        beforeEach(async () => {
            return instance.execute().toPromise();
        });

        it('use is invoked to register graphQl', () => {
            assert.calledWith(use, '/graphql');
        });
    });
});