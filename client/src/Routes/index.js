import React from 'react'
import App from "../App";
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Views/Screens/Home';
import BaseActivity from '../Views/Layout/BaseActivity';
import ProductDetail from '../Views/Screens/ProductDetail';
import Cart from '../Views/Screens/Cart';
import WishList from '../Views/Screens/WishList';
import Profile from '../Views/Screens/Profile';
import Products from '../Views/Screens/Products';
import Order from '../Views/Screens/Order';
import About from '../Views/Screens/About';
import Contact from '../Views/Screens/Contact';
import Blog from '../Views/Screens/Blog';
import Error from '../Views/Screens/Error';
import Login from '../Views/Screens/Login';
import AddAddress from '../Views/Screens/AddAddress';
import EditAddress from '../Views/Screens/AddAddress';
import Checkout from '../Views/Screens/Checkout';
import LegalPage from '../Views/Screens/LegalPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <BaseActivity><Home /></BaseActivity>
            },
            {
                path: "/products",
                element: <BaseActivity><Products /></BaseActivity>
            },
            {
                path: "/productDetail",
                element: <BaseActivity><ProductDetail /></BaseActivity>
            },
            {
                path: "/cart",
                element: <BaseActivity><Cart /></BaseActivity>
            },
            {
                path: "/wishlist",
                element: <BaseActivity><WishList /></BaseActivity>
            },
            {
                path: "/profile",
                element: <BaseActivity><Profile /></BaseActivity>
            },
            {
                path: "/order",
                element: <BaseActivity><Order /></BaseActivity>
            },
            {
                path: "/about",
                element: <BaseActivity><About /></BaseActivity>
            },
            {
                path: "/contact",
                element: <BaseActivity><Contact /></BaseActivity>
            },
            {
                path: "/blog",
                element: <BaseActivity><Blog /></BaseActivity>
            },
            {
                path: "*",
                element: <BaseActivity><Error /></BaseActivity>
            },
            {
                path: "/register",
                element: <BaseActivity><Login /></BaseActivity>
            },
            {
                path: "/addAddress",
                element: <BaseActivity><AddAddress /></BaseActivity>
            },
            {
                path: "/editAddress",
                element: (
                    <BaseActivity>
                        <EditAddress />
                    </BaseActivity>
                ),
            },
            {
                path: "/checkout",
                element: <BaseActivity><Checkout /></BaseActivity>
            },
            {
                path: "/legalpage/:url",
                element: <BaseActivity><LegalPage /></BaseActivity>
            },
        ]
    }
])
export default router