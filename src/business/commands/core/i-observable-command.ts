import { Observable } from 'rxjs';

export interface IObservableCommand<TInput, TOutput> {
    execute(input?: TInput): Observable<TOutput>;
}
