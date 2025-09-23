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
import { getCategoryData, setLoder } from '../../../../Database/Action/AdminAction'

const AdminAddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const module = {
    toolbar: quilToolbarOption,
  };

  const { id, title, description, categoryId, avatar } = location.state || {};

  const categoryData = useSelector((state) => state.AdminReducer.categoryData);

  const [blogInfo, setBlogInfo] = useState({
    title: title !== undefined ? title : "",
    description: description !== undefined ? description : "",
    avatar: avatar !== undefined ? avatar : {},
    categoryId: categoryId !== undefined ? categoryId : "",
    url: location.pathname,
  })

  const getCategoryList = () => {
    let newVal = [{ name: "Select Category..." }, ...categoryData]
    return newVal;
  }

  const catList = getCategoryList();

  const createBlog = () => {
    if (isEmpty(blogInfo.title)) {
      toast.error("Failed! Blog title is empty")
    } else if (isEmpty(blogInfo.description)) {
      toast.error("Failed! Blog description is empty")
    } else if (isEmpty(blogInfo.categoryId)) {
      toast.error("Failed! Please select category")
    } else {
      let formData = new FormData();
      formData.append("name", blogInfo.title);
      formData.append("description", blogInfo.description);
      formData.append("categoryId", blogInfo.categoryId);
      formData.append("url", blogInfo.url);
      formData.append("avatar", blogInfo.avatar);
      dispatch(setLoder(true));
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "createBlog",
          formData,
          postHeaderWithToken
        )
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(setLoder(false));
            navigate("/admin_blogs");
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
    dispatch(getCategoryData());
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
                    <h3 className="card-title">Create Blogs</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form>
                    <div className="card-body">

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Select Category*
                            </label>
                            <select className="form-control select2" id="category" name="category" style={{ width: "100%" }}
                              onChange={(e) => setBlogInfo({ ...blogInfo, categoryId: e.target.value })}>
                              {catList?.map((currElem, index) => {
                                return (
                                  <option key={index} value={currElem.id}>{currElem.name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="pageTitle">Blog Title*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="blogTitle"
                              name="blogTitle"
                              placeholder="Enter Blog Title"
                              value={blogInfo.title}
                              onChange={(e) => { setBlogInfo({ ...blogInfo, title: e.target.value }) }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Blog File*
                            </label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="primaryImage"
                                  name="primaryImage"
                                  onChange={(e) => setBlogInfo({ ...blogInfo, avatar: e.target.files[0] })}
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
                      </div>
                      <div className="form-group mt-2">
                        <label htmlFor="exampleInputPassword1">
                          Blog Description*
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={blogInfo.description}
                          modules={module}
                          onChange={(value) =>
                            setBlogInfo({
                              ...blogInfo,
                              description: value,
                            })
                          }
                        />
                      </div>

                    </div>
                    {/* /.card-body */}
                    <div className="card-footer" style={{ marginTop: "-30px" }}>
                      <button type="button" className="buttonStyle" onClick={() => createBlog()}>
                        Create Blog
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
                    <h3 className="card-title">Update Blog</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form>
                    <div className="card-body">

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Select Category*
                            </label>
                            <select className="form-control select2" id="category" name="category" style={{ width: "100%" }}
                              onChange={(e) => setBlogInfo({ ...blogInfo, categoryId: e.target.value })}>
                              {catList?.map((currElem, index) => {
                                return (
                                  <option key={index} value={currElem.id}>{currElem.name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="pageTitle">Blog Title*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="pageTitle"
                              name="pageTitle"
                              placeholder="Enter Page Title"
                              value={blogInfo.title}
                              onChange={(e) => { setBlogInfo({ ...blogInfo, title: e.target.value }) }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Blog File*
                            </label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="primaryImage"
                                  name="primaryImage"
                                  onChange={(e) => setBlogInfo({ ...blogInfo, avatar: e.target.files[0] })}
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
                      </div>
                      <div className="form-group mt-2">
                        <label htmlFor="exampleInputPassword1">
                          Blog Description*
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={blogInfo.description}
                          modules={module}
                          onChange={(value) =>
                            setBlogInfo({
                              ...blogInfo,
                              description: value,
                            })
                          }
                        />
                      </div>

                    </div>
                    {/* /.card-body */}
                    <div className="card-footer" style={{ marginTop: "-30px" }}>
                      <button type="button" className="buttonStyle">
                        Update Blog
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

export default AdminAddBlog
