import { Observable } from 'rxjs';

export interface ICommand<TInput, TOutput> {
    execute(input: TInput): Observable<TOutput>;
}
