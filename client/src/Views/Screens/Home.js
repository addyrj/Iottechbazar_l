/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import brand1 from "../../Assets/images/brands/1.png";
import brand2 from "../../Assets/images/brands/2.png";
import brand3 from "../../Assets/images/brands/3.png";
import brand4 from "../../Assets/images/brands/4.png";
import brand5 from "../../Assets/images/brands/5.png";
import brand6 from "../../Assets/images/brands/6.png";
import brand7 from "../../Assets/images/brands/7.png";
import banner1 from "../../Assets/images/demos/demo-2/banners/banner-1.jpg";
import banner2 from "../../Assets/images/demos/demo-2/banners/banner-2.jpg";
import banner3 from "../../Assets/images/demos/demo-2/banners/banner-3.jpg";
import banner4 from "../../Assets/images/demos/demo-2/banners/banner-4.jpg";
import banner5 from "../../Assets/images/demos/demo-2/banners/banner-5.jpg";
import product_1 from "../../Assets/images/demos/demo-2/deal/product-1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "styled-components";
import moment from "moment";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";

import "../../Styles/crousel.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
    allBlogs,
    allSlider,
    proCatHeaderTab,
    proSecTab,
} from "../../Utils/CustomList";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllCategoriesProduct,
    getAppBlogs,
    getHomeSlider,
    getUserCart,
    setTabHeaderState,
    setTabSpeProductState,
} from "../../Database/Action/DashboardAction";
import ProductGridCrousel from "../Components/ProductGridCrousel";
import ProductCrousal from "../Components/ProductCrousal";
import { NavLink } from "react-router-dom";

const tabStyle = {
    color: "#a6c76c",
    fontSize: "1.6rem",
    padding: ".55rem 3rem",
    borderBottomWidth: ".2rem",
    textTransfome: "capitalize",
};

