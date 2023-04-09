import BlogPostDto from "../models/BlogPostDto.dto";

export default interface PaginateProps {
    posts: BlogPostDto[];
    displayedPosts: BlogPostDto[];
    handlePageChange: (page: number) => void;
    setPosts: (posts: BlogPostDto[]) => void;
}