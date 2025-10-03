/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import styled1 from 'styled-components'
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';


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


const ProductFilter1 = () => {
    const [priceRange, setPriceRange] = useState([20, 40]);

    const handlePriceRange = (event, newValue) => {
        setPriceRange(newValue)
        console.log(newValue)
    }

    return (
        <aside className="col-lg-3 order-lg-first">
            <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                    <label>Filters:</label>
                    <a href="#" className="sidebar-filter-clear">
                        Clean All
                    </a>
                </div>
                {/* End .widget widget-clean */}
                <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                        <a
                            data-toggle="collapse"
                            href="#widget-1"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-1"
                        >
                            Category
                        </a>
                    </h3>
                    {/* End .widget-title */}
                    <div className="collapse show" id="widget-1">
                        <div className="widget-body">
                            <div className="filter-items filter-items-count">
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cat-1"
                                        />
                                        <label className="custom-control-label" htmlFor="cat-1">
                                            Dresses
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    <span className="item-count">3</span>
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cat-2"
                                        />
                                        <label className="custom-control-label" htmlFor="cat-2">
                                            T-shirts
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    <span className="item-count">0</span>
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cat-3"
                                        />
                                        <label className="custom-control-label" htmlFor="cat-3">
                                            Bags
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    <span className="item-count">4</span>
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cat-4"
                                        />
                                        <label className="custom-control-label" htmlFor="cat-4">
                                            Jackets
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    <span className="item-count">2</span>
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cat-5"
                                        />
                                        <label className="custom-control-label" htmlFor="cat-5">
                                            Shoes
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    <span className="item-count">2</span>
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cat-6"
                                        />
                                        <label className="custom-control-label" htmlFor="cat-6">
                                            Jumpers
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    <span className="item-count">1</span>
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cat-7"
                                        />
                                        <label className="custom-control-label" htmlFor="cat-7">
                                            Jeans
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    <span className="item-count">1</span>
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="cat-8"
                                        />
                                        <label className="custom-control-label" htmlFor="cat-8">
                                            Sportwear
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    <span className="item-count">0</span>
                                </div>
                                {/* End .filter-item */}
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
                        <a
                            data-toggle="collapse"
                            href="#widget-2"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-2"
                        >
                            Size
                        </a>
                    </h3>
                    {/* End .widget-title */}
                    <div className="collapse show" id="widget-2">
                        <div className="widget-body">
                            <div className="filter-items">
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="size-1"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="size-1"
                                        >
                                            XS
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="size-2"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="size-2"
                                        >
                                            S
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            defaultChecked=""
                                            id="size-3"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="size-3"
                                        >
                                            M
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            defaultChecked=""
                                            id="size-4"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="size-4"
                                        >
                                            L
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="size-5"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="size-5"
                                        >
                                            XL
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="size-6"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="size-6"
                                        >
                                            XXL
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
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
                        <a
                            data-toggle="collapse"
                            href="#widget-3"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-3"
                        >
                            Colour
                        </a>
                    </h3>
                    {/* End .widget-title */}
                    <div className="collapse show" id="widget-3">
                        <div className="widget-body">
                            <div className="filter-colors">
                                <a href="#" style={{ background: "#b87145" }}>
                                    <span className="sr-only">Color Name</span>
                                </a>
                                <a href="#" style={{ background: "#f0c04a" }}>
                                    <span className="sr-only">Color Name</span>
                                </a>
                                <a href="#" style={{ background: "#333333" }}>
                                    <span className="sr-only">Color Name</span>
                                </a>
                                <a
                                    href="#"
                                    className="selected"
                                    style={{ background: "#cc3333" }}
                                >
                                    <span className="sr-only">Color Name</span>
                                </a>
                                <a href="#" style={{ background: "#3399cc" }}>
                                    <span className="sr-only">Color Name</span>
                                </a>
                                <a href="#" style={{ background: "#669933" }}>
                                    <span className="sr-only">Color Name</span>
                                </a>
                                <a href="#" style={{ background: "#f2719c" }}>
                                    <span className="sr-only">Color Name</span>
                                </a>
                                <a href="#" style={{ background: "#ebebeb" }}>
                                    <span className="sr-only">Color Name</span>
                                </a>
                            </div>
                            {/* End .filter-colors */}
                        </div>
                        {/* End .widget-body */}
                    </div>
                    {/* End .collapse */}
                </div>
                {/* End .widget */}
                <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                        <a
                            data-toggle="collapse"
                            href="#widget-4"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-4"
                        >
                            Brand
                        </a>
                    </h3>
                    {/* End .widget-title */}
                    <div className="collapse show" id="widget-4">
                        <div className="widget-body">
                            <div className="filter-items">
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="brand-1"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="brand-1"
                                        >
                                            Next
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="brand-2"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="brand-2"
                                        >
                                            River Island
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="brand-3"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="brand-3"
                                        >
                                            Geox
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="brand-4"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="brand-4"
                                        >
                                            New Balance
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="brand-5"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="brand-5"
                                        >
                                            UGG
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="brand-6"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="brand-6"
                                        >
                                            F&amp;F
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="brand-7"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="brand-7"
                                        >
                                            Nike
                                        </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                </div>
                                {/* End .filter-item */}
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
                        <a
                            data-toggle="collapse"
                            href="#widget-5"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-5"
                        >
                            Price
                        </a>
                    </h3>
                    {/* End .widget-title */}
                    <div className="collapse show" id="widget-5">
                        <div className="widget-body">
                            <div className="filter-price">
                                <div className="filter-price-text">
                                    Price Range:
                                    <span id="filter-price-range" />
                                </div>
                                <div className='price-slider'>
                                    <AirbnbSlider
                                        slots={{ thumb: AirbnbThumbComponent }}
                                        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                                        valueLabelDisplay='auto'
                                        value={priceRange}
                                        onChange={handlePriceRange}
                                    />
                                </div>
                            </div>
                            {/* End .filter-price */}
                        </div>
                        {/* End .widget-body */}
                    </div>
                    {/* End .collapse */}
                </div>
                {/* End .widget */}
            </div>
            {/* End .sidebar sidebar-shop */}
        </aside >
    )
}

const Wrapper = styled1.section`
.collapse{
visibility: visible;
}
`;

export default ProductFilter1