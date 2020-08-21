import { Observable, iif, of } from 'rxjs';
import { ICommentRepository } from '../repositories/i-comment-repository';
import { IDeleteComment } from './i-delete-comment';
import { flatMap, catchError, tap } from 'rxjs/operators';

export class DeleteComment implements IDeleteComment {
  constructor(private readonly commentRepository: ICommentRepository) { }

  execute(id: string): Observable<boolean> {
    return this.commentRepository.delete(id);
  }
}
