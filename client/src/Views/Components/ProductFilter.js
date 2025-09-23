/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
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
import { allCategory, allSubCategory } from '../../Utils/CustomList';
import { useDispatch, useSelector } from "react-redux"

import "../../index.css"
import { sortProduct } from '../../Database/Action/DashboardAction';

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


const ProductFilter = () => {
    const dispatch = useDispatch();
    const productViaPagination = useSelector((state) => state.DashboardReducer.productViaPagination);
    const filterProduct = useSelector((state) => state.DashboardReducer.filterProduct);
    const [tabState, setTabState] = useState({
        sort: true,
        category: true,
        priceState: true
    })
    const [selectSort, setSelectSort] = React.useState('a');
    const [priceRange, setPriceRange] = useState([20, 40]);
    const [categoryId, setCategoryId] = useState(2);

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
        setPriceRange(newValue)
    }

    const hnadleSortValue = (event) => {
        setSelectSort(event.target.value);
        dispatch(sortProduct({ title: event.target.value, productList: productViaPagination }))
    };
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
                                                            <AccordionDetails onClick={() => alert(item.name)}>
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

                <hr />

                {/* End .widget */}
            </div>
            {/* End .sidebar sidebar-shop */}
        </aside >
    )
}

export default ProductFilter