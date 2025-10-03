import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { postHeaderWithToken } from "../../../../Database/Utils";
import {
    getAppLanguages,
    setLoder,
} from "../../../../Database/Action/AdminAction";

const AdminAddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { categorySlug, name } = location.state || {};

    const [categoryName, setCategoryName] = useState(
        name !== undefined ? name : ""
    );
    const [image, setImage] = useState({});


    const createCategory = async () => {
        let formData = new FormData();
        formData.append("name", categoryName);
        formData.append("url", location.pathname);
        formData.append("avatar", image);
        dispatch(setLoder(true));
        axios
            .post(
                process.env.REACT_APP_BASE_URL + "addCategory",
                formData,
                postHeaderWithToken
            )
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(setLoder(false));
                    navigate("/admin_category");
                    toast.success(response?.data?.message);
                }
            })
            .catch((error) => {
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message);
            });
    };

    const updateCategory = async () => {
        let formData = new FormData();
        formData.append("name", categoryName);
        formData.append("slug", categorySlug);
        dispatch(setLoder(true));
        axios
            .post(
                process.env.REACT_APP_BASE_URL + "updateCategory",
                formData,
                postHeaderWithToken
            )
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(setLoder(false));
                    navigate("/admin_category");
                    toast.success(response?.data?.message);
                }
            })
            .catch((error) => {
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message);
            });
    };

    useEffect(() => {
        dispatch(getAppLanguages());
    }, [dispatch]);

    return (
        <Wrapper>
            <>
                {categorySlug === undefined ? (
                    <section className="content">
                        <div className="container-fluid">
                            <div>
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Create Category</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">
                                                    Category Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="Enter category name"
                                                    value={name}
                                                    onChange={(e) => setCategoryName(e.target.value)}
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
                                                            onChange={(e) => setImage(e.target.files[0])}
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
                                        <div
                                            className="card-footer"
                                            style={{ marginTop: "-20px" }}
                                        >
                                            <button
                                                type="button"
                                                className="buttonStyle"
                                                onClick={() =>
                                                    categoryName === undefined || categoryName === ""
                                                        ? toast.error("Failed! Enter Category name")
                                                        : createCategory()
                                                }
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                ) : (
                    <section className="content">
                        <div className="container-fluid">
                            <div>
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Update Category</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">
                                                    Category Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="Enter Category Name"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-20px" }}>
                                            <button
                                                type="button"
                                                className="buttonStyle"
                                                onClick={() =>
                                                    categoryName === undefined || categoryName === ""
                                                        ? toast.error("Failed! Enter Category name")
                                                        : updateCategory()
                                                }
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                )}
            </>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  .parentLayout {
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }
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
`;

export default AdminAddCategory;
