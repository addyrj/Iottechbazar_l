/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import product4_2 from "../../Assets/images/products/product-4-2-thumb.jpg"
import product4_3 from "../../Assets/images/products/product-4-3-thumb.jpg"
import product4Thumb from "../../Assets/images/products/product-4-thumb.jpg"
import styled from "styled-components"
import { NavLink } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { setLoader } from "../../Database/Action/DashboardAction";
import axios from "axios"
import { postHeaderWithToken } from '../../Database/ApiHeader';

const HtmlToReactParser = require('html-to-react').Parser;


const ListProduct = ({
    primaryImage,
    name,
    rating,
    review,
    subScript,
    model,
    productSku,
    stock,
    subCategoryName,
    productSpecialPrice,
    categoryName,
    proSection,
    secondaryImage,
    description,
    offer,
    specification,
    manufacturer,
    warranty,
    id,
    slug,
    commingsoon }) => {
    const dispatch = useDispatch();

    const getHtmlText = (html) => {
        const htmlToReactParser = new HtmlToReactParser();
        const reactElement = htmlToReactParser.parse(html);
        return reactElement;
    }

    const addWishList = (id, slug) => {
        if (isEmpty(id.toString()) || isEmpty(slug)) {
            toast.error("Failed! Product not found")
        } else {
            let formData = new FormData();
            formData.append("productId", id)
            formData.append("productSlug", slug)
            dispatch(setLoader(true));
            axios.post(process.env.REACT_APP_BASE_URL + "addWishlist", formData, postHeaderWithToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        toast.success(res.data.message);
                        dispatch(setLoader(false));
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error)
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message)
                })
        }
    }
    return (
        <Wrapper>
            <div className="product product-list">
                <div className="row">
                    <div className="col-6 col-lg-3">
                        <figure className="product-media">
                            {commingsoon === "true" ? <span className="product-label label-new">New</span> : <span className="d-none">New</span>}
                            <a style={{ backgroundColor: "white" }}>
                                <img
                                    src={process.env.REACT_APP_IMAGE_URL + primaryImage}
                                    alt="Product image"
                                    className="product-image"
                                    style={{ objectFit: "contain" }}
                                />
                            </a>
                        </figure>
                        {/* End .product-media */}
                    </div>
                    {/* End .col-sm-6 col-lg-3 */}
                    <div className="col-6 col-lg-3 order-lg-last">
                        <div className="product-list-action">
                            <div className="product-price"> ₹{productSpecialPrice}</div>
                            {/* End .product-price */}
                            <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{ width: "28%" }} />
                                    {/* End .ratings-val */}
                                </div>
                                {/* End .ratings */}
                                <span className="ratings-text">( 2 Reviews )</span>
                            </div>
                            {/* End .rating-container */}
                            <div className="product-action">
                                <a
                                    onClick={() => addWishList(id, slug)}
                                    className="btn-product btn-quickview"
                                    title="Quick view"
                                >
                                    <span>Wishlist</span>
                                </a>
                                <a
                                    href="#"
                                    className="btn-product btn-compare"
                                    title="Compare"
                                >
                                    <span>compare</span>
                                </a>
                            </div>
                            {/* End .product-action */}
                            <a href="#" className="btn-product btn-cart">
                                <span>add to cart</span>
                            </a>
                        </div>
                        {/* End .product-list-action */}
                    </div>
                    {/* End .col-sm-6 col-lg-3 */}
                    <div className="col-lg-6">
                        <div className="product-body product-action-inner">
                            <a
                                href="#"
                                className="btn-product btn-wishlist"
                                title="Add to wishlist"
                            >
                                <span>add to wishlist</span>
                            </a>
                            <div className="product-cat">
                                <a href="#">{categoryName}</a>
                            </div>
                            {/* End .product-cat */}
                            <h3 className="product-title">
                                <NavLink
                                    state={{
                                        primaryImage,
                                        name,
                                        rating,
                                        review,
                                        subScript,
                                        model,
                                        productSku,
                                        stock,
                                        subCategoryName,
                                        productSpecialPrice,
                                        categoryName,
                                        proSection,
                                        secondaryImage,
                                        description,
                                        offer,
                                        specification,
                                        manufacturer,
                                        warranty,
                                        id,
                                        slug
                                    }}
                                    to="/productDetail">
                                    {name}
                                </NavLink>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-content">
                                <p className='text-desc text-black bg-white'>{getHtmlText(offer)}</p>
                            </div>
                            {/* End .product-content */}
                            <div className="product-nav product-nav-thumbs d-none">
                                <a href="#" className="active">
                                    <img
                                        src={product4Thumb}
                                        alt="product desc"
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src={product4_2}
                                        alt="product desc"
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src={product4_3}
                                        alt="product desc"
                                    />
                                </a>
                            </div>
                            {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                    </div>
                    {/* End .col-lg-6 */}
                </div>
                {/* End .row */}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
.text-desc{
    overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2; 
   -webkit-box-orient: vertical;
}`;

export default ListProduct