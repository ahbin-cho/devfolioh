import axios, { AxiosResponse } from "axios";

const BASE_URL = 'https://api.cloudinary.com/v1_1/dhdllpzl9/image/upload';

export const uploadThumbnail = (formData: any) => axios.post(BASE_URL, formData)

const postResponseBody = (response: AxiosResponse) => response;

const requests = {
  post: (url: string, body: {}) => axios.post(url, body).then(postResponseBody),
}

export const WriteAPI = {
  post: (formData: any) => requests.post(BASE_URL, formData),
}