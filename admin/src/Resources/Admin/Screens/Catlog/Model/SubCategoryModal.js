import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { categoryLanState, getAppLanguages, setLoder, subCategoryLanState } from '../../../../../Database/Action/AdminAction';
import axios from "axios"
import { postHeaderWithToken } from '../../../../../Database/Utils';
import toast from 'react-hot-toast';
import isEmpty from 'lodash.isempty';

const SubCategoryModal = () => {
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
    const [multiCatName, setMultiCatName] = useState([{ slug: "", text: "" }])
    const { subCatLanState, subCatSlug } = useSelector((state) => state.ConstantReducer);

    const gatLanguageList = () => {
        let newVal = [{ name: "Select Languages..." }, ...languages];
        return newVal;
    };

    const languageList = gatLanguageList();
    const addDivClick = () => {
        setMultiCatName([...multiCatName, { slug: "", text: "" }]);

    }

    const removeDivClick = (index) => {
        const list = [...multiCatName];
        list.splice(index, 1);
        setMultiCatName(list);
    }

    const handleModalFiledChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...multiCatName];
        list[index][name] = value;
        setMultiCatName(list);
    }

    const updateLanguage = () => {
        if (isEmpty(subCatSlug)) {
            toast.error("Failed! Sub-Category not found")
        } else if (isEmpty(multiCatName)) {
            toast.error("Failed! Text Language is not found")
        } else {
            let formData = new FormData();
            formData.append("subCatSlug", subCatSlug);
            formData.append("mulLanguageName", JSON.stringify(multiCatName));
            dispatch(setLoder(true));
            axios.post(process.env.REACT_APP_BASE_URL + "addSubCategoryLanguage", formData, postHeaderWithToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoder(false));
                        toast.success(res?.data?.message);
                        dispatch(subCategoryLanState({ subLanState: false, subSlug: "" }))
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error)
                    dispatch(setLoder(false));
                    toast.error(error?.response?.data?.message || error.message);
                })
        }

    }

    useEffect(() => {
        dispatch(getAppLanguages())
    }, [dispatch])
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={subCatLanState}
            onClose={() => dispatch(subCategoryLanState({ subLanState: false, subSlug: "" }))}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={subCatLanState}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "60%",
                        width: "70%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "transparent",
                        overflowY: "auto"
                    }}
                >
                    <div className="card mb-0">
                        <div
                            className="card-header row"
                            style={{
                                overflow: "hidden",
                                backgroundColor: "blue",
                                width: "100%",
                                borderRadius: "0px",
                                alignSelf: "center",
                                height: "4rem",
                                alignItems: "center"
                            }}>
                            <h3 className="card-title text-white col-9">Add Sub-Category Name</h3>
                            <button style={{
                                width: "200px",
                                height: "2.5rem",
                                color: "white",
                                border: "none",
                                display: "flex",
                                backgroundColor: "orange",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                fontSize: "18px",
                                fontWeight: "bold",
                                transition: "all 0.3s ease"
                            }} onClick={addDivClick}>Add More Text <i className="fa fa-plus ml-2" /></button>
                        </div>
                        {/* /.card-header */}
                        {/* form start */}
                        <form>
                            <div className="card-body">
                                {multiCatName.map((item, index) => {
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
                                                        onChange={(e) => handleModalFiledChange(e, index)}
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
                                                        Sub-Category Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        name="text"
                                                        placeholder="Enter category name"
                                                        value={item.text}
                                                        onChange={(e) => handleModalFiledChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    {multiCatName.length !== 1 && <button style={{
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
                                                    }} onClick={() => removeDivClick(index)}>Remove</button>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* /.card-body */}
                            <div
                                className="card-footer row"
                                style={{ marginTop: "-20px" }}
                            >
                                <button
                                    type="button"
                                    className="buttonStyle"
                                    style={buttonStyle}
                                    onClick={() => updateLanguage()}
                                >
                                    Add Languages
                                </button>

                                <button
                                    type="button"
                                    className="buttonStyle ml-4 bg-red"
                                    style={buttonStyle}
                                    onClick={() => dispatch(subCategoryLanState({ subLanState: false, subSlug: "" }))}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}

export default SubCategoryModal