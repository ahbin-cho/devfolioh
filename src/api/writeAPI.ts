import axios, { AxiosResponse } from "axios";

interface IPostData {
  id?: string;
  title: string;
  thumbnail?: string;
  body: string;
  tags?: string[];
}

const BASE_URL = 'https://limitless-sierra-67996.herokuapp.com/v1/';

const instance = axios.create({
  baseURL: BASE_URL,
});

const getResponseBody = (response: AxiosResponse) => response.data;
const postResponseBody = (response: AxiosResponse) => response;

const requests = {
  get: (url: string,) => instance.get(url).then(getResponseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(postResponseBody),
  patch: (url: string, body: {}) => instance.post(url, body).then(postResponseBody)
}

export const WriteAPI = {
  get: (id: string): Promise<IPostData> => requests.get(`posts/${id}`),
  post: (body: IPostData) => requests.post('posts', body),
  patch: (id: string, body: IPostData): Promise<AxiosResponse> => instance.patch(`posts/${id}`, body)
}