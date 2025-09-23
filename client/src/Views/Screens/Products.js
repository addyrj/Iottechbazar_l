/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import headerBg from "../../Assets/images/page-header-bg.jpg";
import ListProduct from "../Components/ListProduct";
import TwoColumnProduct from "../Components/TwoColumnProduct";
import ThreeColProduct from "../Components/ThreeColProduct";
import FourColProduct from "../Components/FourColProduct";
import { allCategory, allSubCategory, paginationList, productList } from "../../Utils/CustomList";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, productFilter, setProductViaPagination, sortProduct } from "../../Database/Action/DashboardAction";
import ReactPaginate from 'react-paginate';

import "../../index.css"

import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));

function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
};

const Products = () => {
    const dispatch = useDispatch();
    const [productView, setProductView] = useState("3cv");
    const [itemPerPage, setItemPerPage] = useState(12);
    const filterProduct = useSelector((state) => state.DashboardReducer.filterProduct);
    const productViaPagination = useSelector((state) => state.DashboardReducer.productViaPagination);
    const allProducts = useSelector((state) => state.DashboardReducer.allProducts);
    const [tabState, setTabState] = useState({
        sort: true,
        category: true,
        priceState: true
    })
    const [selectSort, setSelectSort] = React.useState('a');
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [categoryId, setCategoryId] = useState(2);

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = allProducts?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allProducts.length / itemPerPage);

    const handlePageChange = (event) => {
        const newOffset = (event.selected * itemPerPage) % allProducts.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const subCatList = allSubCategory[0].subCategory.filter((item) => {
        return item.category_id === categoryId
    });

    const controlProps = (item) => ({
        checked: selectSort === item,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    const handlePriceRange = (event, newValue) => {
        setPriceRange(newValue);
        dispatch(productFilter({ title: "priceRange", productList: currentItems, minPrice: newValue[0], maxPrice: newValue[1] }))
    }

    const hnadleSortValue = (event) => {
        setSelectSort(event.target.value);
        dispatch(sortProduct({ title: event.target.value, productList: currentItems }))
    };

    useEffect(() => {
        dispatch(setProductViaPagination(currentItems));
    }, [itemPerPage, itemOffset])

    useEffect(() => {
        dispatch(getAllProduct());
    }, [])

    return (
        <main className="main" style={{ backgroundColor: "#F5F5F5" }}>
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
                                            filterProduct.length !== 0 ? filterProduct?.map((item) => {
                                                const randomNumber = Math.floor(Math.random() * 9);
                                                return (
                                                    <ListProduct
                                                        {...item.id}
                                                        {...item}
                                                        randomNumber={randomNumber}
                                                    />
                                                )
                                            }) : currentItems?.map((item) => {
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
                                                filterProduct.length !== 0 ? filterProduct?.map((item) => {
                                                    const randomNumber = Math.floor(Math.random() * 9);
                                                    return (
                                                        <TwoColumnProduct
                                                            {...item.id}
                                                            {...item}
                                                            randomNumber={randomNumber}
                                                        />
                                                    )
                                                }) : currentItems?.map((item) => {
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
                                                filterProduct.length !== 0 ? filterProduct?.map((item) => {
                                                    const randomNumber = Math.floor(Math.random() * 9);
                                                    return (
                                                        <ThreeColProduct
                                                            {...item.id}
                                                            {...item}
                                                            randomNumber={randomNumber}
                                                        />
                                                    )
                                                }) : currentItems?.map((item) => {
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
                                                filterProduct.length !== 0 ? filterProduct?.map((item) => {
                                                    const randomNumber = Math.floor(Math.random() * 9);
                                                    return (
                                                        <FourColProduct
                                                            {...item.id}
                                                            {...item}
                                                            randomNumber={randomNumber}
                                                        />
                                                    )
                                                }) : currentItems?.map((item) => {
                                                    const randomNumber = Math.floor(Math.random() * 9);
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
                                            filterProduct.length !== 0 ? filterProduct?.map((item) => {
                                                const randomNumber = Math.floor(Math.random() * 9);
                                                return (
                                                    <ListProduct
                                                        {...item.id}
                                                        {...item}
                                                        randomNumber={randomNumber}
                                                    />
                                                )
                                            }) : currentItems?.map((item) => {
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
                                )
                            }

                            {/* pagination */}
                            <div className='pagination'>
                                <ReactPaginate
                                    previousLabel="Previous"
                                    nextLabel="Next"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageChange}
                                    containerClassName="pagination"
                                    activeClassName="active"
                                />
                            </div>
                        </div>

                        {/* product filter section */}
                        <aside className="col-lg-3 order-lg-first">
                            <div className="sidebar sidebar-shop">
                                <div className="widget widget-clean">
                                    <label>Filters:</label>
                                    <a onClick={() => dispatch(productFilter({ title: "clear_all", productList: productViaPagination, name: "" }))} className="sidebar-filter-clear">
                                        Clean All
                                    </a>
                                </div>
                                {/* End .widget widget-clean */}
                                <div className="widget widget-collapsible">
                                    <h3 className="widget-title" onClick={() => tabState.sort === true ? setTabState({ ...tabState, sort: false }) : setTabState({ ...tabState, sort: true })}>
                                        <a role="button" className={tabState.sort === true ? "" : "collapsed"}> Sort</a>
                                    </h3>
                                    {/* End .widget-title */}
                                    <div className={tabState.sort === true ? "collapse show" : "collapse"} id="widget-2">
                                        <div className="widget-body">
                                            <div className="filter-items">
                                                <FormControl>
                                                    <RadioGroup
                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                        name="controlled-radio-buttons-group"
                                                        onChange={hnadleSortValue}
                                                        value={selectSort}
                                                    >
                                                        <FormControlLabel value="female" control={<Radio
                                                            {...controlProps('a')}
                                                            sx={{
                                                                color: blue[600],
                                                                '& .MuiSvgIcon-root': {
                                                                    fontSize: 24,
                                                                },
                                                                '&.Mui-checked': {
                                                                    color: '#a6c76c',
                                                                }
                                                            }}
                                                        />} label={<p style={{ fontWeight: "500", }}>Default</p>} />

                                                        <FormControlLabel value="male" control={<Radio
                                                            {...controlProps('b')}
                                                            sx={{
                                                                color: blue[600],
                                                                '& .MuiSvgIcon-root': {
                                                                    fontSize: 22,
                                                                },
                                                                '&.Mui-checked': {
                                                                    color: '#a6c76c',
                                                                },
                                                            }}
                                                        />} label={<p style={{ fontWeight: "500", }}>Name (A-Z)</p>} />

                                                        <FormControlLabel value="male" control={<Radio
                                                            {...controlProps('c')}
                                                            sx={{
                                                                color: blue[600],
                                                                '& .MuiSvgIcon-root': {
                                                                    fontSize: 22,
                                                                },
                                                                '&.Mui-checked': {
                                                                    color: '#a6c76c',
                                                                },
                                                            }}
                                                        // Name (Z-A)
                                                        />} label={<p style={{ fontWeight: "500", }}>Name (Z-A)</p>} />

                                                        <FormControlLabel value="male" control={<Radio
                                                            {...controlProps('d')}
                                                            sx={{
                                                                color: blue[600],
                                                                '& .MuiSvgIcon-root': {
                                                                    fontSize: 22,
                                                                },
                                                                '&.Mui-checked': {
                                                                    color: '#a6c76c',
                                                                },
                                                            }}
                                                        // Price (Low-High)
                                                        />} label={<p style={{ fontWeight: "500", }}>Price (Low-High)</p>} />

                                                        <FormControlLabel value="male" control={<Radio
                                                            {...controlProps('e')}
                                                            sx={{
                                                                color: blue[600],
                                                                '& .MuiSvgIcon-root': {
                                                                    fontSize: 22,
                                                                },
                                                                '&.Mui-checked': {
                                                                    color: '#a6c76c',
                                                                },
                                                            }}
                                                        // Price (High-Low)
                                                        />} label={<p style={{ fontWeight: "500", }}>Price (High-Low)</p>} />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            {/* End .filter-items */}
                                        </div>
                                        {/* End .widget-body */}
                                    </div>
                                    {/* End .collapse */}
                                </div>

                                {/* End .widget */}
                                <div className="widget widget-collapsible">
                                    <h3 className="widget-title">
                                        <a role="button" onClick={() => tabState.category === true ? setTabState({ ...tabState, category: false }) : setTabState({ ...tabState, category: true })}
                                            className={tabState.category === true ? "" : "collapsed"}>
                                            Category
                                        </a>
                                    </h3>
                                    {/* End .widget-title */}
                                    <div className={tabState.category === true ? "collapse show" : "collapse"} id="widget-1">
                                        <div className="widget-body">
                                            {/* filter-items filter-items-count */}
                                            <div className='filter-items filter-items-count'>
                                                <div className="filter-item">
                                                    {allCategory[0].categoryData?.map((currElem) => {
                                                        return (
                                                            <div>
                                                                <Accordion
                                                                    elevation={0}
                                                                    sx={{ "& .MuiPaper-root-MuiAccordion-root": { boxShadow: "none" } }}
                                                                    onChange={() => setCategoryId(currElem.id)}>
                                                                    <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls="panel1-content"
                                                                        id="panel1-header">
                                                                        {currElem.name}
                                                                    </AccordionSummary>
                                                                    {subCatList.map((item) => {
                                                                        return (
                                                                            <AccordionDetails sx={{ cursor: "pointer" }} onClick={() => dispatch(productFilter({ title: "sub-category", productList: currentItems, name: item.name }))}>
                                                                                {item.name}
                                                                            </AccordionDetails>
                                                                        )
                                                                    })}
                                                                </Accordion>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            {/* End .filter-items */}
                                        </div>
                                        {/* End .widget-body */}
                                    </div>
                                    {/* End .collapse */}
                                </div>

                                {/* End .widget */}
                                <div className="widget widget-collapsible">
                                    <h3 className="widget-title">
                                        <a role="button" onClick={() => tabState.priceState === true ? setTabState({ ...tabState, priceState: false }) : setTabState({ ...tabState, priceState: true })}
                                            className={tabState.priceState === true ? "" : "collapsed"}>
                                            Price
                                        </a>
                                    </h3>
                                    {/* End .widget-title */}
                                    <div className={tabState.priceState === true ? "collapse show" : "collapse"} id="widget-5">
                                        <div className="widget-body">
                                            <div className="filter-price">
                                                <div className="filter-price-text">
                                                    Price Range:
                                                    <span id="filter-price-range" />
                                                </div>
                                                <div className='price-slider'>
                                                    <AirbnbSlider
                                                        slots={{ thumb: AirbnbThumbComponent }}
                                                        getAriaLabel={(index) => (index === 0 ? '0' : '10000')}
                                                        valueLabelDisplay='auto'
                                                        value={priceRange}
                                                        onChange={handlePriceRange}
                                                        min={0}
                                                        max={10000}
                                                    />
                                                </div>
                                            </div>
                                            {/* End .filter-price */}
                                        </div>
                                        {/* End .widget-body */}
                                    </div>
                                    {/* End .collapse */}
                                </div>

                                <hr />

                                {/* End .widget */}
                            </div>
                            {/* End .sidebar sidebar-shop */}
                        </aside >
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Products;
