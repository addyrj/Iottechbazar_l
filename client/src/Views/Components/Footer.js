import React, { useEffect, useState } from 'react'
import payement from '../../Assets/images/payments.png'
// import logo from "../../Assets/images/iot_asset/icon.png";
import bg2 from "../../Assets/images/backgrounds/bg-2.jpg"
import { useDispatch, useSelector } from "react-redux"
import { getAppInfo, getAppSocialLink, getLegalPageList } from '../../Database/Action/DashboardAction';
import { NavLink } from "react-router-dom"
import jQuery from 'jquery';
import styled from 'styled-components';

const Footer = () => {
    const dispatch = useDispatch();
    const legalPageList = useSelector((state) => state.DashboardReducer.legalPageList);
    const appInfo = useSelector((state) => state.DashboardReducer.appInfo)
    const appSocialLink = useSelector((state) => state.DashboardReducer.appSocialLink)

    useEffect(() => {
        if (legalPageList.length === 0) {
            dispatch(getLegalPageList());
        }
        jQuery.isEmptyObject(appInfo) && dispatch(getAppInfo())
        appSocialLink.length === 0 && dispatch(getAppSocialLink())

    }, [dispatch])

    return (
        <Wrapper>
            <footer className="footer footer-dark">
                <>
                    <div className="icon-boxes-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 col-lg-3">
                                    <div className="icon-box icon-box-side">
                                        <span className="icon-box-icon text-dark">
                                            <i className="icon-rocket" />
                                        </span>
                                        <div className="icon-box-content">
                                            <h3 className="icon-box-title">Free Shipping</h3>
                                            {/* End .icon-box-title */}
                                            <p>orders ₹500 or more</p>
                                        </div>
                                        {/* End .icon-box-content */}
                                    </div>
                                    {/* End .icon-box */}
                                </div>
                                {/* End .col-sm-6 col-lg-3 */}
                                <div className="col-sm-6 col-lg-3">
                                    <div className="icon-box icon-box-side">
                                        <span className="icon-box-icon text-dark">
                                            <i className="icon-rotate-left" />
                                        </span>
                                        <div className="icon-box-content">
                                            <h3 className="icon-box-title">Free Returns</h3>
                                            {/* End .icon-box-title */}
                                            <p>within 30 days</p>
                                        </div>
                                        {/* End .icon-box-content */}
                                    </div>
                                    {/* End .icon-box */}
                                </div>
                                {/* End .col-sm-6 col-lg-3 */}
                                <div className="col-sm-6 col-lg-3">
                                    <div className="icon-box icon-box-side">
                                        <span className="icon-box-icon text-dark">
                                            <i className="icon-info-circle" />
                                        </span>
                                        <div className="icon-box-content">
                                            <h3 className="icon-box-title">Get 20% Off 1 Item</h3>
                                            {/* End .icon-box-title */}
                                            <p>When you sign up</p>
                                        </div>
                                        {/* End .icon-box-content */}
                                    </div>
                                    {/* End .icon-box */}
                                </div>
                                {/* End .col-sm-6 col-lg-3 */}
                                <div className="col-sm-6 col-lg-3">
                                    <div className="icon-box icon-box-side">
                                        <span className="icon-box-icon text-dark">
                                            <i className="icon-life-ring" />
                                        </span>
                                        <div className="icon-box-content">
                                            <h3 className="icon-box-title">We Support</h3>
                                            {/* End .icon-box-title */}
                                            <p>24/7 amazing services</p>
                                        </div>
                                        {/* End .icon-box-content */}
                                    </div>
                                    {/* End .icon-box */}
                                </div>
                                {/* End .col-sm-6 col-lg-3 */}
                            </div>
                            {/* End .row */}
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .icon-boxes-container */}
                    <div
                        className="footer-newsletter bg-image"
                        style={{ backgroundImage: `url(${bg2})` }}
                    >
                        <div className="container">
                            <div className="heading text-center">
                                <h3 className="title">Get The Latest Deals</h3>
                                {/* End .title */}
                            </div>
                            {/* End .heading */}
                            <div className="row">
                                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    <form action="#">
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your Email Address"
                                                aria-label="Email Adress"
                                                aria-describedby="newsletter-btn"
                                                required=""
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-primary"
                                                    type="submit"
                                                    id="newsletter-btn"
                                                >
                                                    <span>Subscribe</span>
                                                    <i className="icon-long-arrow-right" />
                                                </button>
                                            </div>
                                            {/* .End .input-group-append */}
                                        </div>
                                        {/* .End .input-group */}
                                    </form>
                                </div>
                                {/* End .col-sm-10 offset-sm-1 col-lg-6 offset-lg-3 */}
                            </div>
                            {/* End .row */}
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .footer-newsletter bg-image */}
                </>

                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-lg-3">
                                <div className="widget widget-about">
                                    {/* <img
                                        src={logo}
                                        className="footer-logo"
                                        alt="Footer Logo"
                                        width={105}
                                        height={25}
                                    /> */}

                                    <h4 className="widget-title text-white">Contact Us</h4>
                                    {/* End .widget-title */}
                                    <ul className="widget-list">
                                        <li>
                                            <i className='fa fa-location-dot' /><a className='ml-4' href="#">{appInfo?.app_name}</a>
                                        </li>
                                        <li>
                                            <i class="fa fa-envelope" /><a className='ml-4' href="#">{appInfo?.app_email}</a>
                                        </li>
                                        <li>
                                            <i className='fa fa-phone' /><a className='ml-2' href="#"> +91-{appInfo?.app_contact}</a>
                                        </li>
                                    </ul>
                                    {/* End .widget-list */}
                                    <div className="social-icons mt-2">
                                        {appSocialLink.map((item, index) => {
                                            return (
                                                <a
                                                    href={item.url}
                                                    className="social-icon"
                                                    title={item.name}
                                                    target="_blank"
                                                >
                                                    <i className={item.icon} />
                                                </a>
                                            )
                                        })}
                                    </div>
                                    {/* End .soial-icons */}
                                </div>
                                {/* End .widget about-widget */}
                            </div>
                            {/* End .col-sm-6 col-lg-3 */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="widget">
                                    <h4 className="widget-title">Useful Links</h4>
                                    {/* End .widget-title */}
                                    <ul>
                                        {legalPageList?.map((item, index) => {
                                            return (
                                                <li>
                                                    <NavLink to={`/legalpage/${item.url}`}>{item.title}</NavLink>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    {/* End .widget-list */}
                                </div>
                                {/* End .widget */}
                            </div>
                            {/* End .col-sm-6 col-lg-3 */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="widget">
                                    <h4 className="widget-title">Customer Service</h4>
                                    {/* End .widget-title */}
                                    <ul className="widget-list">
                                        <li>
                                            <NavLink to={"/contact"}>Contact Us</NavLink>
                                        </li>
                                        <li>
                                            <a href="#">Returns</a>
                                        </li>
                                        <li>
                                            <a href="#">Site Map</a>
                                        </li>
                                        <li>
                                            <a href="#">Total Visitors</a>
                                        </li>
                                    </ul>
                                    {/* End .widget-list */}
                                </div>
                                {/* End .widget */}
                            </div>
                            {/* End .col-sm-6 col-lg-3 */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="widget">
                                    <h4 className="widget-title">My Account</h4>
                                    {/* End .widget-title */}
                                    <ul className="widget-list">
                                        <li>
                                            <a href="#">Sign In</a>
                                        </li>
                                        <li>
                                            <a href="cart.html">View Cart</a>
                                        </li>
                                        <li>
                                            <a href="#">My Wishlist</a>
                                        </li>
                                        <li>
                                            <a href="#">Track My Order</a>
                                        </li>
                                        <li>
                                            <a href="#">Help</a>
                                        </li>
                                    </ul>
                                    {/* End .widget-list */}
                                </div>
                                {/* End .widget */}
                            </div>
                            {/* End .col-sm-6 col-lg-3 */}
                        </div>
                        {/* End .row */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .footer-middle */}
                <div className="footer-bottom">
                    <div className="container">
                        <p className="footer-copyright">
                            Owned By IOTtech Smart Products © 2022
                        </p>
                        {/* End .footer-copyright */}
                        <figure className="footer-payments">
                            <img
                                src={payement}
                                alt="Payment methods"
                                width={272}
                                height={20}
                            />
                        </figure>
                        {/* End .footer-payments */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .footer-bottom */}
            </footer>
            {/* End .footer */}
        </Wrapper>

    )
}

const Wrapper = styled.section`
.footer-dark{
background-color: #1E1E1E;
}

li a {
    color: rgba(255,255,255,.4);
}
`;

export default Footer