import { useEffect, useState } from "react";
import * as PostService from "../services/PostService";
import BlogPostDto from "../models/BlogPostDto.dto";
import PaginateProps from "./paginate-props.interface";

export default function usePaginatedPosts(pageSize: number = 12) {
    const [posts, setPosts] = useState<BlogPostDto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedPosts, setDisplayedPosts] = useState<BlogPostDto[]>([]);


    useEffect(() => {
        if (posts.length === 0) {
            PostService.getPosts(1, pageSize)
                .then((dto) => {
                    if (!dto) return; // invalid dto
                    setPosts(dto.results ?? []);
                });
        }

        setDisplayedPosts(posts.slice((currentPage - 1) * 12, currentPage * 12));

    }, [currentPage, pageSize, posts]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return { posts, displayedPosts, handlePageChange, setPosts } as PaginateProps;
}