/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import headerBg from "../../Assets/images/page-header-bg.jpg"
import axios from "axios";
import { getHeaderWithoutToken } from '../../Database/ApiHeader';
import toast from 'react-hot-toast';

const TestCheckout = () => {
    const [payResponse, setPayResponse] = useState({})

    const loadScript = (src) => {
        return new Promise((reslove) => {
            const script = document.createElement("script");
            script.src = src;

            script.onload = () => {
                reslove(true)
            }

            script.onerror = () => {
                reslove(false)
            }

            document.body.appendChild(script);
        })
    }

    const createRazoyPayOrder = () => {
        console.log("razor pay click")
        axios.get(process.env.REACT_APP_BASE_URL + "addOrder", getHeaderWithoutToken)
            .then((res) => {
                console.log("response is     ", res.data);
                // handleRazorPayScreen(res?.data?.info?.id)
            })
            .catch((error) => {
                console.log("error is   ", error)
                toast.error(error?.response?.data?.message || error.message)
            })
    }

    const handleRazorPayScreen = async (orderId) => {
        // const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");
        // if (!res) {
        //   toast.error("Something error at razor pay screen loading")
        // }

        const options = {
            key: "rzp_test_BnagWOSguj2XJ1", // Enter the Key ID generated from the Dashboard
            amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                setPayResponse(response)
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
            },
            prefill: {
                name: "Anurag Srivastav",
                email: "anurag.kumar.88099@gmail.com",
                contact: "7070532135",
            },
            notes: {
                address: "Iottech Software",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObjet = new window.RazorPay(options);
        paymentObjet.open();
    }

    const paymentFetch = () => {

    }
    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: `url(${headerBg})` }}
            >
                <div className="container">
                    <h1 className="page-title">
                        <span>Checkout</span>
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
                            Checkout
                        </li>
                    </ol>
                </div>
                {/* End .container */}
            </nav>
            {/* End .breadcrumb-nav */}
            <div className="page-content">
                <div className="cart">
                    <div className="container">
                        <a href='' onClick={() => createRazoyPayOrder()}
                            className="btn btn-outline-primary-2 btn-order btn-block"
                        >
                            PROCEED TO CHECKOUT (COD)
                        </a>
                        {/* End .row */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .cart */}
            </div>
            {/* End .page-content */}
        </main>
    )
}

export default TestCheckout

