/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import noImage from "../../Assets/img/no_image.png";
import ReactQuill from "react-quill";
import "../../../../../node_modules/react-quill/dist/quill.snow.css";
import { quilToolbarOption } from "../../Constants/Constant";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllSubCategoryData,
    getCategoryData,
    getAttributeData,
    getAllFamilyAttribute,
    getColorVarinat,
    setLoder,
    getProductTitiles,
} from "../../../../Database/Action/AdminAction";
import isEmpty from "lodash.isempty";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getExcludeCalculator,
    getIncludeCalculator,
} from "../../Javascript/GstCalculator";
import { postHeaderWithToken } from "../../../../Database/Utils";

const AdminAddProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        id,
        slug,
        name,
        hsnCode,
        poductSku,
        model,
        productPrice,
        productSpecialPrice,
        discountType,
        description,
        offer,
        discount,
        basePrice,
        stock,
        primaryImage,
        status,
        categorySlug,
        categoryName,
        subCategorySlug,
        subCategoryName,
        createdBy,
        subScript,
        secondaryImage,
        specification,
        manufacturer,
        warrantyState,
        warranty,
        trending,
        onsale,
        commingsoon,
        schoolproject,
        special,
        rating,
        review,
    } = location.state || {};
    const selectGst = ["Select Gst", "Include", "Exclude"];
    const selectDiscountType = ["Select Discount Type", "Percentage", "Value"];
    const dispatch = useDispatch();
    const categoryData = useSelector((state) => state.AdminReducer.categoryData);
    const allSubCategoryData = useSelector(
        (state) => state.AdminReducer.allSubCategoryData
    );
    const attributeData = useSelector(
        (state) => state.AdminReducer.attributeData
    );
    const allFamilyAttribute = useSelector(
        (state) => state.AdminReducer.allFamilyAttribute
    );
    const colorVariant = useSelector((state) => state.AdminReducer.colorVariant);
    const productTitles = useSelector(
        (state) => state.AdminReducer.productTitles
    );
    const [subCatData, setSubCataData] = useState([
        { name: "Select Sub-Category" },
    ]);
    const [atriFamilyData, setAtriFamilyData] = useState([
        { name: "Select Attribute Family" },
    ]);
    const [multipleSelect, setMultipleSelect] = useState(0);

    const module = {
        toolbar: quilToolbarOption,
    };

    const getCategoryList = () => {
        let newVal = [{ name: "Select Category..." }, ...categoryData];
        return newVal;
    };

    const getColorList = () => {
        let newVal = [{ name: "Select Color..." }, ...colorVariant];
        return newVal;
    };

    const getAttributeList = () => {
        let newVal = [{ name: "Select Attribute..." }, ...attributeData];
        return newVal;
    };

    const categoryList = getCategoryList();
    const colorList = getColorList();
    const attributeList = getAttributeList();

    const [productInfo, setProductInfo] = useState({
        productName: "",
        subScript: "",
        hsnCode: "",
        productSku: "",
        model: "",
        productPrice: "",
        specialPrice: "",
        gstRate: "",
        basePrice: "",
        discount: "",
        stock: "",
        metaTag: "",
        flipLink: "",
        amazonLink: "",
        meeshoLink: "",
        productDesc: "",
        productSpec: "",
        productOffer: "",
        productWarranty: "",
        productManufacturer: "",
        colorVarinat: "",
        category: "",
        subCategory: "",
        attribute: "",
        attributeFamily: "",
        gst: "",
        discountType: "",
        avatar: {},
        secondaryImage: [],
        productSectionValue: [],
        url: location.pathname,
    });

    const getSubCategoryData = (categorySlug) => {
        console.log(categorySlug);
        setProductInfo({ ...productInfo, category: categorySlug });
        const filterArray = allSubCategoryData.filter((item) => {
            return item.categorySlug === categorySlug;
        });
        if (filterArray.length !== 0) {
            setSubCataData([{ name: "Select Sub-Category" }].concat(filterArray));
        } else {
            setSubCataData([{ name: "Select Sub-Category" }]);
        }
    };

    const getAttributeFamily = (attributeSlug) => {
        setProductInfo({ ...productInfo, attribute: attributeSlug });
        const filterArray = allFamilyAttribute.filter((item) => {
            return item.attributeSlug === attributeSlug;
        });
        if (filterArray.length !== 0) {
            setAtriFamilyData(
                [{ name: "Select Attribute Family" }].concat(filterArray)
            );
        } else {
            setAtriFamilyData([{ name: "Select Attribute Family" }]);
        }
    };

    // Fixed: Remove section by slug instead of index
    const removeSection = (slug) => {
        setProductInfo((prev) => ({
            ...prev,
            productSectionValue: prev.productSectionValue.filter(
                (item) => item.slug !== slug
            ),
        }));
    };
    const getDiscount = (value) => {
        if (value === "Percentage") {
            let discount =
                ((parseFloat(productInfo.productPrice) -
                    parseFloat(productInfo.specialPrice)) *
                    100) /
                parseFloat(productInfo.productPrice);
            setProductInfo({
                ...productInfo,
                discount: discount,
                discountType: value,
            });
        } else if (value === "Value") {
            let discount =
                parseFloat(productInfo.productPrice) -
                parseFloat(productInfo.specialPrice);
            setProductInfo({
                ...productInfo,
                discount: discount,
                discountType: value,
            });
        } else {
            setProductInfo({ ...productInfo, discount: "", discountType: "" });
        }
    };

    const getBasePrice = (value) => {
        if (value === "Include") {
            const basePrice = getIncludeCalculator({
                tax_rate: productInfo.gstRate,
                amount: parseFloat(productInfo.specialPrice),
            });

            console.log("base price is    ", basePrice);

            setProductInfo({
                ...productInfo,
                basePrice: Math.round(basePrice),
                gst: value,
            });
        } else if (value === "Exclude") {
            const basePrice = getExcludeCalculator({
                tax_rate: productInfo.gstRate,
                amount: parseFloat(productInfo.specialPrice),
            });
            setProductInfo({
                ...productInfo,
                basePrice: Math.round(basePrice),
                gst: value,
            });
        } else {
            setProductInfo({ ...productInfo, basePrice: "", gst: "" });
        }
    };

    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setProductInfo((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleChangeMultiple = (value) => {
        // Check if the section already exists
        const alreadyExists = productInfo.productSectionValue.some(
            item => item.slug === value[0].slug
        );

        if (!alreadyExists) {
            setProductInfo(prev => ({
                ...prev,
                productSectionValue: [...prev.productSectionValue, ...value]
            }));
        } else {
            toast.error("This section is already added");
        }

        // Close the dropdown after selection
        setMultipleSelect(0);
    };
    const createProduct = () => {
        if (isEmpty(productInfo.productName)) {
            toast.error("Failed! Product name not found");
        } else if (isEmpty(productInfo.subScript)) {
            toast.error("Failed! Product sub-script not found");
        } else if (isEmpty(productInfo.productPrice)) {
            toast.error("Failed! Product price not found");
        } else if (isEmpty(productInfo.specialPrice)) {
            toast.error("Failed! Product special price not found");
        } else if (productInfo.basePrice === "") {
            toast.error("Failed! Product base price not found");
        } else if (productInfo.discount === "") {
            toast.error("Failed! Discount is not found");
        } else if (isEmpty(productInfo.gstRate)) {
            toast.error("Failed! Gst Rate not found");
        } else if (productInfo.gst === "") {
            toast.error("Failed! Gst not found");
        } else if (productInfo.stock === "") {
            toast.error("Failed! Product stock not found");
        } else if (isEmpty(productInfo.category)) {
            toast.error("Failed! Category not found");
        } else if (isEmpty(productInfo.subCategory)) {
            toast.error("Failed! Sub-Category not found");
        } else if (isEmpty(productInfo.discountType)) {
            toast.error("Failed! Discount type not found");
        } else if (productInfo.productSectionValue.length === 0) {
            toast.error("Failed! Please select product section");
        } else {
            dispatch(setLoder(true));
            axios
                .post(
                    process.env.REACT_APP_BASE_URL + "addProduct",
                    productInfo,
                    postHeaderWithToken
                )
                .then((response) => {
                    if (response.data.status === 200) {
                        dispatch(setLoder(false));
                        navigate("/admin_product");
                        toast.success(response.data.message);
                    }
                })
                .catch((error) => {
                    dispatch(setLoder(false));
                    console.log("error is   ", error);
                    toast.error(error?.response?.data?.message || error.message);
                });
        }
    };

    const updateProduct = () => { };

    useEffect(() => {

    }, [])

    useEffect(() => {
        dispatch(getCategoryData({ navigate: navigate }));
        dispatch(getAllSubCategoryData({ navigate: navigate }));
        dispatch(getAttributeData({ navigate: navigate }));
        dispatch(getAllFamilyAttribute({ navigate: navigate }));
        dispatch(getColorVarinat({ navigate: navigate }));
        dispatch(getProductTitiles({ navigate: navigate }));
    }, [dispatch]);

    return (
        <Wrapper>
            {slug === undefined ?
                // create new product
                <section className="content">
                    <div className="container-fluid">
                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product Titles</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="productName">Product Name*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="productName"
                                                        name="productName"
                                                        placeholder="Enter Product Name"
                                                        value={productInfo.productName}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">
                                                        Sub-Script*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="subScript"
                                                        name="subScript"
                                                        placeholder="Enter Sub Script"
                                                        value={productInfo.subScript}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">
                                                        Product Sku*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="productSku"
                                                        name="productSku"
                                                        placeholder="Enter Product Sku"
                                                        value={productInfo.productSku}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Model*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="model"
                                                        name="model"
                                                        placeholder="Enter Model"
                                                        value={productInfo.model}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">HSN Code*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="hsnCode"
                                                        name="hsnCode"
                                                        placeholder="Enter HSN Code"
                                                        value={productInfo.hsnCode}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Product Sections</label>
                                                    <div className="form-control select2">
                                                        <div className="row">
                                                            <div className="col-11">
                                                                <ul
                                                                    style={{
                                                                        listStyleType: "none",
                                                                        margin: 0,
                                                                        padding: 0,
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        flexWrap: "wrap",
                                                                    }}
                                                                >
                                                                    {productInfo?.productSectionValue?.map((currElem) => (
                                                                        <li
                                                                            key={currElem.slug}
                                                                            style={{
                                                                                display: "inline-flex",
                                                                                alignItems: "center",
                                                                                backgroundColor: "#17a2b8",
                                                                                marginRight: "5px",
                                                                                marginBottom: "5px",
                                                                                padding: "5px",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "12px",
                                                                                    color: "white",
                                                                                }}
                                                                            >
                                                                                {currElem.name}
                                                                            </span>
                                                                            <i
                                                                                className="fa fa-times"
                                                                                style={{
                                                                                    color: "white",
                                                                                    fontSize: "10px",
                                                                                    marginLeft: "10px",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                onClick={() => removeSection(currElem.slug)}
                                                                            />
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className="col-1"
                                                                onClick={() =>
                                                                    setMultipleSelect(multipleSelect === 0 ? 1 : 0)
                                                                }
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                {multipleSelect === 0 ? (
                                                                    <i className="fa fa-chevron-down"></i>
                                                                ) : (
                                                                    <i className="fa fa-chevron-up"></i>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        multipleSelect === 1 ? "multipleSelectBoby" : "d-none"
                                                    }
                                                    style={{ width: "100%" }}
                                                >
                                                    <ul>
                                                        {productTitles?.map((item) => {
                                                            return (
                                                                <li
                                                                    key={item.slug}
                                                                    className="multiSelectLi"
                                                                    value={item.name}
                                                                    onClick={() =>
                                                                        handleChangeMultiple([
                                                                            { name: item.name, slug: item.slug },
                                                                        ])
                                                                    }
                                                                >
                                                                    <a>{item.name}</a>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Basic Information</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Product Color Variant*</label>
                                            <select
                                                className="form-control select2"
                                                style={{ width: "100%" }}
                                                onChange={(e) =>
                                                    setProductInfo({
                                                        ...productInfo,
                                                        colorVarinat: e.target.value,
                                                    })
                                                }
                                            >
                                                {colorList?.map((currElem, index) => {
                                                    return (
                                                        <option key={index} value={currElem.slug}>
                                                            {currElem.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Category*</label>
                                                    <select
                                                        className="form-control select2"
                                                        id="category"
                                                        name="category"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) => getSubCategoryData(e.target.value)}
                                                    >
                                                        {categoryList?.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem.slug}>
                                                                    {currElem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Sub-Category*</label>
                                                    <select
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) =>
                                                            setProductInfo({
                                                                ...productInfo,
                                                                subCategory: e.target.value,
                                                            })
                                                        }
                                                    >
                                                        {subCatData?.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem.slug}>
                                                                    {currElem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Attributes*</label>
                                                    <select
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) => getAttributeFamily(e.target.value)}
                                                    >
                                                        {attributeList?.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem.slug}>
                                                                    {currElem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Attributes Family*</label>
                                                    <select
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) =>
                                                            setProductInfo({
                                                                ...productInfo,
                                                                attributeFamily: e.target.value,
                                                            })
                                                        }
                                                    >
                                                        {atriFamilyData.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem.slug}>
                                                                    {currElem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product Details</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="productName">Product Price*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="productPrice"
                                                        name="productPrice"
                                                        placeholder="Enter Product Price"
                                                        value={productInfo.productPrice}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="specialPrice">
                                                        Product Special Price*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="specialPrice"
                                                        name="specialPrice"
                                                        placeholder="Enter Product Special Price"
                                                        value={productInfo.specialPrice}
                                                        onChange={(e) =>
                                                            productInfo.productPrice.length === 0
                                                                ? toast.error("Please enter product price")
                                                                : parseInt(productInfo.productPrice) <
                                                                    parseInt(e.target.value)
                                                                    ? toast.error(
                                                                        "Special price can not be grate than product price"
                                                                    ) |
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        specialPrice: "",
                                                                    })
                                                                    : setProductInfo({
                                                                        ...productInfo,
                                                                        specialPrice: e.target.value,
                                                                    })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="productHindiName">Gst Rate*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="gstRate"
                                                        name="gstRate"
                                                        placeholder="Enter Gst Rate"
                                                        value={productInfo.gstRate}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Gst*</label>
                                                    <select
                                                        disabled={productInfo.gstRate === "" ? true : false}
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) =>
                                                            isEmpty(productInfo.productPrice) ||
                                                                isEmpty(productInfo.specialPrice)
                                                                ? toast.error("Please enter valid product price")
                                                                : isEmpty(productInfo.gstRate)
                                                                    ? toast.error("Please enter gst rate")
                                                                    : getBasePrice(e.target.value)
                                                        }
                                                    >
                                                        {selectGst.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem}>
                                                                    {currElem}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Dsicount Type*</label>
                                                    <select
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) =>
                                                            isEmpty(productInfo.productPrice) ||
                                                                isEmpty(productInfo.specialPrice)
                                                                ? toast.error("Please enter valid product price")
                                                                : getDiscount(e.target.value)
                                                        }
                                                    >
                                                        {selectDiscountType.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem}>
                                                                    {currElem}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="basePrice">Discount*</label>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        className="form-control"
                                                        id="discount"
                                                        name="discount"
                                                        value={productInfo.discount}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="basePrice">Base Price*</label>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        className="form-control"
                                                        id="basePrice"
                                                        name="basePrice"
                                                        value={productInfo.basePrice}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="stock">Stock*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="stock"
                                                        name="stock"
                                                        placeholder="Enter Product Stock"
                                                        value={productInfo.stock}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="metaTag">Meta Tag Type*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="metaTag"
                                                        name="metaTag"
                                                        placeholder="Enter Meta Tag"
                                                        value={productInfo.metaTag}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product Items</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">
                                                        Product Primary Image*
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="primaryImage"
                                                                name="primaryImage"
                                                                onChange={(e) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        avatar: e.target.files[0],
                                                                    })
                                                                }
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="exampleInputFile"
                                                            >
                                                                Choose file
                                                            </label>
                                                        </div>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Upload</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div>
                                                        <img
                                                            src={
                                                                productInfo.avatar.name
                                                                    ? URL.createObjectURL(productInfo.avatar)
                                                                    : noImage
                                                            }
                                                            style={{
                                                                width: "120px",
                                                                height: "80px",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">
                                                        Product Secondary Image*
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input
                                                                type="file"
                                                                multiple="multiple"
                                                                className="custom-file-input"
                                                                id="secondaryImage"
                                                                name="secondaryImage"
                                                                onChange={(e) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        secondaryImage: e.target.files,
                                                                    })
                                                                }
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="exampleInputFile"
                                                            >
                                                                Choose file
                                                            </label>
                                                        </div>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Upload</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div>
                                                        <img
                                                            src={
                                                                productInfo.avatar.name
                                                                    ? URL.createObjectURL(productInfo.avatar)
                                                                    : noImage
                                                            }
                                                            style={{
                                                                width: "120px",
                                                                height: "80px",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="flipLink">Flipkart Link*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="flipLink"
                                                        name="flipLink"
                                                        placeholder="Enter Flipkart Link"
                                                        value={productInfo.flipLink}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="amazonLink">Amazon Link*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="amazonLink"
                                                        name="amazonLink"
                                                        placeholder="Enter Amazon Link"
                                                        value={productInfo.amazonLink}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="meeshoLink">Meesho Link*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="meeshoLink"
                                                name="meeshoLink"
                                                placeholder="Enter Messsho Link"
                                                value={productInfo.meeshoLink}
                                                onChange={handleInputChanges}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product Specification</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <section className="content">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card card-outline card-info">
                                                        <div className="card-header">
                                                            <h3
                                                                className="card-title"
                                                                style={{ fontWeight: "700" }}
                                                            >
                                                                Description*
                                                            </h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <ReactQuill
                                                                theme="snow"
                                                                value={productInfo.productDesc}
                                                                modules={module}
                                                                onChange={(value) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        productDesc: value,
                                                                    })
                                                                }
                                                            />
                                                            ;
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="card card-outline card-info">
                                                        <div className="card-header">
                                                            <h3
                                                                className="card-title"
                                                                style={{ fontWeight: "700" }}
                                                            >
                                                                Specification*
                                                            </h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <ReactQuill
                                                                theme="snow"
                                                                id="proSpec"
                                                                value={productInfo.productSpec}
                                                                modules={module}
                                                                onChange={(value) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        productSpec: value,
                                                                    })
                                                                }
                                                            />
                                                            ;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card card-outline card-info">
                                                        <div className="card-header">
                                                            <h3
                                                                className="card-title"
                                                                style={{ fontWeight: "700" }}
                                                            >
                                                                Offer*
                                                            </h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <ReactQuill
                                                                theme="snow"
                                                                id="proOffer"
                                                                value={productInfo.productOffer}
                                                                modules={module}
                                                                onChange={(value) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        productOffer: value,
                                                                    })
                                                                }
                                                            />
                                                            ;
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="card card-outline card-info">
                                                        <div className="card-header">
                                                            <h3
                                                                className="card-title"
                                                                style={{ fontWeight: "700" }}
                                                            >
                                                                Manufacturer*
                                                            </h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <ReactQuill
                                                                theme="snow"
                                                                id="proManufac"
                                                                value={productInfo.productManufacturer}
                                                                modules={module}
                                                                onChange={(value) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        productManufacturer: value,
                                                                    })
                                                                }
                                                            />
                                                            ;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="card card-outline card-info">
                                                    <div className="card-header">
                                                        <h3
                                                            className="card-title"
                                                            style={{ fontWeight: "700" }}
                                                        >
                                                            Warranty*
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <ReactQuill
                                                            theme="snow"
                                                            id="proWarranty"
                                                            value={productInfo.productWarranty}
                                                            modules={module}
                                                            onChange={(value) =>
                                                                setProductInfo({
                                                                    ...productInfo,
                                                                    productWarranty: value,
                                                                })
                                                            }
                                                        />
                                                        ;
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="card-footer" style={{ marginTop: "-30px" }}>
                                        <button
                                            type="button"
                                            className="buttonStyle"
                                            onClick={() => createProduct()}
                                        >
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                :
                // update existing product
                <section className="content">
                    <div className="container-fluid">
                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product Titles</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="productName">Product Name*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="productName"
                                                        name="productName"
                                                        placeholder="Enter Product Name"
                                                        value={productInfo.productName}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">
                                                        Sub-Script*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="subScript"
                                                        name="subScript"
                                                        placeholder="Enter Sub Script"
                                                        value={productInfo.subScript}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">
                                                        Product Sku*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="productSku"
                                                        name="productSku"
                                                        placeholder="Enter Product Sku"
                                                        value={productInfo.productSku}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Model*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="model"
                                                        name="model"
                                                        placeholder="Enter Model"
                                                        value={productInfo.model}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">HSN Code*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="hsnCode"
                                                        name="hsnCode"
                                                        placeholder="Enter HSN Code"
                                                        value={productInfo.hsnCode}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <label>Product Sections</label>
                                                    <div className="form-control select2">
                                                        <div className="row">
                                                            <div className="col-11">
                                                                <ul
                                                                    style={{
                                                                        listStyleType: "none",
                                                                        margin: "0px",
                                                                        padding: "0px",
                                                                        overflow: "none",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    {productInfo?.productSectionValue?.map(
                                                                        (currElem) => {
                                                                            return (
                                                                                <li
                                                                                    style={{
                                                                                        display: "inline-flex",
                                                                                        backgroundColor: "#17a2b8",
                                                                                        marginRight: "5px",
                                                                                        padding: "5px",
                                                                                        borderRadius: "5px",
                                                                                    }}
                                                                                >
                                                                                    <a
                                                                                        style={{
                                                                                            fontWeight: "bold",
                                                                                            fontSize: "12px",
                                                                                            color: "white",
                                                                                        }}
                                                                                    >
                                                                                        {currElem.name}
                                                                                    </a>
                                                                                    <i
                                                                                        className="fa fa-times"
                                                                                        style={{
                                                                                            color: "white",
                                                                                            fontSize: "10px",
                                                                                            marginLeft: "10px",
                                                                                        }}
                                                                                    />
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className="col-1"
                                                                onClick={() =>
                                                                    setMultipleSelect(multipleSelect === 0 ? 1 : 0)
                                                                }
                                                            >
                                                                {multipleSelect === 0 ? (
                                                                    <i class="fa fa-chevron-down"></i>
                                                                ) : (
                                                                    <i class="fa fa-chevron-up"></i>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        multipleSelect === 1 ? "multipleSelectBoby" : "d-none"
                                                    }
                                                    style={{ width: "100%" }}
                                                >
                                                    <ul>
                                                        {productTitles?.map((item) => {
                                                            return (
                                                                <li
                                                                    className="multiSelectLi"
                                                                    value={item.name}
                                                                    onClick={() =>
                                                                        handleChangeMultiple([
                                                                            { name: item.name, slug: item.slug },
                                                                        ])
                                                                    }
                                                                >
                                                                    <a>{item.name}</a>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Basic Information</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Product Color Variant*</label>
                                            <select
                                                className="form-control select2"
                                                style={{ width: "100%" }}
                                                onChange={(e) =>
                                                    setProductInfo({
                                                        ...productInfo,
                                                        colorVarinat: e.target.value,
                                                    })
                                                }
                                            >
                                                {colorList?.map((currElem, index) => {
                                                    return (
                                                        <option key={index} value={currElem.slug}>
                                                            {currElem.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Category*</label>
                                                    <select
                                                        className="form-control select2"
                                                        id="category"
                                                        name="category"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) => getSubCategoryData(e.target.value)}
                                                    >
                                                        {categoryList?.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem.slug}>
                                                                    {currElem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Sub-Category*</label>
                                                    <select
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) =>
                                                            setProductInfo({
                                                                ...productInfo,
                                                                subCategory: e.target.value,
                                                            })
                                                        }
                                                    >
                                                        {subCatData?.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem.slug}>
                                                                    {currElem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Attributes*</label>
                                                    <select
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) => getAttributeFamily(e.target.value)}
                                                    >
                                                        {attributeList?.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem.slug}>
                                                                    {currElem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Attributes Family*</label>
                                                    <select
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) =>
                                                            setProductInfo({
                                                                ...productInfo,
                                                                attributeFamily: e.target.value,
                                                            })
                                                        }
                                                    >
                                                        {atriFamilyData.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem.slug}>
                                                                    {currElem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product Details</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="productName">Product Price*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="productPrice"
                                                        name="productPrice"
                                                        placeholder="Enter Product Price"
                                                        value={productInfo.productPrice}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="specialPrice">
                                                        Product Special Price*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="specialPrice"
                                                        name="specialPrice"
                                                        placeholder="Enter Product Special Price"
                                                        value={productInfo.specialPrice}
                                                        onChange={(e) =>
                                                            productInfo.productPrice.length === 0
                                                                ? toast.error("Please enter product price")
                                                                : parseInt(productInfo.productPrice) <
                                                                    parseInt(e.target.value)
                                                                    ? toast.error(
                                                                        "Special price can not be grate than product price"
                                                                    ) |
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        specialPrice: "",
                                                                    })
                                                                    : setProductInfo({
                                                                        ...productInfo,
                                                                        specialPrice: e.target.value,
                                                                    })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="productHindiName">Gst Rate*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="gstRate"
                                                        name="gstRate"
                                                        placeholder="Enter Gst Rate"
                                                        value={productInfo.gstRate}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Gst*</label>
                                                    <select
                                                        disabled={productInfo.gstRate === "" ? true : false}
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) =>
                                                            isEmpty(productInfo.productPrice) ||
                                                                isEmpty(productInfo.specialPrice)
                                                                ? toast.error("Please enter valid product price")
                                                                : isEmpty(productInfo.gstRate)
                                                                    ? toast.error("Please enter gst rate")
                                                                    : getBasePrice(e.target.value)
                                                        }
                                                    >
                                                        {selectGst.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem}>
                                                                    {currElem}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Dsicount Type*</label>
                                                    <select
                                                        className="form-control select2"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) =>
                                                            isEmpty(productInfo.productPrice) ||
                                                                isEmpty(productInfo.specialPrice)
                                                                ? toast.error("Please enter valid product price")
                                                                : getDiscount(e.target.value)
                                                        }
                                                    >
                                                        {selectDiscountType.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem}>
                                                                    {currElem}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="basePrice">Discount*</label>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        className="form-control"
                                                        id="discount"
                                                        name="discount"
                                                        value={productInfo.discount}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="basePrice">Base Price*</label>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        className="form-control"
                                                        id="basePrice"
                                                        name="basePrice"
                                                        value={productInfo.basePrice}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="stock">Stock*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="stock"
                                                        name="stock"
                                                        placeholder="Enter Product Stock"
                                                        value={productInfo.stock}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="metaTag">Meta Tag Type*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="metaTag"
                                                        name="metaTag"
                                                        placeholder="Enter Meta Tag"
                                                        value={productInfo.metaTag}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product Items</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">
                                                        Product Primary Image*
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="primaryImage"
                                                                name="primaryImage"
                                                                onChange={(e) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        avatar: e.target.files[0],
                                                                    })
                                                                }
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="exampleInputFile"
                                                            >
                                                                Choose file
                                                            </label>
                                                        </div>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Upload</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div>
                                                        <img
                                                            src={
                                                                productInfo.avatar.name
                                                                    ? URL.createObjectURL(productInfo.avatar)
                                                                    : noImage
                                                            }
                                                            style={{
                                                                width: "120px",
                                                                height: "80px",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">
                                                        Product Secondary Image*
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input
                                                                type="file"
                                                                multiple="multiple"
                                                                className="custom-file-input"
                                                                id="secondaryImage"
                                                                name="secondaryImage"
                                                                onChange={(e) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        secondaryImage: e.target.files,
                                                                    })
                                                                }
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="exampleInputFile"
                                                            >
                                                                Choose file
                                                            </label>
                                                        </div>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Upload</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div>
                                                        <img
                                                            src={
                                                                productInfo.avatar.name
                                                                    ? URL.createObjectURL(productInfo.avatar)
                                                                    : noImage
                                                            }
                                                            style={{
                                                                width: "120px",
                                                                height: "80px",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="flipLink">Flipkart Link*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="flipLink"
                                                        name="flipLink"
                                                        placeholder="Enter Flipkart Link"
                                                        value={productInfo.flipLink}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="amazonLink">Amazon Link*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="amazonLink"
                                                        name="amazonLink"
                                                        placeholder="Enter Amazon Link"
                                                        value={productInfo.amazonLink}
                                                        onChange={handleInputChanges}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="meeshoLink">Meesho Link*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="meeshoLink"
                                                name="meeshoLink"
                                                placeholder="Enter Messsho Link"
                                                value={productInfo.meeshoLink}
                                                onChange={handleInputChanges}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product Specification</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <section className="content">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card card-outline card-info">
                                                        <div className="card-header">
                                                            <h3
                                                                className="card-title"
                                                                style={{ fontWeight: "700" }}
                                                            >
                                                                Description*
                                                            </h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <ReactQuill
                                                                theme="snow"
                                                                value={productInfo.productDesc}
                                                                modules={module}
                                                                onChange={(value) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        productDesc: value,
                                                                    })
                                                                }
                                                            />
                                                            ;
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="card card-outline card-info">
                                                        <div className="card-header">
                                                            <h3
                                                                className="card-title"
                                                                style={{ fontWeight: "700" }}
                                                            >
                                                                Specification*
                                                            </h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <ReactQuill
                                                                theme="snow"
                                                                id="proSpec"
                                                                value={productInfo.productSpec}
                                                                modules={module}
                                                                onChange={(value) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        productSpec: value,
                                                                    })
                                                                }
                                                            />
                                                            ;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card card-outline card-info">
                                                        <div className="card-header">
                                                            <h3
                                                                className="card-title"
                                                                style={{ fontWeight: "700" }}
                                                            >
                                                                Offer*
                                                            </h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <ReactQuill
                                                                theme="snow"
                                                                id="proOffer"
                                                                value={productInfo.productOffer}
                                                                modules={module}
                                                                onChange={(value) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        productOffer: value,
                                                                    })
                                                                }
                                                            />
                                                            ;
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="card card-outline card-info">
                                                        <div className="card-header">
                                                            <h3
                                                                className="card-title"
                                                                style={{ fontWeight: "700" }}
                                                            >
                                                                Manufacturer*
                                                            </h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <ReactQuill
                                                                theme="snow"
                                                                id="proManufac"
                                                                value={productInfo.productManufacturer}
                                                                modules={module}
                                                                onChange={(value) =>
                                                                    setProductInfo({
                                                                        ...productInfo,
                                                                        productManufacturer: value,
                                                                    })
                                                                }
                                                            />
                                                            ;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="card card-outline card-info">
                                                    <div className="card-header">
                                                        <h3
                                                            className="card-title"
                                                            style={{ fontWeight: "700" }}
                                                        >
                                                            Warranty*
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <ReactQuill
                                                            theme="snow"
                                                            id="proWarranty"
                                                            value={productInfo.productWarranty}
                                                            modules={module}
                                                            onChange={(value) =>
                                                                setProductInfo({
                                                                    ...productInfo,
                                                                    productWarranty: value,
                                                                })
                                                            }
                                                        />
                                                        ;
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="card-footer" style={{ marginTop: "-30px" }}>
                                        <button
                                            type="button"
                                            className="buttonStyle"
                                            onClick={() => updateProduct()}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>}
        </Wrapper>
    );
};

