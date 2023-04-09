import React, { useEffect, useState } from "react";
import * as CommentService from "../../../shared/services/CommentService";
import { AddCommentMemo } from "./add-comment/add-comment";
import { CommentItemMemo } from "./comment-item/comment-item";
import CommentPostDto from "../../../shared/models/CommentPostDto.dto";

type Props = {
    postId: number;
}

export default function CommentSection({postId}: Props) {
    const [comments, setComments] = useState<CommentPostDto[]>([]);
    const [commentAdded, setCommentAdded] = useState<boolean>(false);

    useEffect(() => {
        CommentService.getCommentsByPostId(postId)
            .then((dto) => {
                if (!dto) return; // invalid dto
                setComments(dto.results ?? [])
            });

        setCommentAdded(false);
    }, [commentAdded, postId]);

    return (
        <div className='mt-2'>
            <h2>Comments</h2>
            <hr/>
            {
                comments.map((commentDto) => (
                    <CommentItemMemo key={commentDto.id}
                                     comment={CommentService.convertCommentDtoToComment(commentDto)}
                    />
                ))
            }

            <AddCommentMemo postId={postId}
                            onSubmit={() => setCommentAdded(true)}/>
        </div>
    )
}

export const CommentSectionMemo = React.memo(CommentSection);