/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import logo from "../../Assets/images/demos/demo-2/logo.png";
import logo from "../../Assets/images/iot_asset/icon.png";
import product1 from "../../Assets/images/products/cart/product-1.jpg";
import product2 from "../../Assets/images/products/cart/product-2.jpg";
import banner1 from "../../Assets/images/menu/banner-1.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { mobileMenuClose } from "../../Java/Main";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getAllLanguages,
  getAppInfo,
  getAppSocialLink,
  getUserCart,
  getUserWishlist,
} from "../../Database/Action/DashboardAction";
import toast from "react-hot-toast";
import { getLegalPageList } from "../../Database/Action/DashboardAction";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState({
    slug: "",
    name: "",
  });
  const [loginState, setLoginState] = useState(false);
  const languageList = useSelector(
    (state) => state.DashboardReducer.languageList
  );
  const allCategory = useSelector(
    (state) => state.DashboardReducer.allCategory
  );
  const legalPageList = useSelector(
    (state) => state.DashboardReducer.legalPageList
  );
  const userCart = useSelector((state) => state.DashboardReducer.userCart);
  const userWishList = useSelector(
    (state) => state.DashboardReducer.userWishList
  );
  const appInfo = useSelector((state) => state.DashboardReducer.appInfo);
  const appSocialLink = useSelector(
    (state) => state.DashboardReducer.appSocialLink
  );

  const mobileMenuOpen = (e) => {
    $("body").toggleClass("mmenu-active");
    $(this).toggleClass("active");
    e.preventDefault();
  };
  useEffect(() => {
    mobileMenuClose();
  }, []);

  useEffect(() => {
    if (legalPageList.length === 0) {
      dispatch(getLegalPageList());
    }
  }, [dispatch]);

  const getLanguageState = async () => {
    const languageState = await JSON.parse(
      localStorage.getItem("currentLanguageState")
    );
    languageState === null
      ? setCurrentLanguage({ slug: "", name: "English" })
      : setCurrentLanguage(languageState);
  };

  const changeLanguageState = (slug, name) => {
    setCurrentLanguage({ slug: slug, name: name });
    localStorage.setItem(
      "currentLanguageState",
      JSON.stringify({ slug: slug, name: name })
    );
  };

  const totoalSellPrice = () => {
    let priceArray = [];
    priceArray = userCart.map((currELem) => {
      return currELem.cartItemtotalSellPrice;
    });

    if (priceArray.length !== 0) {
      return priceArray.reduce((a, b) => {
        return a + b;
      });
    } else {
      return 0;
    }
  };

  useEffect(() => {
    languageList?.length === 0 && dispatch(getAllLanguages());
    allCategory?.length === 0 && dispatch(getAllCategory());
    const userInfo = JSON.parse(localStorage.getItem("iottechUserInfo"));
    userInfo === null ? setLoginState(false) : setLoginState(true);
    getLanguageState();
  }, [location]);

  useEffect(() => {
    dispatch(getUserCart({ navigate: navigate }));
    dispatch(getUserWishlist({ navigate: navigate }));
    dispatch(getAppInfo());
    dispatch(getAppSocialLink());
  }, [dispatch]);

  return (
    <Wrapper>
      <header className="header header-2 header-intro-clearance">
        <div
          className="header-top"
          style={{
            backgroundImage:
              "linear-gradient(90.1deg, rgb(66, 138, 220) 0.3%, rgb(56, 202, 209) 99.9%)",
          }}
        >
          <div className="container">
            <div className="header-left">
              <a className="text-white" href="mailto:#">
                {appInfo?.app_email}
              </a>
            </div>
            {/* End .header-left */}
            <div className="header-right">
              <ul className="top-menu">
                <li>
                  <ul>
                    <li>
                      <a className="text-white font-weight-medium">
                        {" "}
                        CONTACT & SUPPORT:
                      </a>
                    </li>
                    <li style={{ marginLeft: "0px" }}>
                      <a
                        href="tel:#"
                        className="text-white font-weight-medium cursor-pointer"
                      >
                        {" "}
                        +91-{appInfo?.app_contact}
                      </a>
                    </li>
                    <li style={{ marginLeft: "0px" }}>
                      <a
                        className="text-white font-weight-medium"
                        style={{ marginLeft: "5px" }}
                      >
                        {"| Contact Us | Faq | "}
                      </a>
                    </li>

                    <li style={{ marginLeft: "5px" }}>
                      {appSocialLink?.map((item) => {
                        return (
                          <a href={item.url} title={item.name} target="_blank">
                            <i
                              className={`${item.icon} text-white font-weight-medium`}
                            />
                          </a>
                        );
                      })}
                    </li>
                    <li>
                      <div className="header-dropdown">
                        <a className="text-white">{currentLanguage.name}</a>
                        <div className="header-menu">
                          <ul>
                            {languageList?.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() =>
                                    changeLanguageState(item.slug, item.name)
                                  }
                                >
                                  <a>{item.name}</a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        {/* End .header-menu */}
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              {/* End .top-menu */}
            </div>
            {/* End .header-right */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-top */}
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <button className="mobile-menu-toggler" onClick={mobileMenuOpen}>
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars" />
              </button>
              <NavLink to={"/"} className="logo">
                <img src={logo} alt="Molla Logo" width={130} height={40} />
              </NavLink>
            </div>
            {/* End .header-left */}
            <div className="header-center">
              <div className="header-search header-search-extended header-search-visible header-search-no-radius d-none d-lg-block">
                <a href="#" className="search-toggle" role="button">
                  <i className="icon-search" />
                </a>
                <form action="#" method="get">
                  <div className="header-search-wrapper search-wrapper-wide">
                    <label htmlFor="q" className="sr-only">
                      Search
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      name="q"
                      id="q"
                      placeholder="Search product ..."
                      required=""
                    />
                    <button className="btn btn-primary" type="submit">
                      <i className="icon-search" />
                    </button>
                  </div>
                  {/* End .header-search-wrapper */}
                </form>
              </div>
              {/* End .header-search */}
            </div>
            <div className="header-right">
              {/* End .compare-dropdown */}
              <div className="wishlist">
                <NavLink to="/wishlist" title="Wishlist">
                  <div className="icon">
                    <i className="icon-heart-o" />
                    <span className="wishlist-count badge">
                      {userWishList.length !== 0 ? userWishList.length : 0}
                    </span>
                  </div>
                  <p>Wishlist</p>
                </NavLink>
              </div>
              {/* End .compare-dropdown */}
              <div className="dropdown cart-dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-display="static"
                >
                  <div className="icon">
                    <i className="icon-shopping-cart" />
                    <span className="cart-count">
                      {userCart.length !== 0 ? userCart.length : 0}
                    </span>
                  </div>
                  <p>Cart</p>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-cart-products">
                    {userCart?.slice(0, 5).map((item, index) => {
                      return (
                        <div className="product">
                          <div className="product-cart-details">
                            <h4 className="product-title">
                              <NavLink to="/">{item.cartName}</NavLink>
                            </h4>
                            <span className="cart-product-info">
                              <span className="cart-product-qty">
                                {item.cartCount}
                              </span>
                              x ₹{item.cartSellPrice}
                            </span>
                          </div>
                          {/* End .product-cart-details */}
                          <figure className="product-image-container">
                            <NavLink to="/" className="product-image">
                              <img
                                src={
                                  process.env.REACT_APP_IMAGE_URL +
                                  item.cartImage
                                }
                                alt={item.cartName}
                              />
                            </NavLink>
                          </figure>
                          <a
                            href="#"
                            className="btn-remove"
                            title="Remove Product"
                          >
                            <i className="icon-close" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                  {/* End .cart-product */}
                  <div className="dropdown-cart-total">
                    <span>Total</span>
                    <span className="cart-total-price">
                      ₹{totoalSellPrice()}
                    </span>
                  </div>
                  {/* End .dropdown-cart-total */}
                  <div className="dropdown-cart-action">
                    <NavLink to="/cart" className="btn btn-primary">
                      View Cart
                    </NavLink>
                    {/* <a href="checkout.html" className="btn btn-outline-primary-2">
                                            <span>Checkout</span>
                                            <i className="icon-long-arrow-right" />
                                        </a> */}
                    <NavLink
                      to="/checkout"
                      className="btn btn-outline-primary-2"
                    >
                      <span>Checkout</span>
                      <i className="icon-long-arrow-right" />
                    </NavLink>
                  </div>
                  {/* End .dropdown-cart-total */}
                </div>
                {/* End .dropdown-menu */}
              </div>
              {/* End .cart-dropdown */}
            </div>
            {/* End .header-right */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-middle */}
        <div className="header-bottom sticky-header">
          <div className="container">
            <div className="header-left">
              <div className="dropdown category-dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-display="static"
                  title="Browse Categories"
                >
                  Browse Categories
                </a>
                <div className="dropdown-menu">
                  <nav className="side-nav">
                    <ul className="menu-vertical sf-arrows">
                      {allCategory?.map((item, index) => {
                        return (
                          <li>
                            <NavLink to={"/products"}>{item.name}</NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="header-center">
              <nav className="main-nav">
                <ul className="menu sf-arrows">
                  <li className="active">
                    <NavLink to={"/"}>Home</NavLink>
                  </li>

                  <li>
                    <NavLink to={"/products"}>Product</NavLink>
                  </li>

                  <li>
                    <a href="#" className="sf-with-ul">
                      Shop
                    </a>
                    <div className="megamenu megamenu-sm">
                      <div className="row no-gutters">
                        <div className="col-md-8">
                          <div className="menu-col">
                            <div className="menu-title">Shop Pages</div>
                            {/* End .menu-title */}
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
                            {/* End .row */}
                          </div>
                          {/* End .menu-col */}
                        </div>
                        {/* End .col-md-8 */}
                        <div className="col-md-4">
                          <div className="banner banner-overlay">
                            <NavLink
                              to="/products"
                              className="banner banner-menu"
                            >
                              <img src={banner1} alt="Banner" />
                              <div className="banner-content banner-content-top">
                                <div className="banner-title text-white">
                                  Last <br />
                                  Chance
                                  <br />
                                  <span>
                                    <strong>Sale</strong>
                                  </span>
                                </div>
                                {/* End .banner-title */}
                              </div>
                              {/* End .banner-content */}
                            </NavLink>
                          </div>
                          {/* End .banner banner-overlay */}
                        </div>
                        {/* End .col-md-4 */}
                      </div>
                      {/* End .row */}
                    </div>
                    {/* End .megamenu megamenu-md */}
                  </li>

                  <li>
                    <a href="#" className="sf-with-ul">
                      Pages
                    </a>
                    <ul>
                      {legalPageList?.map((item, index) => {
                        return (
                          <li>
                            <NavLink to={`/legalpage/${item.url}`}>
                              {item.title}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  <li>
                    <NavLink to="/blog" className="">
                      Blog
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={loginState ? "/profile" : "/register"}
                      className=""
                    >
                      {loginState ? "Profile" : "Login"}
                    </NavLink>
                  </li>
                </ul>
                {/* End .menu */}
              </nav>
              {/* End .main-nav */}
            </div>
            {/* End .header-center */}
            <div className="header-right">
              <i className="la la-lightbulb-o" />
              <p>
                Clearance<span className="highlight">&nbsp;Up to 30% Off</span>
              </p>
            </div>
          </div>
          {/* End .container */}
        </div>
        {/* End .header-bottom */}
      </header>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .header-right {
      display: none;
    }
  }
`;

export default Header;