const Home = () => {
    const dispatch = useDispatch();
    const allProductSection = useSelector((state) => state.DashboardReducer.allCategorizedProduct);
    const appBlogs = useSelector((state) => state.DashboardReducer.appBlogs);
    const homeSlider = useSelector((state) => state.DashboardReducer.homeSlider);
    const [tab1, setTab1] = useState(1);
    const [tab2, setTab2] = useState(1);

    const handleChangeTab1 = (event, newValue) => {
        setTab1(newValue);
        dispatch(setTabHeaderState(newValue));
    };
    const handleChangeTab2 = (event, newValue) => {
        setTab2(newValue);
        dispatch(setTabSpeProductState(newValue));
    };

    const getTime = (oldDate) => {
        var dateTime = new Date(oldDate);
        dateTime = moment(dateTime).format("YYYY-MM-DD");
        return dateTime;
    }

    useEffect(() => {
        dispatch(getAllCategoriesProduct())
        dispatch(getHomeSlider())
        dispatch(getAppBlogs())
    }, [dispatch])

    return (
        <Wrapper>
            <main className="main">
                <div className="intro-slider-container">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="owl-carousel owl-simple owl-light owl-nav-inside"
                    >
                        {homeSlider?.map((item, index) => {
                            return (
                                <SwiperSlide>
                                    <NavLink to={"/productDetail"} state={{
                                        primaryImage: item?.productData[0]?.primaryImage,
                                        name: item?.productData[0]?.name,
                                        rating: item?.productData[0]?.rating,
                                        review: item?.productData[0]?.review,
                                        subScript: item?.productData[0]?.subScript,
                                        model: item?.productData[0]?.model,
                                        productSku: item?.productData[0]?.productSku,
                                        stock: item?.productData[0]?.stock,
                                        subCategoryName: item?.productData[0]?.subCategoryName,
                                        productSpecialPrice: item?.productData[0]?.productSpecialPrice,
                                        categoryName: item?.productData[0]?.categoryName,
                                        proSection: item?.productData[0]?.proSection,
                                        secondaryImage: JSON.parse(item?.productData[0]?.secondaryImage),
                                        description: item?.productData[0]?.secondaryImage,
                                        offer: item?.productData[0]?.secondaryImage,
                                        specification: item?.productData[0]?.secondaryImage,
                                        manufacturer: item?.productData[0]?.secondaryImage,
                                        warranty: item?.productData[0]?.secondaryImage,
                                        id: item?.productData[0]?.secondaryImage,
                                        slug: item?.productData[0]?.secondaryImage,
                                    }}>
                                        <div
                                            key={index}
                                            className="intro-slide homeSlider"
                                            style={{
                                                backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL + item.avatar})`,
                                            }}
                                        />
                                    </NavLink>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                {/* End .intro-slider-container */}
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        420: {
                            slidesPerView: 3,
                            spaceBetween: 5,
                        },
                        600: {
                            slidesPerView: 4,
                            spaceBetween: 5,
                        },
                        900: {
                            slidesPerView: 5,
                            spaceBetween: 5,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 5,
                        },
                        1360: {
                            slidesPerView: 7,
                            spaceBetween: 5,
                        },
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="brands-border owl-carousel owl-simple mobileBrandWipper"
                >
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand1} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand2} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand3} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand4} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand5} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand6} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand7} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand1} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="brand">
                            <img src={brand4} alt="Brand Name" />
                        </a>
                    </SwiperSlide>
                </Swiper>
                {/* End .owl-carousel */}
                <div className="mb-3 mb-lg-5" />
                {/* End .mb-3 mb-lg-5 */}
                <div className="banner-group">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-5">
                                <div className="banner banner-large banner-overlay banner-overlay-light">
                                    <a href="#">
                                        <img src={banner1} alt="Banner" />
                                    </a>
                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle">Clearence</h4>
                                        {/* End .banner-subtitle */}
                                        <h3 className="banner-title">Coffee Tables</h3>
                                        {/* End .banner-title */}
                                        <div className="banner-text">from $19.99</div>
                                        {/* End .banner-text */}
                                        <a href="#" className="btn btn-outline-gray banner-link">
                                            Shop Now
                                            <i className="icon-long-arrow-right" />
                                        </a>
                                    </div>
                                    {/* End .banner-content */}
                                </div>
                                {/* End .banner */}
                            </div>
                            {/* End .col-lg-5 */}
                            <div className="col-md-6 col-lg-3">
                                <div className="banner banner-overlay">
                                    <a href="#">
                                        <img src={banner2} alt="Banner" />
                                    </a>
                                    <div className="banner-content banner-content-bottom">
                                        <h4 className="banner-subtitle text-grey">On Sale</h4>
                                        {/* End .banner-subtitle */}
                                        <h3 className="banner-title text-white">
                                            Amazing <br />
                                            Armchairs
                                        </h3>
                                        {/* End .banner-title */}
                                        <div className="banner-text text-white">from $39.99</div>
                                        {/* End .banner-text */}
                                        <a href="#" className="btn btn-outline-white banner-link">
                                            Discover Now
                                            <i className="icon-long-arrow-right" />
                                        </a>
                                    </div>
                                    {/* End .banner-content */}
                                </div>
                                {/* End .banner */}
                            </div>
                            {/* End .col-lg-3 */}
                            <div className="col-md-6 col-lg-4">
                                <div className="banner banner-overlay">
                                    <a href="#">
                                        <img src={banner3} alt="Banner" />
                                    </a>
                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle text-grey">New Arrivals</h4>
                                        {/* End .banner-subtitle */}
                                        <h3 className="banner-title text-white">
                                            Storage <br />
                                            Boxes &amp; Baskets
                                        </h3>
                                        {/* End .banner-title */}
                                        <a href="#" className="btn btn-outline-white banner-link">
                                            Discover Now
                                            <i className="icon-long-arrow-right" />
                                        </a>
                                    </div>
                                    {/* End .banner-content */}
                                </div>
                                {/* End .banner */}
                                <div className="banner banner-overlay banner-overlay-light">
                                    <a href="#">
                                        <img src={banner4} alt="Banner" />
                                    </a>
                                    <div className="banner-content banner-content-top">
                                        <h4 className="banner-subtitle">On Sale</h4>
                                        {/* End .banner-subtitle */}
                                        <h3 className="banner-title">Lamps Offer</h3>
                                        {/* End .banner-title */}
                                        <div className="banner-text">up to 30% off</div>
                                        {/* End .banner-text */}
                                        <a href="#" className="btn btn-outline-gray banner-link">
                                            Shop Now
                                            <i className="icon-long-arrow-right" />
                                        </a>
                                    </div>
                                    {/* End .banner-content */}
                                </div>
                                {/* End .banner */}
                            </div>
                            {/* End .col-lg-4 */}
                        </div>
                        {/* End .row */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .banner-group */}
                <div className="mb-3" />
                {/* End .mb-6 */}
                <div className="container">
                    <TabContext value={tab1}>
                        <Box className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3">
                            <TabList
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleChangeTab1}
                                aria-label="lab API tabs example"
                            >
                                {proCatHeaderTab.map((item, index) => {
                                    return (
                                        <Tab
                                            key={index}
                                            sx={tabStyle}
                                            label={item.title}
                                            value={item.id}
                                        />
                                    );
                                })}
                            </TabList>
                        </Box>
                        <div className="container-fluid">
                            <Box className="tab-content tab-content-carousel">
                                <div
                                    className="product-swiper-button-prev mobileNone"
                                    style={{ color: "#a6c76c" }}
                                >
                                    <i
                                        className="fa-solid fa-chevron-left text-white"
                                        style={{ fontSize: "25px" }}
                                    />
                                </div>

                                <div
                                    className="product-swiper-button-next mobileNone"
                                    style={{ color: "#a6c76c" }}
                                >
                                    <i
                                        className="fa-solid fa-chevron-right text-white"
                                        style={{ fontSize: "25px" }}
                                    />
                                </div>
                                <TabPanel
                                    sx={{ padding: "20px", lineHeight: "2" }}
                                    className={
                                        tab1 === 1
                                            ? "tab-pane p-0 fade show active"
                                            : "tab-pane p-0 fade"
                                    }
                                    value={tab1}
                                >
                                    <ProductGridCrousel allProduct={allProductSection} tab1={tab1} />
                                </TabPanel>
                                <TabPanel
                                    sx={{ padding: "20px", lineHeight: "2" }}
                                    className={
                                        tab1 === 2
                                            ? "tab-pane p-0 fade show active"
                                            : "tab-pane p-0 fade"
                                    }
                                    value={tab1}
                                >
                                    <ProductGridCrousel allProduct={allProductSection} tab1={tab1} />
                                </TabPanel>
                                <TabPanel
                                    sx={{ padding: "20px", lineHeight: "2" }}
                                    className={
                                        tab1 === 3
                                            ? "tab-pane p-0 fade show active"
                                            : "tab-pane p-0 fade"
                                    }
                                    value={tab1}
                                >
                                    <ProductGridCrousel allProduct={allProductSection} tab1={tab1} />
                                </TabPanel>
                            </Box>
                        </div>
                    </TabContext>
                </div>
                {/* End .container */}

                {/* End .container-fluid */}
                <div className="mb-5" />
                {/* End .mb-5 */}
                <div className="bg-light deal-container pt-5 pb-3 mb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="deal">
                                    <div className="deal-content">
                                        <h4>Limited Quantities</h4>
                                        <h2>Deal of the Day</h2>
                                        <h3 className="product-title">
                                            <a href="product.html">POÄNG</a>
                                        </h3>
                                        {/* End .product-title */}
                                        <div className="product-price">
                                            <span className="new-price">$149.00</span>
                                            <span className="old-price">Was $240.00</span>
                                        </div>
                                        {/* End .product-price */}
                                        <div className="deal-countdown row">
                                            <div className="timerLayout">
                                                <div>
                                                    <p
                                                        style={{
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                            color: "white",
                                                        }}
                                                    >
                                                        10
                                                    </p>
                                                    <p style={{ fontWeight: "normal", color: "white" }}>
                                                        Days.
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                    margin: "0px 5px 0px 5px",
                                                    alignSelf: "center",
                                                }}
                                            >
                                                :
                                            </p>
                                            <div className="timerLayout">
                                                <div className="timerLayout">
                                                    <div>
                                                        <p
                                                            style={{
                                                                textAlign: "center",
                                                                fontWeight: "bold",
                                                                color: "white",
                                                            }}
                                                        >
                                                            15
                                                        </p>
                                                        <p style={{ fontWeight: "normal", color: "white" }}>
                                                            Hrs.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                    margin: "0px 5px 0px 5px",
                                                    alignSelf: "center",
                                                }}
                                            >
                                                :
                                            </p>
                                            <div className="timerLayout">
                                                <div className="timerLayout">
                                                    <div>
                                                        <p
                                                            style={{
                                                                textAlign: "center",
                                                                fontWeight: "bold",
                                                                color: "white",
                                                            }}
                                                        >
                                                            30
                                                        </p>
                                                        <p style={{ fontWeight: "normal", color: "white" }}>
                                                            Mins.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                    margin: "0px 5px 0px 5px",
                                                    alignSelf: "center",
                                                }}
                                            >
                                                :
                                            </p>
                                            <div className="timerLayout">
                                                <div className="timerLayout">
                                                    <div>
                                                        <p
                                                            style={{
                                                                textAlign: "center",
                                                                fontWeight: "bold",
                                                                color: "white",
                                                            }}
                                                        >
                                                            45
                                                        </p>
                                                        <p style={{ fontWeight: "normal", color: "white" }}>
                                                            Secs.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End .deal-countdown */}
                                        <a href="product.html" className="btn btn-primary">
                                            <span>Shop Now</span>
                                            <i className="icon-long-arrow-right" />
                                        </a>
                                    </div>
                                    {/* End .deal-content */}
                                    <div className="deal-image">
                                        <a href="product.html">
                                            <img src={product_1} alt="image" />
                                        </a>
                                    </div>
                                    {/* End .deal-image */}
                                </div>
                                {/* End .deal */}
                            </div>
                            {/* End .col-lg-9 */}
                            <div className="col-lg-3">
                                <div className="banner banner-overlay banner-overlay-light text-center d-none d-lg-block">
                                    <a href="#">
                                        <img src={banner5} alt="Banner" />
                                    </a>
                                    <div className="banner-content banner-content-top banner-content-center">
                                        <h4 className="banner-subtitle">The Best Choice</h4>
                                        {/* End .banner-subtitle */}
                                        <h3 className="banner-title">AGEN</h3>
                                        {/* End .banner-title */}
                                        <div className="banner-text text-primary">$49.99</div>
                                        {/* End .banner-text */}
                                        <a href="#" className="btn btn-outline-gray banner-link">
                                            Shop Now
                                            <i className="icon-long-arrow-right" />
                                        </a>
                                    </div>
                                    {/* End .banner-content */}
                                </div>
                                {/* End .banner */}
                            </div>
                            {/* End .col-lg-3 */}
                        </div>
                        {/* End .row */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .bg-light */}
                <div className="mb-6" />
                {/* End .mb-6 */}
                <div className="container">
                    <div className="heading heading-center mb-3">
                        <h2 className="title">Top Selling Products</h2>
                        {/* End .title */}
                        <TabContext value={tab2}>
                            <Box className="nav nav-pills nav-border-anim justify-content-center">
                                <TabList
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleChangeTab2}
                                    aria-label="lab API tabs example"
                                >
                                    {proSecTab.map((item, index) => {
                                        return (
                                            <Tab
                                                key={index}
                                                sx={tabStyle}
                                                label={item.title}
                                                value={item.id}
                                            />
                                        );
                                    })}
                                </TabList>
                            </Box>
                            <Box className="tab-content">
                                <div
                                    className="product-special-swiper-button-prev mobileNone"
                                    style={{ color: "#a6c76c" }}
                                >
                                    <i
                                        className="fa-solid fa-chevron-left text-white"
                                        style={{ fontSize: "25px" }}
                                    />
                                </div>

                                <div
                                    className="product-special-swiper-button-next mobileNone"
                                    style={{ color: "#a6c76c" }}
                                >
                                    <i
                                        className="fa-solid fa-chevron-right text-white"
                                        style={{ fontSize: "25px" }}
                                    />
                                </div>
                                <TabPanel
                                    sx={{ padding: "20px", lineHeight: "2" }}
                                    className={
                                        tab2 === 1
                                            ? "tab-pane p-0 fade show active"
                                            : "tab-pane p-0 fade"
                                    }
                                    value={tab2}
                                >
                                    <ProductCrousal />
                                </TabPanel>

                                <TabPanel
                                    sx={{ padding: "20px", lineHeight: "2" }}
                                    className={
                                        tab2 === 2
                                            ? "tab-pane p-0 fade show active"
                                            : "tab-pane p-0 fade"
                                    }
                                    value={tab2}
                                >
                                    <ProductCrousal />
                                </TabPanel>
                            </Box>
                        </TabContext>
                    </div>
                    {/* End .heading */}

                    {/* End .tab-content */}
                </div>
                {/* End .container */}
                <div className="container">
                    <hr className="mt-1 mb-6" />
                </div>
                {/* End .container */}
                <div className="blog-posts">
                    {/* <div class="swiper-blog-button-prev"></div>

                    <div class="swiper-blog-button-next"></div> */}
                    <div className="container">
                        <h2 className="title text-center">From Our Blog</h2>
                        {/* End .title-lg text-center */}
                        <Swiper
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                600: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                            }}
                            navigation={false}
                            // autoplay={{
                            //     delay: 4000,
                            //     disableOnInteraction: false,
                            // }}
                            modules={[Pagination, Autoplay, Navigation]}
                            className="owl-carousel owl-simple carousel-with-shadow"
                        >
                            {appBlogs.map((currElem, index) => {
                                return (
                                    <SwiperSlide>
                                        <article className="entry entry-display">
                                            <figure className="entry-media">
                                                <a href="#">
                                                    <img src={process.env.REACT_APP_IMAGE_URL + currElem.avatar} alt={currElem.title} />
                                                </a>
                                            </figure>
                                            {/* End .entry-media */}
                                            <div className="entry-body text-center">
                                                <div className="entry-meta">
                                                    <a href="#">{getTime(currElem.createdAt)}</a>, {0} Comments
                                                </div>
                                                {/* End .entry-meta */}
                                                <h3 className="entry-title">
                                                    <a href="#">{currElem.title}</a>
                                                </h3>
                                                {/* End .entry-title */}
                                                <div className="entry-content">
                                                    <NavLink to="/blog" className="read-more">
                                                        Continue Reading
                                                    </NavLink>
                                                </div>
                                                {/* End .entry-content */}
                                            </div>
                                            {/* End .entry-body */}
                                        </article>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        {/* End .owl-carousel */}
                        <div className="more-container text-center mt-2">
                            <NavLink to="/blog" className="btn btn-outline-darker btn-more">
                                <span>View more articles</span>
                                <i className="icon-long-arrow-right" />
                            </NavLink>
                        </div>
                        {/* End .more-container */}

                        {/* End .cta */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .blog-posts */}
            </main>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  .homeSlider {
    height: 350px !important;
  }
  .intro-slider-container {
    height: 350px !important;
  }
  .product-swiper-button-prev {
    position: absolute;
    width: 50px;
    height: 250px;
    background-color: #a6c76c;
    display: flex;
    top: 35%;
    z-index: 999;
    left: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }

  .product-swiper-button-next {
    position: absolute;
    width: 50px;
    height: 250px;
    background-color: #a6c76c;
    display: flex;
    top: 35%;
    z-index: 999;
    right: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }
  .product-special-swiper-button-prev {
    position: absolute;
    width: 40px;
    height: 120px;
    background-color: #a6c76c;
    display: flex;
    z-index: 999;
    left: 20px;
    margin-top: 110px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }
  .product-special-swiper-button-next {
    position: absolute;
    width: 40px;
    height: 120px;
    background-color: #a6c76c;
    display: flex;
    z-index: 999;
    right: 20px;
    margin-top: 110px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }
  .timerLayout {
    width: 55px;
    height: 80px;
    background-color: #a6c76c;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mobileProductWithBorder {
    border: 1px solid #a6c76c;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobileNone {
      display: none;
    }
    .homeSlider {
      width: 100%;
      height: 150px !important;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .intro-slider-container {
      width: 100%;
      height: 150px !important;
    }
    .mobileBrandWipper{
        height: 100px !important;
    }
    .product.text-center .product-nav, .product.text-center .product-size {
    justify-content: center;
    display: none;
}
  }
`;

export default Home;
