export interface ICommand<TInput, TOutput> {
    execute(input?: TInput): TOutput;
}
