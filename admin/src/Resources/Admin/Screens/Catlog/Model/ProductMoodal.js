/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { getAppLanguages, productLanState, setLoder } from '../../../../../Database/Action/AdminAction';
import axios from "axios"
import { postHeaderWithToken } from '../../../../../Database/Utils';
import toast from 'react-hot-toast';
import isEmpty from 'lodash.isempty';
import styled from 'styled-components';
import "../../../Styles/Modal.css"
import ReactQuill from "react-quill";
import "../../../../../../node_modules/react-quill/dist/quill.snow.css";
import { quilToolbarOption } from "../../../Constants/Constant";

const ProductModal = () => {
    const buttonStyle = {
        width: "200px",
        height: "2.5rem",
        backgroundColor: "#17a2b8",
        color: "white",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        transition: "all 0.3s ease",
        WebkitTransition: "all 0.3s ease 0s",
        MozTransition: "all 0.3s ease 0s",
        OTransition: "all 0.3s ease 0s",
    };
    const dispatch = useDispatch();
    const languages = useSelector((state) => state.AdminReducer.languages);
    const [routeState, setRouteState] = useState(1)
    const [multiProName, setMultiProName] = useState([{ slug: "", text: "" }])
    const [multiScriptName, setMultiScriptName] = useState([{ slug: "", text: "" }])
    const [multiProDesc, setMultiProDesc] = useState([{ slug: "", text: "" }])
    const [multiProSpec, setMultiProSpec] = useState([{ slug: "", text: "" }])
    const [multiProOffer, setMultiProOffer] = useState([{ slug: "", text: "" }])
    const { proLanState, proSlug } = useSelector((state) => state.ConstantReducer);

    const productModalTitle = [
        {
            id: 1,
            title: "Product Name"
        },
        {
            id: 2,
            title: "Sub Script"
        },
        {
            id: 3,
            title: "Descripation"
        },
        {
            id: 4,
            title: "Specification"
        },
        {
            id: 5,
            title: "Offer"
        }
    ]

    const module = {
        toolbar: quilToolbarOption,
    };

    const addNameDivClick = () => {
        setMultiProName([...multiProName, { slug: "", text: "" }]);

    }

    const removeNameDivClick = (index) => {
        const list = [...multiProName];
        list.splice(index, 1);
        setMultiProName(list);
    }

    const handleModalNameChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...multiProName];
        list[index][name] = value;
        setMultiProName(list);
    }

    const gatLanguageList = () => {
        let newVal = [{ name: "Select Languages..." }, ...languages];
        return newVal;
    };

    const languageList = gatLanguageList();

    useEffect(() => {
        dispatch(getAppLanguages())
    }, [dispatch])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={proLanState}
            onClose={() => dispatch(productLanState({ proLanState: false, proSlug: "" }))}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={proLanState}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "60%",
                        width: "70%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "grey",
                        overflowY: "auto"
                    }}
                >
                    <section className="content bg-grey">
                        <div className="row p-2">
                            <div className="col-md-3">
                                <div className="card card_modal">
                                    <div className="card-header">
                                        <h5 className='text-center font-weight-bold text-blue'>Information</h5>
                                    </div>
                                    <div className="card-body card-body_modal">
                                        <ul className='ul_modal'>
                                            {productModalTitle?.map((item) => {
                                                return (
                                                    <li className='li_modal' value={item.id} onClick={() => setRouteState(item.id)}>
                                                        <a>{item.title}</a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {
                                routeState === 1 ?
                                    <div className="col-md-9 col-sm-9">
                                        <div className="card card_body_modal mb-0">
                                            <div className="card-header card_header_modal row" style={{ marginLeft: "0px", marginRight: "0px" }}>
                                                <h3 className="card-title text-white col-md-9 col-sm-9" style={{ fontSize: "18px", fontWeight: "bold" }}>Add Product Info</h3>
                                                <button className='buttonStyle_modal' onClick={addNameDivClick}>
                                                    Add More Text<i className="fa fa-plus ml-2" />
                                                </button>
                                            </div>
                                            <div className="card-body">
                                                {multiProName.map((item, index) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="col-sm-5">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">
                                                                        Select Language
                                                                    </label>
                                                                    <select
                                                                        className="form-control select2"
                                                                        style={{ width: "100%" }}
                                                                        name="slug"
                                                                        onChange={(e) => handleModalNameChange(e, index)}
                                                                    >
                                                                        {languageList?.map((currElem, index) => {
                                                                            return (
                                                                                <option key={index} value={currElem.slug}>
                                                                                    {currElem.name}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">
                                                                        Product Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="exampleInputEmail1"
                                                                        name="text"
                                                                        placeholder="Enter Product name"
                                                                        value={item.text}
                                                                        onChange={(e) => handleModalNameChange(e, index)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <div className="form-group">
                                                                    {multiProName.length !== 1 && <button style={{
                                                                        dispatch: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        padding: "8px",
                                                                        backgroundColor: "red",
                                                                        border: "0px",
                                                                        color: "white",
                                                                        fontWeight: "bold",
                                                                        marginTop: "30px",
                                                                        float: "right"
                                                                    }} onClick={() => removeNameDivClick(index)}>Remove</button>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    : routeState === 2 ?
                                        <div className="col-md-9 col-sm-9">
                                            <div className="card card_body_modal mb-0">
                                                <div className="card-header card_header_modal row" style={{ marginLeft: "0px", marginRight: "0px" }}>
                                                    <h3 className="card-title text-white col-md-9 col-sm-9" style={{ fontSize: "18px", fontWeight: "bold" }}>Product Sub-Script</h3>
                                                    <button className='buttonStyle_modal'>
                                                        Add More Text<i className="fa fa-plus ml-2" />
                                                    </button>
                                                </div>
                                                <div className="card-body">
                                                    {multiScriptName.map((item, index) => {
                                                        return (
                                                            <div className="row">
                                                                <div className="col-sm-5">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputEmail1">
                                                                            Select Language
                                                                        </label>
                                                                        <select
                                                                            className="form-control select2"
                                                                            style={{ width: "100%" }}
                                                                            name="slug"
                                                                        >
                                                                            {languageList?.map((currElem, index) => {
                                                                                return (
                                                                                    <option key={index} value={currElem.slug}>
                                                                                        {currElem.name}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-5">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputEmail1">
                                                                            Product Sub-Script
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="exampleInputEmail1"
                                                                            name="text"
                                                                            placeholder="Enter category name"
                                                                            value={item.text}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <div className="form-group">
                                                                        {multiProName.length !== 1 && <button style={{
                                                                            dispatch: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                            padding: "8px",
                                                                            backgroundColor: "red",
                                                                            border: "0px",
                                                                            color: "white",
                                                                            fontWeight: "bold",
                                                                            marginTop: "30px",
                                                                            float: "right"
                                                                        }}>Remove</button>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div> :
                                        routeState === 3 ?
                                            <div className="col-md-9 col-sm-9">
                                                <div className="card card_body_modal mb-0">
                                                    <div className="card-header card_header_modal row" style={{ marginLeft: "0px", marginRight: "0px" }}>
                                                        <h3 className="card-title text-white col-md-9 col-sm-9" style={{ fontSize: "18px", fontWeight: "bold" }}>Product Descriptaion</h3>
                                                        <button className='buttonStyle_modal'>
                                                            Add More Text<i className="fa fa-plus ml-2" />
                                                        </button>
                                                    </div>
                                                    <div className="card-body">
                                                        {multiProDesc.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <div className="row">
                                                                        <div className="col-sm-9">
                                                                            <div className="form-group">
                                                                                <label htmlFor="exampleInputEmail1">
                                                                                    Select Language
                                                                                </label>
                                                                                <select
                                                                                    className="form-control select2"
                                                                                    style={{ width: "100%" }}
                                                                                    name="slug"
                                                                                >
                                                                                    {languageList?.map((currElem, index) => {
                                                                                        return (
                                                                                            <option key={index} value={currElem.slug}>
                                                                                                {currElem.name}
                                                                                            </option>
                                                                                        );
                                                                                    })}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-3">
                                                                            <div className="form-group">
                                                                                {multiProName.length !== 1 && <button style={{
                                                                                    dispatch: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center",
                                                                                    padding: "8px",
                                                                                    backgroundColor: "red",
                                                                                    border: "0px",
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                    marginTop: "30px",
                                                                                    float: "right"
                                                                                }}>Remove</button>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputEmail1">
                                                                            Product Descripation
                                                                        </label>
                                                                        <ReactQuill
                                                                            theme="snow"
                                                                            modules={module}
                                                                        />
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div> :
                                            routeState === 4 ?
                                                <div className="col-md-9 col-sm-9">
                                                    <div className="card card_body_modal mb-0">
                                                        <div className="card-header card_header_modal row" style={{ marginLeft: "0px", marginRight: "0px" }}>
                                                            <h3 className="card-title text-white col-md-9 col-sm-9" style={{ fontSize: "18px", fontWeight: "bold" }}>Product Specification</h3>
                                                            <button className='buttonStyle_modal'>
                                                                Add More Text<i className="fa fa-plus ml-2" />
                                                            </button>
                                                        </div>
                                                        <div className="card-body">
                                                            {multiProSpec.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <div className="row">
                                                                            <div className="col-sm-9">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="exampleInputEmail1">
                                                                                        Select Language
                                                                                    </label>
                                                                                    <select
                                                                                        className="form-control select2"
                                                                                        style={{ width: "100%" }}
                                                                                        name="slug"
                                                                                    >
                                                                                        {languageList?.map((currElem, index) => {
                                                                                            return (
                                                                                                <option key={index} value={currElem.slug}>
                                                                                                    {currElem.name}
                                                                                                </option>
                                                                                            );
                                                                                        })}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-3">
                                                                                <div className="form-group">
                                                                                    {multiProName.length !== 1 && <button style={{
                                                                                        dispatch: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        padding: "8px",
                                                                                        backgroundColor: "red",
                                                                                        border: "0px",
                                                                                        color: "white",
                                                                                        fontWeight: "bold",
                                                                                        marginTop: "30px",
                                                                                        float: "right"
                                                                                    }}>Remove</button>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="exampleInputEmail1">
                                                                                Product Specification
                                                                            </label>
                                                                            <ReactQuill
                                                                                theme="snow"
                                                                                modules={module}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div> :
                                                routeState === 5 ?
                                                    <div className="col-md-9 col-sm-9">
                                                        <div className="card card_body_modal mb-0">
                                                            <div className="card-header card_header_modal row" style={{ marginLeft: "0px", marginRight: "0px" }}>
                                                                <h3 className="card-title text-white col-md-9 col-sm-9" style={{ fontSize: "18px", fontWeight: "bold" }}>Product Offer</h3>
                                                                <button className='buttonStyle_modal'>
                                                                    Add More Text<i className="fa fa-plus ml-2" />
                                                                </button>
                                                            </div>
                                                            <div className="card-body">
                                                                {multiProSpec.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <div className="row">
                                                                                <div className="col-sm-9">
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="exampleInputEmail1">
                                                                                            Select Language
                                                                                        </label>
                                                                                        <select
                                                                                            className="form-control select2"
                                                                                            style={{ width: "100%" }}
                                                                                            name="slug"
                                                                                        >
                                                                                            {languageList?.map((currElem, index) => {
                                                                                                return (
                                                                                                    <option key={index} value={currElem.slug}>
                                                                                                        {currElem.name}
                                                                                                    </option>
                                                                                                );
                                                                                            })}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="form-group">
                                                                                        {multiProOffer.length !== 1 && <button style={{
                                                                                            dispatch: "flex",
                                                                                            alignItems: "center",
                                                                                            justifyContent: "center",
                                                                                            padding: "8px",
                                                                                            backgroundColor: "red",
                                                                                            border: "0px",
                                                                                            color: "white",
                                                                                            fontWeight: "bold",
                                                                                            marginTop: "30px",
                                                                                            float: "right"
                                                                                        }}>Remove</button>}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="exampleInputEmail1">
                                                                                    Product Offer
                                                                                </label>
                                                                                <ReactQuill
                                                                                    theme="snow"
                                                                                    modules={module}
                                                                                />
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="col-md-9 col-sm-9">
                                                        <div className="card card_body_modal mb-0">
                                                            <div className="card-header card_header_modal row" style={{ marginLeft: "0px", marginRight: "0px" }}>
                                                                <h3 className="card-title text-white col-md-9 col-sm-9" style={{ fontSize: "18px", fontWeight: "bold" }}>Add Product Info</h3>
                                                                <button className='buttonStyle_modal'>
                                                                    Add More Text<i className="fa fa-plus ml-2" />
                                                                </button>
                                                            </div>
                                                            <div className="card-body">
                                                                {multiProName.map((item, index) => {
                                                                    return (
                                                                        <div className="row">
                                                                            <div className="col-sm-5">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="exampleInputEmail1">
                                                                                        Select Language
                                                                                    </label>
                                                                                    <select
                                                                                        className="form-control select2"
                                                                                        style={{ width: "100%" }}
                                                                                        name="slug"
                                                                                    >
                                                                                        {languageList?.map((currElem, index) => {
                                                                                            return (
                                                                                                <option key={index} value={currElem.slug}>
                                                                                                    {currElem.name}
                                                                                                </option>
                                                                                            );
                                                                                        })}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-5">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="exampleInputEmail1">
                                                                                        Product Name
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="exampleInputEmail1"
                                                                                        name="text"
                                                                                        placeholder="Enter category name"
                                                                                        value={item.text}

                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-2">
                                                                                <div className="form-group">
                                                                                    {multiProName.length !== 1 && <button style={{
                                                                                        dispatch: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        padding: "8px",
                                                                                        backgroundColor: "red",
                                                                                        border: "0px",
                                                                                        color: "white",
                                                                                        fontWeight: "bold",
                                                                                        marginTop: "30px",
                                                                                        float: "right"
                                                                                    }}>Remove</button>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                            }
                        </div>

                    </section>
                </Box>
            </Fade>
        </Modal>
    )
}
export default ProductModal