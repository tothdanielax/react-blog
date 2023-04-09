import BlogPostDto from "./BlogPostDto.dto";
import CommentPostDto from "./CommentPostDto.dto";

export default interface DtoPageResult<T = BlogPostDto | CommentPostDto> {
    totalCount: number;
    totalPage: number;
    currentPage: number;
    results?: T[];
}