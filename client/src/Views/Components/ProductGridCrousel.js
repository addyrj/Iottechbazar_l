import React, { useEffect, useState } from 'react'
// Import Swiper styles
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
    Grid,
} from "swiper/modules";
// import { allProduct } from '../../Utils/CustomList';
import Product from './ProductCrousalItem';
import { useSelector } from "react-redux"
import $ from "jquery"

const ProductGridCrousel = () => {
    const tab1 = useSelector((state) => state.DashboardReducer.tabHeaderState);
    const allProduct = useSelector((state) => state.DashboardReducer.allCategorizedProduct);

    const [product, setProduct] = useState(allProduct?.trending);

    const getAllProduct = async (tab1) => {
        if (tab1 === undefined) {
            const trending = allProduct?.trending;
            setProduct(trending)
        } else if (tab1 === 1) {
            const trending = allProduct?.trending;
            setProduct(trending)
        } else if (tab1 === 2) {
            const onSale = allProduct?.onSale;
            setProduct(onSale)
        } else {
            const commingSoon = allProduct?.commingSoon;
            setProduct(commingSoon)
        }
    }

    $(document).ready(function () {
        getAllProduct(tab1)
    });

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={10}
            navigation={{
                enabled: true,
                prevEl: ".product-swiper-button-prev",
                nextEl: ".product-swiper-button-next"
            }}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            grid={tab1 === 1
                ? allProduct?.trending?.length > 5
                    ? { rows: 2 }
                    : { rows: 1 }
                : tab1 === 2
                    ? allProduct?.onSale?.length > 5
                        ? { rows: 2 }
                        : { rows: 1 }
                    : allProduct?.commingSoon?.length > 5
                        ? { rows: 2 }
                        : { rows: 1 }
            }
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                420: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            }}
            modules={[Navigation, Pagination, Grid]}
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

export default ProductGridCrousel