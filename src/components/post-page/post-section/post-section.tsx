import BlogPostDto from "../../../shared/models/BlogPostDto.dto";
import React, { useEffect, useState } from "react";
import * as PostService from "../../../shared/services/PostService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
    postId: number;
}

export default function PostSection({ postId }: Props) {
    const [post, setPost] = useState<BlogPostDto | undefined>(undefined);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        PostService.getPostById(postId)
            .then((dto) => {
                if (!dto) {
                    return navigate('/');
                }

                setPost(dto);
            });
    }, [navigate, postId]);

    return (
        <div className="border border-dark border-1 rounded-2 p-2">
            <h2>{post?.title ?? 'Undefined title'}</h2>
            <hr />
            <LazyLoadImage
                src='https://picsum.photos/500'
                width={500}
                height={500}
                className='w-100 rounded-2'
            />
            <span className='text-muted'>{post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Undefined date'}</span>
            <p className='border border-2 rounded-2 mt-3 p-3'>{post?.body ?? 'Undefined body'}</p>
        </div>
    )
}

export const PostSectionMemo = React.memo(PostSection);
