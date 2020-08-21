import { CommentInput } from '../models/inputs/comment-input';
import { IObservableCommand } from './core/i-observable-command';

export interface ICreateComment extends IObservableCommand<CommentInput, Comment> {
}