const Wrapper = styled.section`
  width: 100%;
  .buttonStyle {
    width: 200px;
    height: 2.5rem;
    background-color: #17a2b8;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    &:hover,
    &:active {
      background-color: white;
      border: #17a2b8 1px solid;
      color: black;
      cursor: pointer;
      transform: scale(0.96);
    }
  }
  .ql-snow.ql-toolbar button,
  .ql-snow .ql-toolbar button {
    background: white;
    border: 1px solid gray;
    cursor: pointer;
    display: inline-block;
    margin-left: 5px;
    margin-top: 5px;
  }
  .ql-toolbar.ql-snow .ql-picker-label {
    border: 1px solid gray;
    margin-top: 5px;
    margin-left: 5px;
  }
  .ql-toolbar.ql-snow {
    border: 1px solid gray;
    background-color: #f6f5f5;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    padding: 8px;
  }
  .multipleSelectBoby {
    display: block;
    position: absolute;
    width: 100%;
    z-index: 999;
    margin-top: -20px;
    background-color: #e9ecf0;
  }
  .multiSelectLi {
    padding-top: 5px;
    padding-bottom: 5px;
    list-style-type: none;
    &:hover,
    &:active {
      cursor: pointer;
      a {
        color: #17a2b8;
      }
    }
  }
`;

export default AdminAddProduct;
