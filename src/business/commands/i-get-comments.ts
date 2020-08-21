import { Comment as CommentResult } from '../../business/models/results/comment';
import { IObservableCommand } from './core/i-observable-command';

export interface IGetComments extends IObservableCommand<string, CommentResult[]> { }
