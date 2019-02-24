import {AwilixContainer, createContainer, InjectionMode} from 'awilix';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {businessCommands} from './business-commands';
import {businessRepositories} from './business-repositories';
import {dataAutomapper} from './data-automapper';
import {memoryStorage} from './memory-storage';

class Container {
    private container: AwilixContainer = createContainer({injectionMode: InjectionMode.CLASSIC});

    configure(): Observable<any> {
        return of([] as ReadonlyArray<any>)
            .pipe(map((registrations) => registrations.concat(dataAutomapper)))
            .pipe(map((registrations) => registrations.concat(memoryStorage)))
            .pipe(map((registrations) => registrations.concat(businessRepositories)))
            .pipe(map((registrations) => registrations.concat(businessCommands)))
            .pipe(tap((registrations) => this.register(registrations)));
    }

    resolve(serviceName: string): any {
        return this.container.resolve(serviceName);
    }

    private register(registrations: ReadonlyArray<any>): void {
        registrations.forEach((registration) => this.container.register(registration));
    }
}

export const container = new Container();
