/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import logo from "../../Assets/images/iot_asset/icon.png";
import banner1 from "../../Assets/images/menu/banner-1.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { mobileMenuClose } from "../../Java/Main";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getAllLanguages,
  getAppInfo,
  getAppSocialLink,
  getUserCart,
  getUserWishlist,
  getLegalPageList,
  // removeCartItem, // 👉 Add your remove action here if available
} from "../../Database/Action/DashboardAction";
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

  // Mobile menu open
  const mobileMenuOpen = (e) => {
    e.preventDefault();
    document.body.classList.toggle("mmenu-active");
    e.currentTarget.classList.toggle("active");
  };

  // Close mobile menu when location changes
  useEffect(() => {
    mobileMenuClose();
  }, [location]);

  // Fetch legal pages if not loaded
  useEffect(() => {
    if (legalPageList.length === 0) {
      dispatch(getLegalPageList());
    }
  }, [dispatch, legalPageList]);

  // Language persistence
  const getLanguageState = () => {
    const languageState = JSON.parse(
      localStorage.getItem("currentLanguageState")
    );
    languageState === null
      ? setCurrentLanguage({ slug: "", name: "English" })
      : setCurrentLanguage(languageState);
  };

  const changeLanguageState = (slug, name) => {
    setCurrentLanguage({ slug, name });
    localStorage.setItem(
      "currentLanguageState",
      JSON.stringify({ slug, name })
    );
  };

  // Cart total price
  const totalSellPrice = () => {
    let priceArray = userCart.map((currELem) => currELem.cartItemtotalSellPrice);
    return priceArray.length !== 0
      ? priceArray.reduce((a, b) => a + b, 0)
      : 0;
  };

  // Fetch data on location change
  useEffect(() => {
    if (languageList?.length === 0) dispatch(getAllLanguages());
    if (allCategory?.length === 0) dispatch(getAllCategory());

    const userInfo = JSON.parse(localStorage.getItem("iottechUserInfo"));
    userInfo === null ? setLoginState(false) : setLoginState(true);

    getLanguageState();
  }, [location, dispatch, languageList, allCategory]);

  // Fetch cart, wishlist, app info, social links
  useEffect(() => {
    dispatch(getUserCart({ navigate }));
    dispatch(getUserWishlist({ navigate }));
    dispatch(getAppInfo());
    dispatch(getAppSocialLink());
  }, [dispatch, navigate]);

  // Remove cart item
  const handleRemoveCartItem = (id) => {
    // 👉 Replace with your Redux action
    // dispatch(removeCartItem(id));
    console.log("Remove cart item:", id);
  };

  return (
    <Wrapper>
      <header className="header header-2 header-intro-clearance">
        {/* HEADER TOP */}
        <div
          className="header-top"
          style={{
            backgroundImage:
              "linear-gradient(90.1deg, rgb(66, 138, 220) 0.3%, rgb(56, 202, 209) 99.9%)",
          }}
        >
          <div className="container">
            <div className="header-left">
              <a className="text-white" href={`mailto:${appInfo?.app_email}`}>
                {appInfo?.app_email}
              </a>
            </div>

            <div className="header-right">
              <ul className="top-menu">
                <li>
                  <ul>
                    <li>
                      <a className="text-white font-weight-medium">
                        CONTACT & SUPPORT:
                      </a>
                    </li>
                    <li style={{ marginLeft: "0px" }}>
                      <a
                        href={`tel:+91-${appInfo?.app_contact}`}
                        className="text-white font-weight-medium cursor-pointer"
                      >
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

                    {/* Social Links */}
                    <li style={{ marginLeft: "5px" }}>
                      {appSocialLink?.map((item, index) => (
                        <a
                          key={index}
                          href={item.url}
                          title={item.name}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i
                            className={`${item.icon} text-white font-weight-medium`}
                          />
                        </a>
                      ))}
                    </li>

                    {/* Language Selector */}
                    <li>
                      <div className="header-dropdown">
                        <a className="text-white">{currentLanguage.name}</a>
                        <div className="header-menu">
                          <ul>
                            {languageList?.map((item, index) => (
                              <li
                                key={index}
                                onClick={() =>
                                  changeLanguageState(item.slug, item.name)
                                }
                              >
                                <a>{item.name}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* HEADER MIDDLE */}
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <button
                className="mobile-menu-toggler"
                onClick={mobileMenuOpen}
              >
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars" />
              </button>
              <NavLink to={"/"} className="logo">
                <img src={logo} alt="Molla Logo" width={130} height={40} />
              </NavLink>
            </div>

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
                </form>
              </div>
            </div>

            <div className="header-right">
              {/* Wishlist */}
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

              {/* Cart */}
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
                    {userCart?.slice(0, 5).map((item, index) => (
                      <div className="product" key={index}>
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
                        <figure className="product-image-container">
                          <NavLink to="/" className="product-image">
                            <img
                              src={
                                process.env.REACT_APP_IMAGE_URL + item.cartImage
                              }
                              alt={item.cartName}
                            />
                          </NavLink>
                        </figure>
                        <a
                          href="#"
                          className="btn-remove"
                          title="Remove Product"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveCartItem(item.id);
                          }}
                        >
                          <i className="icon-close" />
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-cart-total">
                    <span>Total</span>
                    <span className="cart-total-price">
                      ₹{totalSellPrice()}
                    </span>
                  </div>
                  <div className="dropdown-cart-action">
                    <NavLink to="/cart" className="btn btn-primary">
                      View Cart
                    </NavLink>
                    <NavLink
                      to="/checkout"
                      className="btn btn-outline-primary-2"
                    >
                      <span>Checkout</span>
                      <i className="icon-long-arrow-right" />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HEADER BOTTOM */}
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
                      {allCategory?.map((item, index) => (
                        <li key={index}>
                          <NavLink to={"/products"}>{item.name}</NavLink>
                        </li>
                      ))}
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
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="banner banner-overlay">
                            <NavLink to="/products" className="banner banner-menu">
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
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <a href="#" className="sf-with-ul">
                      Pages
                    </a>
                    <ul>
                      {legalPageList?.map((item, index) => (
                        <li key={index}>
                          <NavLink to={`/legalpage/${item.url}`}>
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li>
                    <NavLink to="/blog">Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to={loginState ? "/profile" : "/register"}>
                      {loginState ? "Profile" : "Login"}
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header-right">
              <i className="la la-lightbulb-o" />
              <p>
                Clearance
                <span className="highlight">&nbsp;Up to 30% Off</span>
              </p>
            </div>
          </div>
        </div>
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
