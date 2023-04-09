import React from "react";
import CommentPostModel from "../../../../shared/models/CommentPost.model";

type Props = {
    comment: CommentPostModel;
}
export default function CommentItem({comment}: Props) {

    return (
        <div>
            <span className='fw-bold'>{comment.userName}</span>
            <br/>
            <p className='border mt-1 rounded-2 px-3 mb-0 d-inline-block bg-secondary text-light'>{comment.text}</p>
            <hr/>
        </div>
    );
}

export const CommentItemMemo = React.memo(CommentItem);