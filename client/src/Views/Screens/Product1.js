/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import ProductFilter from "../Components/ProductFilter";
import Pagination from "../Components/Pagination";
import headerBg from "../../Assets/images/page-header-bg.jpg";
import ListProduct from "../Components/ListProduct";
import TwoColumnProduct from "../Components/TwoColumnProduct";
import ThreeColProduct from "../Components/ThreeColProduct";
import FourColProduct from "../Components/FourColProduct";
import { paginationList, productList } from "../../Utils/CustomList";
import { useSelector } from "react-redux";

const Product1 = () => {
    const [productView, setProductView] = useState("3cv");
    const [itemPerPage, setItemPerPage] = useState(10);
    const filterProduct = useSelector(
        (state) => state.DashboardReducer.filterProduct
    );

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: `url(${headerBg})` }}
            >
                <div className="container">
                    <h1 className="page-title">Products</h1>
                </div>
                {/* End .container */}
            </div>
            {/* End .page-header */}
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#">Shop</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            List
                        </li>
                    </ol>
                </div>
                {/* End .container */}
            </nav>
            {/* End .breadcrumb-nav */}
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="toolbox">
                                <div className="toolbox-left">
                                    <div className="toolbox-info">
                                        Showing <span>{itemPerPage} of {productList.length}</span> Products
                                    </div>
                                    {/* End .toolbox-info */}
                                </div>
                                {/* End .toolbox-left */}
                                <div className="toolbox-right">
                                    <div className="toolbox-sort">
                                        <label htmlFor="sortby">Show:</label>
                                        <div className="select-custom">
                                            <select
                                                name="sortby"
                                                id="sortby"
                                                className="form-control"
                                                onChange={(e) => setItemPerPage(e.target.value)}
                                            >
                                                {paginationList?.map((item, index) => {
                                                    return (
                                                        <option value={item.value}>{item.value}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    {/* End .toolbox-sort */}
                                    <div className="toolbox-layout">
                                        <a
                                            href="#"
                                            className={
                                                productView === "lv"
                                                    ? "btn-layout active"
                                                    : "btn-layout"
                                            }
                                            onClick={() => setProductView("lv")}
                                        >
                                            <svg width={16} height={10}>
                                                <rect x={0} y={0} width={4} height={4} />
                                                <rect x={6} y={0} width={10} height={4} />
                                                <rect x={0} y={6} width={4} height={4} />
                                                <rect x={6} y={6} width={10} height={4} />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className={
                                                productView === "2cv"
                                                    ? "btn-layout active"
                                                    : "btn-layout"
                                            }
                                            onClick={() => setProductView("2cv")}
                                        >
                                            <svg width={10} height={10}>
                                                <rect x={0} y={0} width={4} height={4} />
                                                <rect x={6} y={0} width={4} height={4} />
                                                <rect x={0} y={6} width={4} height={4} />
                                                <rect x={6} y={6} width={4} height={4} />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className={
                                                productView === "3cv"
                                                    ? "btn-layout active"
                                                    : "btn-layout"
                                            }
                                            onClick={() => setProductView("3cv")}
                                        >
                                            <svg width={16} height={10}>
                                                <rect x={0} y={0} width={4} height={4} />
                                                <rect x={6} y={0} width={4} height={4} />
                                                <rect x={12} y={0} width={4} height={4} />
                                                <rect x={0} y={6} width={4} height={4} />
                                                <rect x={6} y={6} width={4} height={4} />
                                                <rect x={12} y={6} width={4} height={4} />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className={
                                                productView === "4cv"
                                                    ? "btn-layout active"
                                                    : "btn-layout"
                                            }
                                            onClick={() => setProductView("4cv")}
                                        >
                                            <svg width={22} height={10}>
                                                <rect x={0} y={0} width={4} height={4} />
                                                <rect x={6} y={0} width={4} height={4} />
                                                <rect x={12} y={0} width={4} height={4} />
                                                <rect x={18} y={0} width={4} height={4} />
                                                <rect x={0} y={6} width={4} height={4} />
                                                <rect x={6} y={6} width={4} height={4} />
                                                <rect x={12} y={6} width={4} height={4} />
                                                <rect x={18} y={6} width={4} height={4} />
                                            </svg>
                                        </a>
                                    </div>
                                    {/* End .toolbox-layout */}
                                </div>
                                {/* End .toolbox-right */}
                            </div>

                            {/* product section */}

                            {
                                productView === "lv" ? (
                                    <div className="products mb-3">
                                        {
                                            filterProduct?.map((item) => {
                                                const randomNumber = Math.floor(Math.random() * 9);
                                                return (
                                                    <ListProduct
                                                        {...item.id}
                                                        {...item}
                                                        randomNumber={randomNumber}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                ) : productView === "2cv" ? (
                                    <div className="products mb-3">
                                        <div className="row justify-content-center">
                                            {
                                                filterProduct?.map((item) => {
                                                    const randomNumber = Math.floor(Math.random() * 9);
                                                    return (
                                                        <TwoColumnProduct
                                                            {...item.id}
                                                            {...item}
                                                            randomNumber={randomNumber}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                ) : productView === "3cv" ? (
                                    <div className="products mb-3">
                                        <div className="row justify-content-center">
                                            {
                                                filterProduct?.map((item) => {
                                                    const randomNumber = Math.floor(Math.random() * 9);
                                                    return (
                                                        <ThreeColProduct
                                                            {...item.id}
                                                            {...item}
                                                            randomNumber={randomNumber}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                ) : productView === "4cv" ? (
                                    <div className="products mb-3">
                                        <div className="row justify-content-center">
                                            {
                                                filterProduct?.map((item) => {
                                                    const randomNumber = Math.floor(Math.random() * 22);
                                                    return (
                                                        <FourColProduct
                                                            {...item.id}
                                                            {...item}
                                                            randomNumber={randomNumber}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className="products mb-3">
                                        {
                                            filterProduct?.map((item) => {
                                                const randomNumber = Math.floor(Math.random() * 22);
                                                return (
                                                    <ListProduct
                                                        {...item.id}
                                                        {...item}
                                                        randomNumber={randomNumber}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }

                            {/* pagination */}
                            <Pagination itemPerPage={itemPerPage} />
                        </div>

                        {/* product filter section */}
                        <ProductFilter />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Product1;
