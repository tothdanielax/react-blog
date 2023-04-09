import ReactPaginate from "react-paginate";
import React from "react";

type Props = {
    itemsPerPage: number;
    allItemsNumber: number;
    setCurrentPageItems: (page: number) => void;
}

export default function Paginate({itemsPerPage, allItemsNumber, setCurrentPageItems}: Props) {
    const [pageCount, setPageCount] = React.useState(0);

    React.useEffect(() => {
        setPageCount(Math.ceil(allItemsNumber / itemsPerPage));
    }, [allItemsNumber, itemsPerPage]);

    const onPageChange = (selected: number) => {
        const currentPage: number = selected + 1;
        setCurrentPageItems(currentPage);
    }

    return (
        <ReactPaginate
            nextLabel='Next >'
            onPageChange={(selected) => onPageChange(selected.selected)}
            pageCount={pageCount}
            previousLabel='< Previous'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            containerClassName='pagination justify-content-center mt-4'
            activeClassName='active'
        />
    );
}

export const PaginateMemo = React.memo(Paginate);