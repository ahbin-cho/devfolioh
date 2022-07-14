import { ACommentType } from './acomment.interface';

export interface CommnetType {
  limit: number;
  page: number;
  results: ACommentType[];
  totalPages: number;
  totalResults: number;
}
