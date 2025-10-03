/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import headerBg from "../../Assets/images/page-header-bg.jpg"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUserWishlist, setLoader } from "../../Database/Action/DashboardAction"
import isEmpty from "lodash.isempty"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { postHeaderWithToken } from "../../Database/ApiHeader"

const WishList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userWishList = useSelector((state) => state.DashboardReducer.userWishList);

    const removeWishListItem = (id) => {
        if (isEmpty(id.toString())) {
            toast.error("Failed! Wish List Item is not found")
        } else {
            dispatch(setLoader(false));
            let formData = new FormData();
            formData.append("wishId", id)
            axios.post(process.env.REACT_APP_BASE_URL + "removeWishlistItem", formData, postHeaderWithToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        dispatch(getUserWishlist({ navigate: navigate }))
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
    const addCart = (id, slug, wishId) => {
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
                        removeWishListItem(wishId)
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

    useEffect(() => {
        dispatch(getUserWishlist({ navigate: navigate }))
    }, [dispatch])

    console.log("wishlist item    ", userWishList)
    return (
        <>
            <main className="main">
                <div
                    className="page-header text-center"
                    style={{ backgroundImage: `url(${headerBg})` }}
                >
                    <div className="container">
                        <h1 className="page-title">
                            Wishlist<span>Shop</span>
                        </h1>
                    </div>
                    {/* End .container */}
                </div>
                {/* End .page-header */}
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Shop</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Wishlist
                            </li>
                        </ol>
                    </div>
                    {/* End .container */}
                </nav>
                {/* End .breadcrumb-nav */}
                <div className="page-content">
                    <div className="container">
                        <table className="table table-wishlist table-mobile">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Stock Status</th>
                                    <th />
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {userWishList?.map((item, index) => {
                                    return (
                                        <tr>
                                            <td className="product-col">
                                                <div className="product">
                                                    <figure className="product-media">
                                                        <a>
                                                            <img
                                                                src={process.env.REACT_APP_IMAGE_URL + item.wishImage}
                                                                alt={item.wishName}
                                                            />
                                                        </a>
                                                    </figure>
                                                    <h3 className="product-title">
                                                        <a>{item.wishName}</a>
                                                    </h3>
                                                    {/* End .product-title */}
                                                </div>
                                                {/* End .product */}
                                            </td>
                                            <td className="price-col">₹{item.wishSellPrice}</td>
                                            <td className="stock-col">
                                                <span className="in-stock">{parseInt(item.wishStock) > 0 ? "In Stock" : "Out Of Stock"}</span>
                                            </td>
                                            <td className="action-col">
                                                <button className="btn btn-block btn-outline-primary-2" disabled={parseInt(item.wishStock) > 0 ? false : true} onClick={() => addCart(item?.productId, item?.productSlug, item?.id)}>
                                                    <i className="icon-cart-plus" />
                                                    Add to Cart
                                                </button>
                                            </td>
                                            <td className="remove-col">
                                                <button className="btn-remove" onClick={() => removeWishListItem(item.id)}>
                                                    <i className="icon-close" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {/* End .table table-wishlist */}
                        <div className="wishlist-share">
                            <div className="social-icons social-icons-sm mb-2">
                                <label className="social-label">Share on:</label>
                                <a
                                    href="#"
                                    className="social-icon"
                                    title="Facebook"
                                    target="_blank"
                                >
                                    <i className="icon-facebook-f" />
                                </a>
                                <a href="#" className="social-icon" title="Twitter" target="_blank">
                                    <i className="icon-twitter" />
                                </a>
                                <a
                                    href="#"
                                    className="social-icon"
                                    title="Instagram"
                                    target="_blank"
                                >
                                    <i className="icon-instagram" />
                                </a>
                                <a href="#" className="social-icon" title="Youtube" target="_blank">
                                    <i className="icon-youtube" />
                                </a>
                                <a
                                    href="#"
                                    className="social-icon"
                                    title="Pinterest"
                                    target="_blank"
                                >
                                    <i className="icon-pinterest" />
                                </a>
                            </div>
                            {/* End .soial-icons */}
                        </div>
                        {/* End .wishlist-share */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .page-content */}
            </main>
            {/* End .main */}
        </>

    )
}

export default WishList