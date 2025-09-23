import React, { useEffect, useState } from 'react'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";

import "../../Styles/crousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

import {
    Autoplay,
    Pagination,
    Navigation,
} from "swiper/modules";
import Product from './ProductCrousalItem';
import { useSelector } from 'react-redux';
import $ from "jquery"

const ProductCrousal = () => {
    const tab2 = useSelector((state) => state.DashboardReducer.tabSpeProductState);
    const allProduct = useSelector((state) => state.DashboardReducer.allCategorizedProduct);


    const [product, setProduct] = useState([]);

    const getAllProduct = async (tab1) => {
        if (tab1 === 1) {
            setProduct(allProduct?.schholProject)
        } else {
            setProduct(allProduct?.specials)
        }
    }


    $(document).ready(function () {
        getAllProduct(tab2)
    });

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={10}
            navigation={{
                enabled: true,
                prevEl: ".product-special-swiper-button-prev",
                nextEl: ".product-special-swiper-button-next"
            }}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                0: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },
                420: {
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
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
        >
            {product?.map((currElem, index) => {
                return (
                    <SwiperSlide>
                        <Product
                            {...currElem.id}
                            {...currElem}
                            border={true}
                        />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    )
}

export default ProductCrousal