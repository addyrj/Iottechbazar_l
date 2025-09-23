/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import product4_2 from "../../Assets/images/products/product-4-2-thumb.jpg";
import product4_3 from "../../Assets/images/products/product-4-3-thumb.jpg";
import product4Thumb from "../../Assets/images/products/product-4-thumb.jpg";
import { NavLink } from "react-router-dom";
import isEmpty from "lodash.isempty";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoader } from "../../Database/Action/DashboardAction";
import axios from "axios"
import { postHeaderWithToken } from '../../Database/ApiHeader';


const ThreeColProduct = ({
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
    commingsoon
}) => {
    const dispatch = useDispatch();

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
                        dispatch(setLoader(false));
                        toast.success(res.data.message);
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
        <div className="col-6 col-md-4 col-lg-4 mt-2">
            <div className="product product-7 text-center">
                <figure className="product-media">
                    {commingsoon === "true" ? <span className="product-label label-new">New</span> : <span className="d-none">New</span>}
                    <a
                        style={{
                            backgroundColor: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={process.env.REACT_APP_IMAGE_URL + primaryImage}
                            alt={name}
                            style={{ width: "270px", height: "220px" }}
                            className="product-image"
                        />
                    </a>
                    <div className="product-action-vertical">
                        <a
                            onClick={() => addWishList(id, slug)}
                            className="btn-product-icon btn-wishlist btn-expandable"
                        >
                            <span>Add to wishlist</span>
                        </a>
                        <a
                            className="btn-product-icon btn-wishlist btn-expandable"
                            title="Quick view"
                        >
                            <span>Quick view</span>
                        </a>
                        <a
                            className="btn-product-icon btn-wishlist btn-expandable"
                            title="Compare"
                        >
                            <span>Compare</span>
                        </a>
                    </div>
                    {/* End .product-action-vertical */}
                    <div className="product-action">
                        <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                        </a>
                    </div>
                    {/* End .product-action */}
                </figure>
                {/* End .product-media */}
                <div className="product-body">
                    <div className="product-cat">
                        <a href="#">{categoryName}</a>
                    </div>
                    {/* End .product-cat */}
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
                                secondaryImage,
                                description,
                                offer,
                                specification,
                                manufacturer,
                                warranty,
                                id,
                                slug
                            }}
                        >
                            {name}
                        </NavLink>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">₹{productSpecialPrice}</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                        <div className="ratings">
                            <div className="ratings-val" style={{ width: "60%" }} />
                            {/* End .ratings-val */}
                        </div>
                        {/* End .ratings */}
                        <span className="ratings-text">( 2 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-thumbs d-none">
                        <a href="#" className="active">
                            <img src={product4Thumb} alt="product desc" />
                        </a>
                        <a href="#">
                            <img src={product4_2} alt="product desc" />
                        </a>
                        <a href="#">
                            <img src={product4_3} alt="product desc" />
                        </a>
                    </div>
                    {/* End .product-nav */}
                </div>
                {/* End .product-body */}
            </div>
            {/* End .product */}
        </div>
    );
};

export default ThreeColProduct;
