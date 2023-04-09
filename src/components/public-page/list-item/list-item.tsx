import { Link } from "react-router-dom";
import React from "react";
import classNames from 'classnames';
import { Button, ListGroupItem } from "react-bootstrap";
import BlogPostDto from "../../../shared/models/BlogPostDto.dto";

type Props = {
    post: BlogPostDto;
}

export function ListItem({post}: Props) {
    const [isActive, setIsActive] = React.useState<boolean>(false);

    return (
        <ListGroupItem
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            className={classNames('list-item', 'pointer', 'w-75', 'mx-auto', {active: isActive})}>
            <h3>{post.title}</h3>
            <p className={'d-inline text-muted'}>
                {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <Link to={`/post/${post.id}`}
                  className='float-end'>
                <Button variant='secondary'
                        size='sm'>
                    Read more
                </Button>
            </Link>
        </ListGroupItem>
    );
}

export const ListItemMemo = React.memo(ListItem);