import { APostType } from './apost.interface';

export interface PostType {
  limit: number;
  page: number;
  results: APostType[];
  totalPages: number;
  totalResults: number;
}
