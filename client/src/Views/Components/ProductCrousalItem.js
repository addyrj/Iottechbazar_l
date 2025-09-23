/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import noImage from "../../Assets/images/no_image.jpg";
import isEmpty from "lodash.isempty";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoader } from "../../Database/Action/DashboardAction";
import axios from "axios";
import { postHeaderWithToken } from "../../Database/ApiHeader";

const Product = ({
    primaryImage,
    name,
    productSpecialPrice,
    border,
    id,
    slug,
    rating,
    review,
    subScript,
    model,
    productSku,
    stock,
    subCategoryName,
    categoryName,
    proSection,
    secondaryImage,
    description,
    offer,
    specification,
    manufacturer,
    warranty,
    trending
}) => {
    const dispatch = useDispatch();

    const addWishList = (id, slug) => {
        if (isEmpty(id.toString()) || isEmpty(slug)) {
            toast.error("Failed! Product not found");
        } else {
            let formData = new FormData();
            formData.append("productId", id);
            formData.append("productSlug", slug);
            dispatch(setLoader(true));
            axios
                .post(
                    process.env.REACT_APP_BASE_URL + "addWishlist",
                    formData,
                    postHeaderWithToken
                )
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        toast.success(res.data.message);
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error);
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message);
                });
        }
    };

    const addCart = (id, slug) => {
        if (isEmpty(id.toString()) || isEmpty(slug)) {
            toast.error("Failed! Product not found");
        } else {
            let formData = new FormData();
            formData.append("productId", id);
            formData.append("productSlug", slug);
            formData.append("cartCount", 1);
            dispatch(setLoader(true));
            axios
                .post(
                    process.env.REACT_APP_BASE_URL + "addCart",
                    formData,
                    postHeaderWithToken
                )
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        toast.success(res.data.message);
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error);
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message);
                });
        }
    };

    return (
        <Wrapper>
            <div
                className={
                    border === true
                        ? "product product-11 mobileProductWithBorder text-center"
                        : "product product-11 text-center"
                }
            >
                <figure className="product-media">
                    {trending === "true" ? <span className="product-label label-circle label-sale">Sale</span> : <span className="d-none">New</span>}
                    <a>
                        <NavLink to="/productDetail"
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
                                secondaryImage: JSON.parse(secondaryImage),
                                description,
                                offer,
                                specification,
                                manufacturer,
                                warranty,
                                id,
                                slug,
                            }}
                        >
                            <img
                                src={
                                    primaryImage === null
                                        ? noImage
                                        : process.env.REACT_APP_IMAGE_URL + primaryImage
                                }
                                alt="Product image"
                                className="product-image"
                            />
                        </NavLink>
                    </a>
                    <div className="product-action-vertical">
                        <a
                            onClick={() => addWishList(id, slug)}
                            className="btn-product-icon btn-wishlist"
                        >
                            <span>add to wishlist</span>
                        </a>
                    </div>
                    {/* End .product-action-vertical */}
                </figure>
                {/* End .product-media */}
                <div className="product-body">
                    <h3 className="product-title">
                        <NavLink
                            to="/productDetail"
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
                                secondaryImage: JSON.parse(secondaryImage),
                                description,
                                offer,
                                specification,
                                manufacturer,
                                warranty,
                                id,
                                slug,
                            }}
                        >
                            {name}
                        </NavLink>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">₹{productSpecialPrice}</div>
                    {/* End .product-price */}
                    <div className="product-nav product-nav-dots">
                        <a href="#" className="active" style={{ background: "#1f1e18" }}>
                            <span className="sr-only">Color name</span>
                        </a>
                        <a href="#" style={{ background: "#e8e8e8" }}>
                            <span className="sr-only">Color name</span>
                        </a>
                    </div>
                    {/* End .product-nav */}
                </div>
                {/* End .product-body */}
                <div className="product-action" onClick={() => addCart(id, slug)}>
                    <a className="btn-product btn-cart">
                        <span>add to cart</span>
                    </a>
                </div>
                {/* End .product-action */}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  .product-image {
    height: 300px !important;
  }
  .product-title {
    font-weight: 400;
    font-size: 1.6rem;
    letter-spacing: -0.01em;
    color: #333333;
    margin-bottom: 0.2rem;
    white-space: nowrap;
    min-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    @supports (-webkit-line-clamp: 2) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
   @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .product.product-11 .product-body {
    padding: 1rem 10px;
}
    .mobileProductWithBorder{
        border: 1px solid #a6c76c;
    }
    .product-media{
        background-color: white;
    }
    .product-image{
        height: 120px !important;
        object-fit: contain;
    }
    .product-action{
        .btn-product .btn-cart{
            display: block;
        }
    }
    .product-price{
        display: block;
        margin-top: 5px;
    }
   }
`;

export default Product;
