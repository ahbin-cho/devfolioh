import axios, { AxiosResponse } from 'axios';
import { PostType } from 'src/typings/post.interface';
import { CommnetType } from '@typings/comment.interface';
const instance = axios.create({
  baseURL: 'https://limitless-sierra-67996.herokuapp.com/v1/',
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const PostAPI = {
  getAllPosts: (pageNumber: number): Promise<PostType> =>
    requests.get(`posts?sortBy=asc&limit=12&page=${pageNumber}}`),
  getTotalResult: (): Promise<PostType> => requests.get('posts'),
  getComments: (id: string): Promise<CommnetType> =>
    requests.get(`comments?postId=${id}`),
};
