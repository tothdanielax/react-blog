import * as PostService from "../../shared/services/PostService";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BlogPostDto from "../../shared/models/BlogPostDto.dto";
import { CardItemMemo } from "./card-item/card-item";
import { AddPostMemo } from "./add-post/add-post";
import { PaginateMemo } from "../../shared/paginate/paginate";
import usePaginatedPosts from "../../shared/paginate/paginated-posts";
import PaginateProps from "../../shared/paginate/paginate-props.interface";


export function AdminPage() {
    const { posts,
        displayedPosts,
        handlePageChange,
        setPosts }: PaginateProps = usePaginatedPosts(999);

    const [addPost, setAddPost] = useState<boolean>(false);

    const handleDeletePost = (id: number) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    const handleAddPost = () => {
        setAddPost(true);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setAddPost(false);
        PostService.getPosts()
            .then(dto => {
                if (!dto) return; // invalid dto
                setPosts(dto.results ?? []);
            })
    };

    const handleCancel = () => {
        setAddPost(false);
    };

    const handleUpdatePost = (id: number, title: string, body: string) => {
        setPosts(posts.map(p => {
            if (p.id === id) {
                p.title = title;
                p.body = body;
            }
            return p;
        }));
    }

    return (
        <>
            <h1>Admin page</h1>
            <hr/>

            {!addPost ?
                <Button variant='primary'
                        onClick={handleAddPost}
                        className='mb-3 float-right'
                >Add post</Button>
                :
                <>
                    <Row>
                        <Col>
                            <AddPostMemo onSubmit={handleSubmit}
                                         onCancel={handleCancel}/>
                        </Col>
                    </Row>
                    <hr/>
                </>
            }

            <Row lg={4}
                 md={3}
                 xs={1}
                 className='g-3'>
                {
                    displayedPosts.map((dto: BlogPostDto) => (
                        <Col key={dto.id}>
                            <CardItemMemo post={PostService.convertPostDtoToModel(dto)}
                                          id={dto.id}
                                          onDelete={handleDeletePost}
                                          onUpdate={handleUpdatePost}
                            />
                        </Col>
                    ))
                }
            </Row>
            <PaginateMemo itemsPerPage={12}
                          allItemsNumber={posts.length}
                          setCurrentPageItems={handlePageChange}/>
        </>
    )
}