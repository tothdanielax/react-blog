import React, { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import * as PostService from "../../../shared/services/PostService";

type Props = {
    onSubmit: (e: any) => void;
    onCancel: () => void;
}

export default function AddPost({onSubmit, onCancel}: Props) {
    const [title, setTitle] = React.useState<string>('');
    const [body, setBody] = React.useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!title || !body) {
            return;
        }

        PostService.postPost({title, body})
            .then(() => {
                onSubmit(e);
            });

    }

    const handleReset = () => {
        setTitle('');
        setBody('');
    }

    const handleCancel = () => {
        handleReset();
        onCancel();
    }

    return (
        <>
            <Form className='border border-dark p-5'
                  onSubmit={handleSubmit}
            >
                <h3>Add post</h3>
                <hr/>
                <Form.Group className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text'
                                  placeholder='Example: Bayern Munich vs Man. City'
                                  className='border'
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control as='textarea'
                                  rows={3}
                                  placeholder='Example: Bayern will win.'
                                  value={body}
                                  onChange={(e) => setBody(e.target.value)}
                                  required
                    />
                </Form.Group>
                <div className='float-end'>
                    <Button variant='primary'
                            type='submit'
                    >Submit</Button>
                    <Button variant='secondary'
                            type='button'
                            className='ms-2'
                            onClick={handleReset}
                    >Reset</Button>
                    <Button variant='danger'
                            type='button'
                            className='ms-2'
                            onClick={handleCancel}
                    >Cancel</Button>
                </div>
            </Form>
        </>
    )
}

export const AddPostMemo = React.memo(AddPost);