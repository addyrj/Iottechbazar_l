/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom"
import { getAllCategory, getAllLanguages } from '../../Database/Action/DashboardAction';
import styled from 'styled-components';

const MobileMenu = () => {
    const dispatch = useDispatch();
    const userinfo = localStorage.getItem("iottechUserInfo");
    const allCategory = useSelector((state) => state.DashboardReducer.allCategory);
    const languageList = useSelector((state) => state.DashboardReducer.languageList)

    const [drawerNav, setDrawerNav] = useState(0);

    useEffect(() => {
        dispatch(getAllCategory());
        languageList?.length === 0 && dispatch(getAllLanguages());
    }, [dispatch])
    return (
        <Wrapper>
            <div className="mobile-menu-container mobile-menu-light">
                <div className="mobile-menu-wrapper">
                    <span className="mobile-menu-close">
                        <i className="icon-close" />
                    </span>
                    <form action="#" method="get" className="mobile-search">
                        <label htmlFor="mobile-search" className="sr-only">
                            Search
                        </label>
                        <input
                            type="search"
                            className="form-control"
                            name="mobile-search"
                            id="mobile-search"
                            placeholder="Search product ..."
                            required=""
                        />
                        <button className="btn btn-primary" type="submit">
                            <i className="icon-search" />
                        </button>
                    </form>
                    <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
                        <li className="nav-item">
                            <a
                                className={drawerNav === 0 ? "nav-link active" : "nav-link"}
                                id="mobile-menu-link"
                                data-toggle="tab"
                                role="tab"
                                aria-controls="mobile-menu-tab"
                                aria-selected="true"
                                onClick={() => setDrawerNav(0)}
                            >
                                Menu
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={drawerNav === 1 ? "nav-link active" : "nav-link"}
                                id="mobile-cats-link"
                                data-toggle="tab"
                                role="tab"
                                aria-controls="mobile-cats-tab"
                                aria-selected="false"
                                onClick={() => setDrawerNav(1)}
                            >
                                Categories
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div
                            className={drawerNav === 0 ? "tab-pane fade show active " : "tab-pane fade"}
                            id="mobile-menu-tab"
                            role="tabpanel"
                            aria-labelledby="mobile-menu-link"
                        >
                            <nav className="mobile-nav">
                                <ul className="mobile-menu">
                                    <li className="active">
                                        <NavLink to={"/"}>
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/products"}>
                                            Product
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a className="sf-with-ul">
                                            Shop
                                        </a>
                                        <ul>
                                            <li>
                                                <NavLink to="/cart">Cart</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/wishlist">Wishlist</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/order">Order</NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Pages</a>
                                        <ul>
                                            <li>
                                                <NavLink to="/about">
                                                    About
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/contact">
                                                    Contact
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/privacy">Privacy Policy</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/faq">FAQs</NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <NavLink to="/blog" className="">
                                            Blog
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a href="#" className="sf-with-ul">
                                            Language
                                        </a>
                                        <ul>
                                            {languageList?.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <a>{item.name}</a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                    <li>
                                        <NavLink to={userinfo !== null ? "/profile" : "/register"} className="">
                                            {userinfo !== null ? "Profile" : "Login"}
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                            {/* End .mobile-nav */}
                        </div>
                        {/* .End .tab-pane */}
                        <div
                            className={drawerNav === 1 ? "tab-pane fade show active " : "tab-pane fade"}

                            id="mobile-cats-tab"
                            role="tabpanel"
                            aria-labelledby="mobile-cats-link"
                        >
                            <nav className="mobile-cats-nav">
                                <ul className="mobile-cats-menu">
                                    {allCategory.map((item) => {
                                        return (
                                            <li>
                                                <NavLink to={"/products"} className="mobile-cats-lead" href="#">
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        )
                                    })}
                                </ul>
                                {/* End .mobile-cats-menu */}
                            </nav>
                            {/* End .mobile-cats-nav */}
                        </div>
                        {/* .End .tab-pane */}
                    </div>
                    {/* End .tab-content */}
                    <div className="social-icons">
                        <a href="#" className="social-icon" target="_blank" title="Facebook">
                            <i className="icon-facebook-f" />
                        </a>
                        <a href="#" className="social-icon" target="_blank" title="Twitter">
                            <i className="icon-twitter" />
                        </a>
                        <a href="#" className="social-icon" target="_blank" title="Instagram">
                            <i className="icon-instagram" />
                        </a>
                        <a href="#" className="social-icon" target="_blank" title="Youtube">
                            <i className="icon-youtube" />
                        </a>
                    </div>
                    {/* End .social-icons */}
                </div>
                {/* End .mobile-menu-wrapper */}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

`;

export default MobileMenu