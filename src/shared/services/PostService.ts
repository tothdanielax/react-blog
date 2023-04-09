import BlogPostPostModel from "../models/BlogPostPost.model";
import DtoPageResult from "../models/BlogPostDtoPageResult.dto";
import BlogPostDto from "../models/BlogPostDto.dto";

import axios from "axios";

const swaggerUrl = 'https://futurioninterview2.azurewebsites.net/BlogPost';

export const getPosts = (page?: number, pageSize?: number): Promise<DtoPageResult<BlogPostDto> | false> => {
    return axios.get(`${swaggerUrl}`, {
        params: {
            page: page ?? 1,
            pageSize: pageSize ?? 12
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            return false;
        });
};

export const postPost = (post: BlogPostPostModel): Promise<boolean> => {
    return axios
        .post(`${swaggerUrl}`, post)
        .then((response) => response.status === 200)
        .catch((error) => {
            console.error(error);
            return false;
        });
};

export const putPost = (post: BlogPostPostModel, id: number): Promise<boolean> => {
    return axios.put(`${swaggerUrl}/${id}`, post)
        .then((response) => response.status === 200)
        .catch((error) => {
            console.error(error);
            return false;
        });
};

export const deletePost = (id: number): Promise<boolean> => {
    return axios.delete(`${swaggerUrl}/${id}`)
        .then((response) => response.status === 200)
        .catch((error) => {
            console.error(error);
            return false;
        });
};

export const getPostById = (id: number): Promise<BlogPostDto | false> => {
    return axios.get(`${swaggerUrl}/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            return false;
        });
};

export const convertPostDtoToModel = (dto: BlogPostDto): BlogPostPostModel => {
    return {
        title: dto.title,
        body: dto.body,
    };
};

