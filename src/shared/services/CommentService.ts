import axios from "axios";
import CommentPostModel from "../models/CommentPost.model";
import DtoPageResult from "../models/BlogPostDtoPageResult.dto";
import CommentPostDto from "../models/CommentPostDto.dto";

const swaggerUrl = "https://futurioninterview2.azurewebsites.net/Comment";

export const getCommentsByPostId = (postId: number, page?: number, pageSize?: number): Promise<DtoPageResult<CommentPostDto>> => {
    return axios.get(`${swaggerUrl}/${postId}`, {
        params: {
            page: page ?? 1,
            pageSize: pageSize ?? 12,
        },
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            return false;
        });
};

export const postComment = (comment: CommentPostModel, postId: number): Promise<boolean> => {
    return axios
        .post(`${swaggerUrl}/${postId}`, comment)
        .then((response) => response.status === 200)
        .catch((error) => {
            console.error(error);
            return false;
        });
};

export const convertCommentDtoToComment = (commentDto: CommentPostDto): CommentPostModel => {
    return {
        userName: commentDto.userName,
        text: commentDto.text,
    }
};
