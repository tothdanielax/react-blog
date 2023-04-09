import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import * as CommentService from "../../../../shared/services/CommentService";

type Props = {
    postId: number;
    onSubmit: () => void;
}
export default function AddComment({postId, onSubmit}: Props) {
    const [text, setText] = useState<string>('');
    const [userName, setUserName] = useState<string>('Guest');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text || !userName) {
            return;
        }

        CommentService.postComment({
            userName: userName,
            text: text
        }, postId)
            .then(() => {
                onSubmit();
            });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormControl type={'text'}
                         placeholder={'Enter your name here...'}
                         value={userName}
                         onChange={(e) => setUserName(e.target.value)}
                         className='border my-2'
                         required={true}
            />
            <FormControl as='textarea'
                         rows={3}
                         placeholder='Enter your comment here...'
                         value={text}
                         onChange={(e) => setText(e.target.value)}
                         required={true}
            />
            <Button variant='primary'
                    type='submit'
                    className='mt-2 float-end'
            >Add Comment</Button>
        </Form>
    );
}

export const AddCommentMemo = React.memo(AddComment);