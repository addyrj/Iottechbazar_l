/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart, setLoader, updateCartItemList } from '../../Database/Action/DashboardAction';
import isEmpty from 'lodash.isempty';
import toast from 'react-hot-toast';
import axios from 'axios';
import { postHeaderWithToken } from '../../Database/ApiHeader';
import { useNavigate } from 'react-router-dom';

const CartItems = ({ key, id, cartImage, cartName, cartSellPrice, cartItemtotalSellPrice, cartCount, cartStock }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const oldCartItemList = useSelector((state) => state.ConstantReducer.updateCartItemList);
    const [count, setCount] = useState(parseInt(cartCount))

    const decrementItem = (countCart, id) => {
        countCart > 1 ? setCount(countCart - 1) : setCount(1);
        const info = {
            id: id, count: countCart > 1 ? countCart - 1 : 1
        }
        dispatch(updateCartItemList({ oldList: oldCartItemList, newList: info }))
    }

    const incrementItem = (countCart, id, stock) => {
        countCart < stock ? setCount(countCart + 1, id) : setCount(stock, id);
        const info = { id: id, count: countCart < stock ? countCart + 1 : stock }
        dispatch(updateCartItemList({ oldList: oldCartItemList, newList: info }))

    }

    const removeCartItem = (id) => {
        if (isEmpty(id.toString())) {
            toast.error("Failed! Cart Item is not found")
        } else {
            dispatch(setLoader(false));
            let formData = new FormData();
            formData.append("cartId", id)
            axios.post(process.env.REACT_APP_BASE_URL + "removeCart", formData, postHeaderWithToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        dispatch(getUserCart({ navigate: navigate }))
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
        <tr key={key}>
            <td className="product-col">
                <div className="product">
                    <figure className="product-media">
                        <a>
                            <img
                                src={process.env.REACT_APP_IMAGE_URL + cartImage}
                                alt="Product image"
                            />
                        </a>
                    </figure>
                    <h3 className="product-title">
                        <a>{cartName}</a>
                    </h3>
                    {/* End .product-title */}
                </div>
                {/* End .product */}
            </td>
            <td className="price-col"> ₹{cartSellPrice}</td>
            <td className="quantity-col">
                <div
                    className="form-control1"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <i
                        className="fa fa-minus iconHover"
                        style={{ marginRight: "15px", cursor: "pointer" }}
                        onClick={() => decrementItem(count, id)}
                    />

                    <input
                        style={{
                            width: "15px",
                            backgroundColor: "transparent",
                        }}
                        value={count}
                    />
                    <i
                        className="fa fa-plus"
                        style={{ marginLeft: "15px", cursor: "pointer" }}
                        onClick={() => incrementItem(count, id, parseInt(cartStock))}
                    />
                </div>
                {/* End .cart-product-quantity */}
            </td>
            <td className="total-col">₹{cartItemtotalSellPrice}</td>
            <td className="remove-col">
                <button className="btn-remove" type='button' onClick={() => removeCartItem(id)}>
                    <i className="icon-close" />
                </button>
            </td>
        </tr>
    )
}

export default CartItems