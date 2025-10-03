/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react'
import headerBg from "../../Assets/images/page-header-bg.jpg"
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { checkLoginSession, getUserCart, setLoader } from '../../Database/Action/DashboardAction'
import isEmpty from 'lodash.isempty'
import axios from "axios"
import toast from 'react-hot-toast'
import { postHeaderWithToken } from '../../Database/ApiHeader'
import CartItems from '../Components/CartItems'
import { NavLink, useNavigate } from "react-router-dom"

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCart = useSelector((state) => state.DashboardReducer.userCart);
    const updateCartItemList = useSelector((state) => state.ConstantReducer.updateCartItemList);

    const updateCartItem = () => {
        if (updateCartItemList.length === 0) {
            toast.error("Failed! Cart Item is already updated")
        } else {
            let formData = new FormData();
            formData.append("cartItem", JSON.stringify(updateCartItemList))
            axios.post(process.env.REACT_APP_BASE_URL + "updateCartItem", formData, postHeaderWithToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        dispatch(getUserCart())
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

    const removeCartItem = (id, slug, count) => {
        if (isEmpty(id.toString()) || isEmpty(slug)) {
            toast.error("Failed! Product not found")
        } else if (isEmpty(count.toString())) {
            toast.error("Failed! cart count is not valid")
        } else {
            let formData = new FormData();
            formData.append("productId", id)
            formData.append("productSlug", slug)
            formData.append("cartCount", count)
            dispatch(setLoader(true));
            axios.post(process.env.REACT_APP_BASE_URL + "addCart", formData, postHeaderWithToken)
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

    const getTotalSellPrice = () => {
        let priceArray = [];
        priceArray = userCart.map((currELem) => {
            return currELem.cartItemtotalSellPrice
        });

        if (priceArray.length !== 0) {
            return priceArray.reduce((a, b) => {
                return a + b;
            })
        } else {
            return 0;
        }
    }

    const getTotalBasePrice = () => {
        let basePrice = [];

        basePrice = userCart.map((currELem) => {
            return currELem.basePrice
        });

        if (basePrice.length !== 0) {
            const totalBasePrice = basePrice.reduce((a, b) => {
                return a + b;
            })

            return totalBasePrice;
        } else {
            return 0;
        }
    }

    const getGstTax = () => {
        let basePrice = [];
        let priceArray = [];

        priceArray = userCart.map((currELem) => {
            return currELem.cartItemtotalSellPrice
        });

        basePrice = userCart.map((currELem) => {
            return currELem.basePrice
        });

        if (basePrice.length !== 0) {
            const totalBasePrice = basePrice.reduce((a, b) => {
                return a + b;
            })

            const totalSellPrice = priceArray.reduce((a, b) => {
                return a + b;
            })

            return totalSellPrice - totalBasePrice;
        } else {
            return 0;
        }
    }

    const getTotalPrice = () => {
        let priceArray = [];
        priceArray = userCart.map((currELem) => {
            return currELem.cartItemtotalPrice
        });

        if (priceArray.length !== 0) {
            return priceArray.reduce((a, b) => {
                return a + b;
            })
        } else {
            return 0;
        }
    }

    useEffect(() => {
        dispatch(checkLoginSession({ navigate: navigate }))
        dispatch(getUserCart())
    }, [dispatch])

    return (
        <Wrapper>
            <main className="main">
                <div
                    className="page-header text-center"
                    style={{ backgroundImage: `url(${headerBg})` }}
                >
                    <div className="container">
                        <h1 className="page-title">
                            Shopping Cart<span>Shop</span>
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
                                Shopping Cart
                            </li>
                        </ol>
                    </div>
                    {/* End .container */}
                </nav>
                {/* End .breadcrumb-nav */}
                <div className="page-content">
                    <div className="cart">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9">
                                    <table className="table table-cart table-mobile">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userCart?.length !== 0 ?
                                                userCart?.map((item) => {
                                                    return (
                                                        <CartItems key={item.id} {...item} />
                                                    )
                                                })
                                                : <div>No Data Found</div>}
                                        </tbody>
                                    </table>
                                    {/* End .table table-wishlist */}
                                    <div className="cart-bottom">
                                        <div className="cart-discount">
                                            <form action="#">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="coupon code"
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-outline-primary-2"
                                                            type="submit"
                                                        >
                                                            <i className="icon-long-arrow-right" />
                                                        </button>
                                                    </div>
                                                    {/* .End .input-group-append */}
                                                </div>
                                                {/* End .input-group */}
                                            </form>
                                        </div>
                                        {/* End .cart-discount */}
                                        <a className="btn btn-outline-dark-2 cursor-pointer" onClick={() => updateCartItem()}>
                                            <span>UPDATE CART</span>
                                            <i className="icon-refresh" />
                                        </a>
                                    </div>
                                    {/* End .cart-bottom */}
                                </div>
                                {/* End .col-lg-9 */}
                                <aside className="col-lg-3">
                                    <div className="summary summary-cart">
                                        <h3 className="summary-title">Cart Total</h3>
                                        {/* End .summary-title */}
                                        <table className="table table-summary">
                                            <tbody>
                                                {/* End .summary-subtotal */}
                                                <tr className="summary-shipping">
                                                    <td>Shipping:</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input
                                                                type="radio"
                                                                id="standart-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="standart-shipping"
                                                            >
                                                                Total Base Price:
                                                            </label>
                                                        </div>
                                                        {/* End .custom-control */}
                                                    </td>
                                                    <td>₹{getTotalBasePrice()}</td>
                                                </tr>

                                                <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input
                                                                type="radio"
                                                                id="free-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="free-shipping"
                                                            >
                                                                Shipping
                                                            </label>
                                                        </div>
                                                        {/* End .custom-control */}
                                                    </td>
                                                    <td>₹{"200"}</td>
                                                </tr>
                                                {/* End .summary-shipping-row */}
                                                <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input
                                                                type="radio"
                                                                id="standart-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="standart-shipping"
                                                            >
                                                                Gst Tax:
                                                            </label>
                                                        </div>
                                                        {/* End .custom-control */}
                                                    </td>
                                                    <td>₹{getGstTax()}</td>
                                                </tr>
                                                {/* End .summary-shipping-row */}
                                                <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input
                                                                type="radio"
                                                                id="express-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="express-shipping"
                                                            >
                                                                Total Price With Tax:
                                                            </label>
                                                        </div>
                                                        {/* End .custom-control */}
                                                    </td>
                                                    <td>₹{getTotalPrice()}</td>
                                                </tr>
                                                {/* End .summary-shipping-row */}
                                                <tr className="summary-shipping-estimate">
                                                    <td>
                                                        Estimate for Your Country
                                                        <br /> <NavLink to="/profile" state={{ referPage: "/cart" }}>Change address</NavLink>
                                                    </td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                {/* End .summary-shipping-estimate */}
                                                <tr className="summary-total">
                                                    <td>Total Sell Price:</td>
                                                    <td>₹{getTotalSellPrice()}</td>
                                                </tr>
                                                {/* End .summary-total */}
                                            </tbody>
                                        </table>
                                        {/* End .table table-summary */}
                                        <NavLink
                                            to="/checkout"
                                            className="btn btn-outline-primary-2 btn-order btn-block"
                                        >
                                            PROCEED TO CHECKOUT
                                        </NavLink>

                                    </div>
                                    {/* End .summary */}
                                    <NavLink to={"/products"}
                                        className="btn btn-outline-dark-2 btn-block mb-3"
                                    >
                                        <span>CONTINUE SHOPPING</span>
                                        <i className="icon-refresh" />
                                    </NavLink>
                                </aside>
                                {/* End .col-lg-3 */}
                            </div>
                            {/* End .row */}
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .cart */}
                </div>
                {/* End .page-content */}
            </main>
            {/* End .main */}
        </Wrapper>

    )
}

const Wrapper = styled.section`
  .form-control1 {
    height: 40px;
    width: 100px;
    font-size: 1.4rem;
    line-height: 1.5;
    font-weight: 300;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    color: #777;
    background-color: #fafafa;
    border: 1px solid #ebebeb;
    border-radius: 0;
    box-shadow: none;
  }
`;
export default Cart