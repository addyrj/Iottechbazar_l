import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCategoryData, setLoder } from '../../../../Database/Action/AdminAction'
import isEmpty from 'lodash.isempty'
import toast from 'react-hot-toast'
import axios from 'axios'
import { postHeaderWithToken } from '../../../../Database/Utils'

const AdminAddSubCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const categoryData = useSelector((state) => state.AdminReducer.categoryData);

    const getCategoryList = () => {
        let newVal = [{ name: "Select Category..." }, ...categoryData]
        return newVal;
    }

    const catList = getCategoryList();

    const { name, slug } = location.state || {};

    const [subCatInfo, setSubCatInfo] = useState({
        catSlug: "",
        name: name !== undefined ? name : "",
        url: location.pathname,
        avatar: {}
    })

    const createSubCategory = async () => {
        const statusSelect = document.querySelector("#category");
        const statusOutput = statusSelect.options[statusSelect.selectedIndex].value;
        if (statusOutput === "Select Category...") {
            toast.error("Failed! Please select category")
        } else if (isEmpty(subCatInfo.name)) {
            toast.error("Failed! Please enetr sub category name")
        } else if (isEmpty(subCatInfo.url)) {
            toast.error("Failed! url is not found")
        } else {
            dispatch(setLoder(false));
            let formData = new FormData();
            formData.append("categorySlug", statusOutput)
            formData.append("name", subCatInfo.name)
            formData.append("url", subCatInfo.url)
            formData.append("avatar", subCatInfo.avatar)

            axios.post(process.env.REACT_APP_BASE_URL + "addSubCategory", formData, postHeaderWithToken)
                .then((response) => {
                    if (response.data.status === 200) {
                        dispatch(setLoder(false));
                        navigate("/admin_sub_category");
                        toast.success(response?.data?.message)
                    }
                })
                .catch((error) => {
                    console.log("error is    ", error)
                    dispatch(setLoder(false));
                    toast.error(error?.response?.data?.message || error.message)
                })
        }
    }

    const updateSubCategory = async () => {
        if (isEmpty(subCatInfo.name)) {
            toast.error("Failed! Please enetr sub category name")
        } else {
            dispatch(setLoder(false));
            let formData = new FormData();
            formData.append("slug", slug)
            formData.append("name", subCatInfo.name)

            axios.post(process.env.REACT_APP_BASE_URL + "updateSubCategory", formData, postHeaderWithToken)
                .then((response) => {
                    if (response.data.status === 200) {
                        dispatch(setLoder(false));
                        navigate("/admin_sub_category");
                        toast.success(response?.data?.message)
                    }
                })
                .catch((error) => {
                    console.log("error is    ", error)
                    dispatch(setLoder(false));
                    toast.error(error?.response?.data?.message || error.message)
                })
        }
    }

    useEffect(() => {
        dispatch(getCategoryData())
    }, [dispatch])
    return (
        <Wrapper>
            <>
                {slug === undefined ?
                    <section className="content">
                        <div className="container-fluid">
                            <div>
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Create Sub-Category</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label>Choose Category</label>
                                                <select className="form-control select2" id="category" name="category" style={{ width: "100%" }}>
                                                    {catList?.map((currElem, index) => {
                                                        return (
                                                            <option key={index} value={currElem.slug}>{currElem.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Sub-Category Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Enter Sub-Category Name"
                                                    value={subCatInfo.name}
                                                    onChange={(e) => setSubCatInfo({ ...subCatInfo, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputFile">File input</label>
                                                <div className="input-group">
                                                    <div className="custom-file">
                                                        <input
                                                            type="file"
                                                            className="custom-file-input"
                                                            id="exampleInputFile"
                                                            onChange={(e) => setSubCatInfo({ ...subCatInfo, avatar: e.target.files[0] })}

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
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-30px" }}>
                                            <button type="button" className="buttonStyle" onClick={() => createSubCategory()}>
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    :
                    <section className="content">
                        <div className="container-fluid">
                            <div>
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Update Sub-Category</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Sub-Category Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Enter Sub-Category Name"
                                                    value={subCatInfo.name}
                                                    onChange={(e) => setSubCatInfo({ ...subCatInfo, name: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-30px" }}>
                                            <button type="button" className="buttonStyle" onClick={() => updateSubCategory()}>
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>}
            </>
        </Wrapper >

    )
}

const Wrapper = styled.section`
.parentLayout{
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
    .buttonStyle{
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
`;

export default AdminAddSubCategory
