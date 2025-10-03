/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import product4 from "../../Assets/images/products/product-4.jpg";
import product6 from "../../Assets/images/products/product-6.jpg";
import product11 from "../../Assets/images/products/product-11.jpg";
import product10 from "../../Assets/images/products/product-10.jpg";
import product7 from "../../Assets/images/products/product-7.jpg";
import ProductGallery from "../Components/ProductGallery";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductRetingReview,
    openImageModal,
    setLoader,
} from "../../Database/Action/DashboardAction";
import { productReview, ratingLabels } from "../../Utils/CustomList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useLocation } from "react-router-dom";
import isEmpty from "lodash.isempty";
import toast from "react-hot-toast";
import { postHeaderWithToken } from "../../Database/ApiHeader";
import Review from "../Components/Review";

const HtmlToReactParser = require("html-to-react").Parser;

function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${ratingLabels[value]}`;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    boxShadow: 24,
};

const tabStyle = {
    color: "#333333",
    fontSize: "1.6rem",
    padding: ".55rem 3rem",
    borderBottomWidth: ".2rem",
    textTransfome: "capitalize",
};

const ProductDetail = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [count, setCount] = useState(1);
    const [value, setValue] = React.useState(1);

    const [ratingValue, setRatingValue] = useState(0);
    const [reviewValue, setReviewValue] = useState("");
    const [hover, setHover] = useState(-1);

    const ratingReview = useSelector((state) => state.DashboardReducer.ratingReview)
    const averageRating = useSelector((state) => state.DashboardReducer.averageRating)

    const {
        primaryImage,
        name,
        rating,
        review,
        subScript,
        model,
        productSku,
        stock,
        subCategoryName,
        productSpecialPrice,
        categoryName,
        proSection,
        secondaryImage,
        offer,
        description,
        specification,
        manufacturer,
        warranty,
        id,
        slug,
    } = location.state || {};
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const imageModal = useSelector((state) => state.DashboardReducer.imageModal);

    const getHtmlText = (html) => {
        const htmlToReactParser = new HtmlToReactParser();
        const reactElement = htmlToReactParser.parse(html);
        return reactElement;
    };

    const productSpecInfo = [
        {
            id: 1,
            header: "Description",
            body: (
                <div class="product-desc-content">
                    <h3>Product Information</h3>
                    {getHtmlText(description)}
                </div>
            ),
        },
        {
            id: 2,
            header: "Specification",
            body: (
                <div class="product-desc-content">
                    <h3>Specification</h3>
                    {getHtmlText(specification)}
                </div>
            ),
        },
        {
            id: 3,
            header: "Manufacturer",
            body: (
                <div class="product-desc-content">
                    <h3>Manufacturer</h3>
                    {getHtmlText(manufacturer)}
                </div>
            ),
        },
        {
            id: 4,
            header: "Offer",
            body: (
                <div class="product-desc-content">
                    <h3>Offer</h3>
                    {getHtmlText(offer)}
                </div>
            ),
        },
        {
            id: 5,
            header: "Warranty",
            body: (
                <div class="reviews">
                    <h3>Warranty</h3>
                    {getHtmlText(warranty)}
                </div>
            ),
        },
        {
            id: 6,
            header: `Reviews (${ratingReview.length})`,
            body: (
                <div class="reviews">
                    <h3>Reviews</h3>
                </div>
            ),
        },
    ];
    const handleClose = () => dispatch(openImageModal(false));

    const addCart = (id, slug, count) => {
        if (isEmpty(id.toString()) || isEmpty(slug)) {
            toast.error("Failed! Product not found");
        } else if (isEmpty(count.toString())) {
            toast.error("Failed! cart count is not valid");
        } else {
            let formData = new FormData();
            formData.append("productId", id);
            formData.append("productSlug", slug);
            formData.append("cartCount", count);
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

    const addWishList = (id, slug) => {
        if (isEmpty(id.toString()) || isEmpty(slug)) {
            toast.error("Failed! Product not found");
        } else {
            let formData = new FormData();
            formData.append("productId", id);
            formData.append("productSlug", slug);
            dispatch(setLoader(true));
            axios
                .post(
                    process.env.REACT_APP_BASE_URL + "addWishlist",
                    formData,
                    postHeaderWithToken
                )
                .then((res) => {
                    if (res.data.status === 200) {
                        toast.success(res.data.message);
                        dispatch(setLoader(false));
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error);
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message);
                });
        }
    };

    const createReview = async (rating, review, id, slug) => {
        const userInfo = await localStorage.getItem("iottechUserInfo");
        if (userInfo === null) {
            toast.error("Failed! Please login to create review")
        } else {
            dispatch(setLoader(true));
            let formData = new FormData();
            formData.append("productId", id);
            formData.append("productSlug", slug);
            formData.append("rating", rating);
            formData.append("review", review);
            axios.post(process.env.REACT_APP_BASE_URL + "addProductReview", formData, postHeaderWithToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        toast.success(res.data.message);
                        dispatch(setLoader(false));
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error);
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message);
                })
        }
    }

    useEffect(() => {
        dispatch(getProductRetingReview({ productId: id, productSlug: slug }))
    }, [dispatch, location.pathname]);
    return (
        <Wrapper>
            <main className="main">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={imageModal}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={imageModal}>
                        <Box sx={style}>
                            <figure>
                                <img
                                    className="mfp-img"
                                    src={process.env.REACT_APP_IMAGE_URL + primaryImage}
                                ></img>
                                <figcaption>
                                    <div class="mfp-bottom-bar">
                                        <div class="mfp-title">Product</div>
                                        <div class="mfp-counter">1/1</div>
                                    </div>
                                </figcaption>
                            </figure>
                        </Box>
                    </Fade>
                </Modal>
                <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                    <div className="container d-flex align-items-center">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Products</a>
                            </li>
                        </ol>
                        <nav className="product-pager ml-auto" aria-label="Product">
                            <a
                                className="product-pager-link product-pager-prev"
                                href="#"
                                aria-label="Previous"
                                tabIndex={-1}
                            >
                                <i className="icon-angle-left" />
                                <span>Prev</span>
                            </a>
                            <a
                                className="product-pager-link product-pager-next"
                                href="#"
                                aria-label="Next"
                                tabIndex={-1}
                            >
                                <span>Next</span>
                                <i className="icon-angle-right" />
                            </a>
                        </nav>
                        {/* End .pager-nav */}
                    </div>
                    {/* End .container */}
                </nav>
                {/* End .breadcrumb-nav */}
                <div className="page-content">
                    <div className="container">
                        <div className="product-details-top mb-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <ProductGallery
                                        primaryImage={primaryImage}
                                        secondaryImage={secondaryImage}
                                    />
                                </div>
                                {/* End .col-md-6 */}
                                <div className="col-md-6">
                                    <div className="product-details product-details-centered">
                                        <h1 className="product-title">{name}</h1>
                                        {/* End .product-title */}
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width:
                                                 Math.round(averageRating) === 1 ? "20%" : 
                                                 Math.round(averageRating) === 2 ? "40%":
                                                 Math.round(averageRating) === 3 ? "60%":
                                                 Math.round(averageRating) === 4 ? "80%":
                                                  "100%"}} ></div>
                                                {/* End .ratings-val */}
                                            </div>
                                            {/* End .ratings */}
                                            <a
                                                className="ratings-text"
                                                href="#product-review-link"
                                                id="review-link"
                                            >
                                                ( {ratingReview.length} Reviews )
                                            </a>
                                        </div>
                                        {/* End .rating-container */}
                                        <div className="product-price">
                                            {" "}
                                            ₹{productSpecialPrice} /-
                                        </div>
                                        {/* End .product-price */}
                                        <div className="product-content">
                                            <p>{subScript}</p>
                                        </div>
                                        {/* End .product-content */}
                                        <div className="details-filter-row details-row-size">
                                            <label className="text-black font-weight-bold">
                                                Avalablity:
                                            </label>
                                            <span className="">{`In Stock (${stock})`}</span>
                                            {/* End .product-nav */}
                                        </div>
                                        {/* End .details-filter-row */}
                                        <div className="details-filter-row details-row-size">
                                            <label
                                                className="text-black font-weight-bold"
                                                htmlFor="size"
                                            >
                                                Product Sku:
                                            </label>
                                            <div className="">{productSku}</div>
                                            {/* End .select-custom */}
                                            <a href="#" className="size-guide">
                                                <label
                                                    className="text-black font-weight-bold ml-4"
                                                    htmlFor=""
                                                >
                                                    Modal :
                                                </label>
                                                <div>{model}</div>
                                            </a>
                                        </div>
                                        {/* End .details-filter-row */}
                                        <div className="product-details-action">
                                            <div className="details-action-col">
                                                <div className="product-details-quantity">
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
                                                            onClick={() =>
                                                                count > 1 ? setCount(count - 1) : setCount(1)
                                                            }
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
                                                            onClick={() =>
                                                                count < parseInt(stock)
                                                                    ? setCount(count + 1)
                                                                    : setCount(parseInt(stock))
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/* End .product-details-quantity */}
                                                <button
                                                    className="buttonStyle"
                                                    onClick={() =>
                                                        count < 1
                                                            ? toast.error(
                                                                "Failed! Cart count must be grater than 1"
                                                            )
                                                            : addCart(id, slug, count)
                                                    }
                                                >
                                                    <i className="fa fa-cart-shopping mr-4" />
                                                    <a>add to cart</a>
                                                </button>
                                            </div>
                                            {/* End .details-action-col */}
                                            <div className="details-action-wrapper">
                                                <a
                                                    className="btn-product btn-wishlist"
                                                    title="Wishlist"
                                                    onClick={() => addWishList(id, slug)}
                                                >
                                                    <span>Add to Wishlist</span>
                                                </a>
                                                <a
                                                    href="#"
                                                    className="btn-product btn-compare"
                                                    title="Compare"
                                                >
                                                    <span>Add to Compare</span>
                                                </a>
                                            </div>
                                            {/* End .details-action-wrapper */}
                                        </div>
                                        {/* End .product-details-action */}
                                        <div className="product-details-footer">
                                            <div className="product-cat">
                                                <span>Category:</span>
                                                <a href="#">{categoryName}</a>
                                            </div>

                                            {/* End .product-cat */}
                                            <div className="social-icons social-icons-sm">
                                                <span className="social-label">Share:</span>
                                                <a
                                                    href="#"
                                                    className="social-icon"
                                                    title="Facebook"
                                                    target="_blank"
                                                >
                                                    <i className="icon-facebook-f" />
                                                </a>
                                                <a
                                                    href="#"
                                                    className="social-icon"
                                                    title="Twitter"
                                                    target="_blank"
                                                >
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
                                                <a
                                                    href="#"
                                                    className="social-icon"
                                                    title="Pinterest"
                                                    target="_blank"
                                                >
                                                    <i className="icon-pinterest" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="product-cat d-flex">
                                            <span>Sub-Category:</span>
                                            <a href="#">{subCategoryName}</a>
                                        </div>
                                        {/* End .product-details-footer */}
                                    </div>
                                    {/* End .product-details */}
                                </div>
                                {/* End .col-md-6 */}
                            </div>
                            {/* End .row */}
                        </div>
                        {/* End .product-details-top */}
                        <div className="product-details-tab">
                            <TabContext value={value}>
                                <Box className="nav nav-pills justify-content-center">
                                    <TabList
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={handleChange}
                                        aria-label="lab API tabs example"
                                    >
                                        {productSpecInfo.map((item, index) => {
                                            return (
                                                <Tab
                                                    key={index}
                                                    sx={tabStyle}
                                                    label={item.header}
                                                    value={item.id}
                                                />
                                            );
                                        })}
                                    </TabList>
                                </Box>
                                <Box className="tab-content">
                                    {productSpecInfo.map((item, index) => {
                                        return (
                                            <TabPanel
                                                sx={{ padding: "20px", lineHeight: "2" }}
                                                className={
                                                    value === item.id
                                                        ? "tab-pane fade show active"
                                                        : "tab-pane fade"
                                                }
                                                value={value}
                                            >
                                                {item.id === 6 ? (
                                                    <div class="reviews">
                                                        <div className="writeReviewStyle">
                                                            <h3>Write a Review</h3>
                                                            <p>
                                                                <span
                                                                    style={{
                                                                        color: "red",
                                                                        marginRight: "5px",
                                                                        fontWeight: "bold",
                                                                    }}
                                                                >
                                                                    *
                                                                </span>
                                                                Your Review :
                                                            </p>
                                                            <textarea
                                                                className="form-control productReviewStyle"
                                                                name="review"
                                                                id="review"
                                                                value={reviewValue}
                                                                placeholder="Write Your Review"
                                                                onChange={(e) => setReviewValue(e.target.value)}
                                                            ></textarea>
                                                            <div className="help-block">
                                                                <span className="text-danger">Note:</span> Html
                                                                Can not be translated
                                                            </div>
                                                            <p>
                                                                <span
                                                                    style={{
                                                                        color: "red",
                                                                        marginRight: "5px",
                                                                        fontWeight: "bold",
                                                                    }}
                                                                >
                                                                    *
                                                                </span>
                                                                Rating :
                                                            </p>
                                                            <Box
                                                                sx={{
                                                                    width: 200,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Rating
                                                                    name="size-large"
                                                                    value={ratingValue}
                                                                    getLabelText={getLabelText}
                                                                    sx={{
                                                                        "& .MuiSvgIcon-root": {
                                                                            fontSize: 40,
                                                                        },
                                                                    }}
                                                                    onChange={(event, newValue) => {
                                                                        setRatingValue(newValue);
                                                                    }}
                                                                    onChangeActive={(event, newHover) => {
                                                                        setHover(newHover);
                                                                    }}
                                                                    icon={
                                                                        <StarIcon
                                                                            style={{
                                                                                opacity: 0.55,
                                                                                color: "#faaf00",
                                                                            }}
                                                                        />
                                                                    }
                                                                    emptyIcon={
                                                                        <StarIcon
                                                                            style={{ opacity: 0.55 }}
                                                                            fontSize="inherit"
                                                                        />
                                                                    }
                                                                />
                                                                {ratingValue !== null && (
                                                                    <Box sx={{ ml: 2 }}>
                                                                        {
                                                                            ratingLabels[
                                                                            hover !== -1 ? hover : ratingValue
                                                                            ]
                                                                        }
                                                                    </Box>
                                                                )}

                                                                <button className="buttonStyle reviewButton"
                                                                    onClick={() => ratingValue === 0 || ratingValue < 0 ?
                                                                        toast.error("Failed! Please rate product") : reviewValue === "" ?
                                                                            toast.error("Failed! Please enter your review")
                                                                            : createReview(ratingValue, reviewValue, id, slug)
                                                                    }>
                                                                    <i className="fa fa-cart-shopping mr-4" />
                                                                    <a>Continue</a>
                                                                </button>
                                                            </Box>
                                                        </div>

                                                        <h3>
                                                            <span
                                                                style={{
                                                                    color: "red",
                                                                    marginRight: "5px",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                *
                                                            </span>
                                                            Rating & Reviews :
                                                        </h3>

                                                        {ratingReview?.map((item, index) => {
                                                            return <Review {...item.id} {...item} />;
                                                        })}
                                                    </div>
                                                ) : (
                                                    item.body
                                                )}
                                            </TabPanel>
                                        );
                                    })}
                                </Box>
                            </TabContext>

                            {/* End .tab-content */}
                        </div>
                        {/* End .product-details-tab */}
                        <h2 className="title text-center mb-4">You May Also Like</h2>
                        {/* End .title text-center */}

                        <div
                            class="swiper-button-prev"
                            style={{ marginTop: "140px", color: "#a6c76c" }}
                        ></div>

                        <div
                            class="swiper-button-next"
                            style={{ marginTop: "140px", color: "#a6c76c" }}
                        ></div>

                        <Swiper
                            slidesPerView={4}
                            spaceBetween={40}
                            cssMode={true}
                            mousewheel={true}
                            keyboard={true}
                            onSlideChange={() => console.log("slide change")}
                            onSwiper={(swiper) => console.log(swiper)}
                            navigation={{
                                enabled: true,
                                prevEl: ".swiper-button-prev",
                                nextEl: ".swiper-button-next",
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                480: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                992: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                            }}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
                        >
                            <SwiperSlide className="product product-7 text-center">
                                <figure className="product-media">
                                    <span className="product-label label-new">New</span>
                                    <a href="product.html">
                                        <img
                                            src={product4}
                                            alt="Product image"
                                            className="product-image"
                                        />
                                    </a>
                                    <div className="product-action-vertical">
                                        <a
                                            href="#"
                                            className="btn-product-icon btn-wishlist btn-expandable"
                                        >
                                            <span>add to wishlist</span>
                                        </a>
                                        <a
                                            href="popup/quickView.html"
                                            className="btn-product-icon btn-quickview"
                                            title="Quick view"
                                        >
                                            <span>Quick view</span>
                                        </a>
                                        <a
                                            href="#"
                                            className="btn-product-icon btn-compare"
                                            title="Compare"
                                        >
                                            <span>Compare</span>
                                        </a>
                                    </div>
                                    {/* End .product-action-vertical */}
                                    <div className="product-action">
                                        <a href="#" className="btn-product btn-cart">
                                            <span>add to cart</span>
                                        </a>
                                    </div>
                                    {/* End .product-action */}
                                </figure>
                                {/* End .product-media */}
                                <div className="product-body">
                                    <div className="product-cat">
                                        <a href="#">Women</a>
                                    </div>
                                    {/* End .product-cat */}
                                    <h3 className="product-title">
                                        <a href="product.html">
                                            Brown paperbag waist <br />
                                            pencil skirt
                                        </a>
                                    </h3>
                                    {/* End .product-title */}
                                    <div className="product-price">$60.00</div>
                                    {/* End .product-price */}
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: "20%" }} />
                                            {/* End .ratings-val */}
                                        </div>
                                        {/* End .ratings */}
                                        <span className="ratings-text">( 2 Reviews )</span>
                                    </div>
                                    {/* End .rating-container */}
                                    <div className="product-nav product-nav-dots">
                                        <a
                                            href="#"
                                            className="active"
                                            style={{ background: "#cc9966" }}
                                        >
                                            <span className="sr-only">Color name</span>
                                        </a>
                                        <a href="#" style={{ background: "#333333" }}>
                                            <span className="sr-only">Color name</span>
                                        </a>
                                        <a href="#" style={{ background: "#806b3e" }}>
                                            <span className="sr-only">Color name</span>
                                        </a>
                                    </div>
                                    {/* End .product-nav */}
                                </div>
                                {/* End .product-body */}
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="product product-7 text-center">
                                    <figure className="product-media">
                                        <span className="product-label label-out">
                                            Out of Stock
                                        </span>
                                        <a href="product.html">
                                            <img
                                                src={product6}
                                                alt="Product image"
                                                className="product-image"
                                            />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a
                                                href="#"
                                                className="btn-product-icon btn-wishlist btn-expandable"
                                            >
                                                <span>add to wishlist</span>
                                            </a>
                                            <a
                                                href="popup/quickView.html"
                                                className="btn-product-icon btn-quickview"
                                                title="Quick view"
                                            >
                                                <span>Quick view</span>
                                            </a>
                                            <a
                                                href="#"
                                                className="btn-product-icon btn-compare"
                                                title="Compare"
                                            >
                                                <span>Compare</span>
                                            </a>
                                        </div>
                                        {/* End .product-action-vertical */}
                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart">
                                                <span>add to cart</span>
                                            </a>
                                        </div>
                                        {/* End .product-action */}
                                    </figure>
                                    {/* End .product-media */}
                                    <div className="product-body">
                                        <div className="product-cat">
                                            <a href="#">Jackets</a>
                                        </div>
                                        {/* End .product-cat */}
                                        <h3 className="product-title">
                                            <a href="product.html">Khaki utility boiler jumpsuit</a>
                                        </h3>
                                        {/* End .product-title */}
                                        <div className="product-price">
                                            <span className="out-price">$120.00</span>
                                        </div>
                                        {/* End .product-price */}
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: "80%" }} />
                                                {/* End .ratings-val */}
                                            </div>
                                            {/* End .ratings */}
                                            <span className="ratings-text">( 6 Reviews )</span>
                                        </div>
                                        {/* End .rating-container */}
                                    </div>
                                    {/* End .product-body */}
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                {" "}
                                <div className="product product-7 text-center">
                                    <figure className="product-media">
                                        <span className="product-label label-top">Top</span>
                                        <a href="product.html">
                                            <img
                                                src={product11}
                                                alt="Product image"
                                                className="product-image"
                                            />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a
                                                href="#"
                                                className="btn-product-icon btn-wishlist btn-expandable"
                                            >
                                                <span>add to wishlist</span>
                                            </a>
                                            <a
                                                href="popup/quickView.html"
                                                className="btn-product-icon btn-quickview"
                                                title="Quick view"
                                            >
                                                <span>Quick view</span>
                                            </a>
                                            <a
                                                href="#"
                                                className="btn-product-icon btn-compare"
                                                title="Compare"
                                            >
                                                <span>Compare</span>
                                            </a>
                                        </div>
                                        {/* End .product-action-vertical */}
                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart">
                                                <span>add to cart</span>
                                            </a>
                                        </div>
                                        {/* End .product-action */}
                                    </figure>
                                    {/* End .product-media */}
                                    <div className="product-body">
                                        <div className="product-cat">
                                            <a href="#">Shoes</a>
                                        </div>
                                        {/* End .product-cat */}
                                        <h3 className="product-title">
                                            <a href="product.html">
                                                Light brown studded Wide fit wedges
                                            </a>
                                        </h3>
                                        {/* End .product-title */}
                                        <div className="product-price">$110.00</div>
                                        {/* End .product-price */}
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: "80%" }} />
                                                {/* End .ratings-val */}
                                            </div>
                                            {/* End .ratings */}
                                            <span className="ratings-text">( 1 Reviews )</span>
                                        </div>
                                        {/* End .rating-container */}
                                        <div className="product-nav product-nav-dots">
                                            <a
                                                href="#"
                                                className="active"
                                                style={{ background: "#8b513d" }}
                                            >
                                                <span className="sr-only">Color name</span>
                                            </a>
                                            <a href="#" style={{ background: "#333333" }}>
                                                <span className="sr-only">Color name</span>
                                            </a>
                                            <a href="#" style={{ background: "#d2b99a" }}>
                                                <span className="sr-only">Color name</span>
                                            </a>
                                        </div>
                                        {/* End .product-nav */}
                                    </div>
                                    {/* End .product-body */}
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                {" "}
                                <div className="product product-7 text-center">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img
                                                src={product10}
                                                alt="Product image"
                                                className="product-image"
                                            />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a
                                                href="#"
                                                className="btn-product-icon btn-wishlist btn-expandable"
                                            >
                                                <span>add to wishlist</span>
                                            </a>
                                            <a
                                                href="popup/quickView.html"
                                                className="btn-product-icon btn-quickview"
                                                title="Quick view"
                                            >
                                                <span>Quick view</span>
                                            </a>
                                            <a
                                                href="#"
                                                className="btn-product-icon btn-compare"
                                                title="Compare"
                                            >
                                                <span>Compare</span>
                                            </a>
                                        </div>
                                        {/* End .product-action-vertical */}
                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart">
                                                <span>add to cart</span>
                                            </a>
                                        </div>
                                        {/* End .product-action */}
                                    </figure>
                                    {/* End .product-media */}
                                    <div className="product-body">
                                        <div className="product-cat">
                                            <a href="#">Jumpers</a>
                                        </div>
                                        {/* End .product-cat */}
                                        <h3 className="product-title">
                                            <a href="product.html">Yellow button front tea top</a>
                                        </h3>
                                        {/* End .product-title */}
                                        <div className="product-price">$56.00</div>
                                        {/* End .product-price */}
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: "0%" }} />
                                                {/* End .ratings-val */}
                                            </div>
                                            {/* End .ratings */}
                                            <span className="ratings-text">( 0 Reviews )</span>
                                        </div>
                                        {/* End .rating-container */}
                                    </div>
                                    {/* End .product-body */}
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                {" "}
                                <div className="product product-7 text-center">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img
                                                src={product7}
                                                alt="Product image"
                                                className="product-image"
                                            />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a
                                                href="#"
                                                className="btn-product-icon btn-wishlist btn-expandable"
                                            >
                                                <span>add to wishlist</span>
                                            </a>
                                            <a
                                                href="popup/quickView.html"
                                                className="btn-product-icon btn-quickview"
                                                title="Quick view"
                                            >
                                                <span>Quick view</span>
                                            </a>
                                            <a
                                                href="#"
                                                className="btn-product-icon btn-compare"
                                                title="Compare"
                                            >
                                                <span>Compare</span>
                                            </a>
                                        </div>
                                        {/* End .product-action-vertical */}
                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart">
                                                <span>add to cart</span>
                                            </a>
                                        </div>
                                        {/* End .product-action */}
                                    </figure>
                                    {/* End .product-media */}
                                    <div className="product-body">
                                        <div className="product-cat">
                                            <a href="#">Jeans</a>
                                        </div>
                                        {/* End .product-cat */}
                                        <h3 className="product-title">
                                            <a href="product.html">
                                                Blue utility pinafore denim dress
                                            </a>
                                        </h3>
                                        {/* End .product-title */}
                                        <div className="product-price">$76.00</div>
                                        {/* End .product-price */}
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: "20%" }} />
                                                {/* End .ratings-val */}
                                            </div>
                                            {/* End .ratings */}
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>
                                        {/* End .rating-container */}
                                    </div>
                                    {/* End .product-body */}
                                </div>
                            </SwiperSlide>
                        </Swiper>

                        {/* End .owl-carousel */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .page-content */}
            </main>
            {/* End .main */}
        </Wrapper>
    );
};

const Wrapper = styled.section`
  .form-control1 {
    height: 40px;
    padding: 0.85rem 2rem;
    font-size: 1.4rem;
    line-height: 1.5;
    font-weight: 300;
    color: #777;
    background-color: #fafafa;
    border: 1px solid #ebebeb;
    border-radius: 0;
    transition: all 0.3s;
    box-shadow: none;
  }

  .buttonStyle {
    width: 150px;
    height: 40px;
    color: #a6c76c;
    font-weight: bold;
    font-family: "Poppins";
    border: 1px solid #a6c76c;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    text-transform: capitalize;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    &:hover,
    &:active {
      background-color: #a6c76c;
      border: none;
      color: white;
      cursor: pointer;
      transform: scale(0.96);
    }
  }

  .btn-product:hover span .btn-wishlist:focus span,
  .btn-compare:focus span {
    color: #a6c76c;
    &:hover,
    &:active {
      color: #a6c76c;
    }
  }
  .productReviewStyle {
    width: 100%;
    height: auto;
    border: 1px #eee solid;
    padding-left: 10px;
    padding-top: 10px;
    background-color: white;
  }
  .help-block {
    display: block;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #737373;
    margin-top: 0px;
  }
  .writeReviewStyle {
    border: 1px #eee solid;
    padding: 15px;
    margin-bottom: 15px;
  }
  .reviewButton {
    position: absolute;
    left: auto;
    right: 140px;
  }
`;

export default ProductDetail;
