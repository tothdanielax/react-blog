import React from "react";
import { ListGroup } from "react-bootstrap";
import { ListItemMemo } from "./list-item/list-item";
import { PaginateMemo } from "../../shared/paginate/paginate";
import PaginateProps from "../../shared/paginate/paginate-props.interface";
import usePaginatedPosts from "../../shared/paginate/paginated-posts";

export default function PublicPage() {
    const { posts,
        displayedPosts,
        handlePageChange}: PaginateProps = usePaginatedPosts(999);

    return (
        <>
            <h1>Public page</h1>
            <hr/>

            {
                posts.length > 0 ?
                    <ListGroup>
                        {displayedPosts &&
                            displayedPosts.map((p) => (
                                <ListItemMemo key={p.id}
                                              post={p}/>
                            ))}
                    </ListGroup>
                    : <p>No posts found.</p>
            }

            <PaginateMemo itemsPerPage={12}
                          allItemsNumber={posts.length}
                          setCurrentPageItems={handlePageChange}/>

        </>
    );
}
