import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { PostSectionMemo } from "./post-section/post-section";
import { CommentSectionMemo } from "./comment-section/comment-section";

export default function PostPage() {
    const {id} = useParams<{ id: string }>();
    const postId: number = parseInt(id as string, 10);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!id || isNaN(postId)) {
            return navigate('/');
        }

    }, [id, navigate, postId]);

    return (
        <Row>
            <Col>
                <PostSectionMemo postId={postId}/>
            </Col>

            <div className='vr p-0 mt-5 mx-2'></div>

            <Col>
                <CommentSectionMemo postId={postId}/>
            </Col>
        </Row>
    );
}