import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { productList } from "../../Utils/CustomList"
import { useDispatch, useSelector } from "react-redux"
import { getAllProduct, setProductViaPagination } from '../../Database/Action/DashboardAction';

const Pagination = ({ itemPerPage }) => {
    const dispatch = useDispatch();
    const allProduct = useSelector((state) => state.DashboardReducer.allProducts);
    console.log("all product is    ", allProduct)
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = allProduct?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allProduct.length / itemPerPage);

    const handlePageChange = (event) => {
        const newOffset = (event.selected * itemPerPage) % allProduct.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        dispatch(setProductViaPagination(currentItems));
        allProduct?.length === 0 && dispatch(getAllProduct())
    }, [itemPerPage, itemOffset])
    return (
        <div className='pagination'>
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )
}

export default Pagination