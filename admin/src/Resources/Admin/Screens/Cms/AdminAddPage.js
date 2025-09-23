import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import isEmpty from 'lodash.isempty'
import toast from 'react-hot-toast'
import axios from 'axios'
import { postHeaderWithToken } from '../../../../Database/Utils'
import "../../../../../node_modules/react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { quilToolbarOption } from "../../Constants/Constant";
import { setLoder } from '../../../../Database/Action/AdminAction'

const AdminAddPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const module = {
        toolbar: quilToolbarOption,
    };

    const { id, title, url, value } = location.state || {};

    const [legealPageInfo, setLegalPageInfo] = useState({
        title: title !== undefined ? title : "",
        url: url !== undefined ? url : "",
        value: value !== undefined ? value : "",
        pageUrl: location.pathname,
    })

    const createLegalPage = () => {
        if (isEmpty(legealPageInfo.title)) {
            toast.error("Failed! Title is empty")
        } else if (isEmpty(legealPageInfo.url)) {
            toast.error("Failed! Url is empty")
        } else if (isEmpty(legealPageInfo.value)) {
            toast.error("Failed! Page Content is empty")
        } else {
            let formData = new FormData();
            formData.append("title", legealPageInfo.title);
            formData.append("url", legealPageInfo.url);
            formData.append("pageUrl", location.pathname);
            formData.append("value", legealPageInfo.value);
            dispatch(setLoder(true));
            axios
                .post(
                    process.env.REACT_APP_BASE_URL + "createLegalPage",
                    formData,
                    postHeaderWithToken
                )
                .then((response) => {
                    if (response.data.status === 200) {
                        dispatch(setLoder(false));
                        navigate("/admin_refreal_pages");
                        toast.success(response?.data?.message);
                    }
                })
                .catch((error) => {
                    dispatch(setLoder(false));
                    console.log("error is  ", error)
                    toast.error(error?.response?.data?.message || error.message);
                });
        }
    }

    const updateLegalPage = () => {
        if (id === undefined) {
            toast.error("Failed! Id is empty")
        } else if (isEmpty(legealPageInfo.title)) {
            toast.error("Failed! Title is empty")
        } else if (isEmpty(legealPageInfo.url)) {
            toast.error("Failed! Url is empty")
        } else if (isEmpty(legealPageInfo.value)) {
            toast.error("Failed! Page Content is empty")
        } else {
            let formData = new FormData();
            formData.append("id", id);
            formData.append("title", legealPageInfo.title);
            formData.append("url", legealPageInfo.url);
            formData.append("pageUrl", location.pathname);
            formData.append("value", legealPageInfo.value);
            dispatch(setLoder(true));
            axios
                .post(
                    process.env.REACT_APP_BASE_URL + "updateLegalPage",
                    formData,
                    postHeaderWithToken
                )
                .then((response) => {
                    if (response.data.status === 200) {
                        dispatch(setLoder(false));
                        navigate("/admin_refreal_pages");
                        toast.success(response?.data?.message);
                    }
                })
                .catch((error) => {
                    dispatch(setLoder(false));
                    console.log("error is  ", error)
                    toast.error(error?.response?.data?.message || error.message);
                });
        }
    }

    useEffect(() => {
    }, [dispatch])

    return (
        <Wrapper>
            <>
                {id === undefined ?
                    <section className="content">
                        <div className="container-fluid">
                            <div>
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Create Legal Page</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="pageTitle">Page Title*</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="pageTitle"
                                                            name="pageTitle"
                                                            placeholder="Enter Page Title"
                                                            value={legealPageInfo.title}
                                                            onChange={(e) => { setLegalPageInfo({ ...legealPageInfo, title: e.target.value }) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">
                                                            Page Url*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="pageurl"
                                                            name="pageurl"
                                                            placeholder="Enter Page Url"
                                                            value={legealPageInfo.url}
                                                            onChange={(e) => { setLegalPageInfo({ ...legealPageInfo, url: e.target.value }) }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="exampleInputPassword1">
                                                    Page Content*
                                                </label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={legealPageInfo.value}
                                                    modules={module}
                                                    onChange={(value) =>
                                                        setLegalPageInfo({
                                                            ...legealPageInfo,
                                                            value: value,
                                                        })
                                                    }
                                                />
                                            </div>

                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-30px" }}>
                                            <button type="button" className="buttonStyle" onClick={() => createLegalPage()}>
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
                                        <h3 className="card-title">Update Legal Page</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="pageTitle">Page Title*</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="pageTitle"
                                                            name="pageTitle"
                                                            placeholder="Enter Page Title"
                                                            value={legealPageInfo.title}
                                                            onChange={(e) => { setLegalPageInfo({ ...legealPageInfo, title: e.target.value }) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">
                                                            Page Url*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="pageurl"
                                                            name="pageurl"
                                                            placeholder="Enter Page Url"
                                                            value={legealPageInfo.url}
                                                            onChange={(e) => { setLegalPageInfo({ ...legealPageInfo, url: e.target.value }) }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="exampleInputPassword1">
                                                    Page Content*
                                                </label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={legealPageInfo.value}
                                                    modules={module}
                                                    onChange={(value) =>
                                                        setLegalPageInfo({
                                                            ...legealPageInfo,
                                                            value: value,
                                                        })
                                                    }
                                                />
                                            </div>

                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-30px" }}>
                                            <button type="button" className="buttonStyle" onClick={() => updateLegalPage()}>
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

export default AdminAddPage
