import { Button, Card } from "react-bootstrap";
import React from "react";
import BlogPostPostModel from "../../../shared/models/BlogPostPost.model";
import * as PostService from "../../../shared/services/PostService";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './card-item.css';

type Props = {
    post: BlogPostPostModel;
    id: number;
    onDelete: (id: number) => void;
    onUpdate: (id: number, title: string, body: string) => void;
}

export function CardItem({post, id, onDelete, onUpdate}: Props) {
    const [title, setTitle] = React.useState<string>(post.title ?? 'Undefined title');
    const [body, setBody] = React.useState<string>(post.body ?? 'Undefined body');
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    const navigate = useNavigate();

    function handleDelete(): void {
        PostService.deletePost(id)
            .then(() => {
                onDelete(id);
            });
    }

    function handleEdit(): void {
        setIsEditing(!isEditing);
    }

    function handleSave(): void {
        setIsEditing(!isEditing);
        PostService.putPost({title, body}, id)
            .then(r => {
                if (r) {
                    onUpdate(id, title, body);
                }
            }
            );
    }

    function handleImgClick(): void {
        navigate(`/post/${id}`);
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): boolean {
        setTitle(e.target.value);
        return true;
    }

    function handleBodyChange(e: React.ChangeEvent<HTMLInputElement>): boolean {
        setBody(e.target.value);
        return true;
    }

    return (
        <>
            <Card>
                <LazyLoadImage
                    src='https://picsum.photos/200'
                    onClick={handleImgClick}
                    width={200}
                    height={200}
                    className='pointer h-100 w-100 card-img-top'
                />
                <Card.Body>
                    <Card.Title>
                        <input type='text'
                               readOnly={!isEditing}
                               value={title}
                               className={isEditing ? 'editing' : ''}
                               onChange={handleTitleChange}
                        ></input>
                    </Card.Title>
                    <Card.Text>
                        <input type='text'
                               readOnly={!isEditing}
                               value={body}
                               className={isEditing ? 'editing' : ''}
                               onChange={handleBodyChange}
                        ></input>
                    </Card.Text>
                    <div className='float-end'>
                        <Button variant={isEditing ? 'success' : 'primary'}
                                onClick={isEditing ? handleSave : handleEdit}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                        <Button variant='danger'
                                className='ms-1'
                                onClick={handleDelete}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export const CardItemMemo = React.memo(CardItem);