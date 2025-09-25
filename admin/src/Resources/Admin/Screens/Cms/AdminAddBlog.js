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

  // FIX: Access blogData from location.state
  const { blogData } = location.state || {};
  const id = blogData?.id;
  const title = blogData?.title;
  const description = blogData?.description;
  const categoryId = blogData?.categoryId;
  const avatar = blogData?.avatar;

  const categoryData = useSelector((state) => state.AdminReducer.categoryData);

  const [blogInfo, setBlogInfo] = useState({
    title: title || "",
    description: description || "",
    avatar: null,
    existingAvatar: avatar || "",
    categoryId: categoryId || "",
    url: location.pathname,
  })

  // FIX: Set initial values when component mounts or when blogData changes
  useEffect(() => {
    if (blogData) {
      setBlogInfo({
        title: title || "",
        description: description || "",
        avatar: null,
        existingAvatar: avatar || "",
        categoryId: categoryId || "",
        url: location.pathname,
      });
    }
  }, [blogData]); // Add dependency on blogData

  // FIX: Set the selected category in dropdown when categoryData loads
  useEffect(() => {
    if (categoryId && categoryData.length > 0) {
      setBlogInfo(prev => ({ ...prev, categoryId: String(categoryId) }));
    }
  }, [categoryId, categoryData]);

  const getCategoryList = () => {
    return [{ name: "Select Category...", id: "" }, ...categoryData];
  }

  const catList = getCategoryList();

  // Debug: Check what data we're receiving
  useEffect(() => {
    console.log("Received blogData:", blogData);
    console.log("Current blogInfo:", blogInfo);
    console.log("Category ID:", categoryId);
    console.log("Available categories:", categoryData);
  }, [blogData, blogInfo, categoryId, categoryData]);

  const updateBlog = () => {
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
      formData.append("id", id);
      formData.append("url", blogInfo.url);
      
      if (blogInfo.avatar) {
        formData.append("avatar", blogInfo.avatar);
      }

      dispatch(setLoder(true));
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "updateBlog",
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
          console.log("Update error: ", error)
          toast.error(error?.response?.data?.message || error.message);
        });
    }
  }

  const createBlog = () => {
    if (isEmpty(blogInfo.title)) {
      toast.error("Failed! Blog title is empty")
    } else if (isEmpty(blogInfo.description)) {
      toast.error("Failed! Blog description is empty")
    } else if (isEmpty(blogInfo.categoryId)) {
      toast.error("Failed! Please select category")
    } else if (!blogInfo.avatar) {
      toast.error("Failed! Please select an image")
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
          // CREATE BLOG FORM
          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Create Blogs</h3>
                </div>
                <form>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="category">Select Category*</label>
                          <select 
                            className="form-control select2" 
                            id="category" 
                            name="category" 
                            style={{ width: "100%" }}
                            value={blogInfo.categoryId}
                            onChange={(e) => setBlogInfo({ ...blogInfo, categoryId: e.target.value })}
                          >
                            {catList?.map((currElem, index) => (
                              <option key={index} value={currElem.id}>{currElem.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="blogTitle">Blog Title*</label>
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
                          <label htmlFor="primaryImage">Blog File*</label>
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="primaryImage"
                                name="primaryImage"
                                onChange={(e) => setBlogInfo({ ...blogInfo, avatar: e.target.files[0] })}
                              />
                              <label className="custom-file-label" htmlFor="primaryImage">
                                {blogInfo.avatar ? blogInfo.avatar.name : "Choose file"}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group mt-2">
                      <label htmlFor="description">Blog Description*</label>
                      <ReactQuill
                        theme="snow"
                        value={blogInfo.description}
                        modules={module}
                        onChange={(value) => setBlogInfo({ ...blogInfo, description: value })}
                      />
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <button type="button" className="buttonStyle" onClick={createBlog}>
                      Create Blog
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
          :
          // UPDATE BLOG FORM
          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Update Blog - ID: {id}</h3>
                </div>
                <form>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="category">Select Category*</label>
                          <select 
                            className="form-control select2" 
                            id="category" 
                            name="category" 
                            style={{ width: "100%" }}
                            value={blogInfo.categoryId}
                            onChange={(e) => setBlogInfo({ ...blogInfo, categoryId: e.target.value })}
                          >
                            {catList?.map((currElem, index) => (
                              <option key={index} value={currElem.id}>{currElem.name}</option>
                            ))}
                          </select>
                          <small className="text-muted">Current: {blogInfo.categoryId}</small>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="blogTitle">Blog Title*</label>
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
                          <label htmlFor="primaryImage">Blog File (Leave empty to keep current)</label>
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="primaryImage"
                                name="primaryImage"
                                onChange={(e) => setBlogInfo({ ...blogInfo, avatar: e.target.files[0] })}
                              />
                              <label className="custom-file-label" htmlFor="primaryImage">
                                {blogInfo.avatar ? blogInfo.avatar.name : "Choose new file"}
                              </label>
                            </div>
                          </div>
                          {blogInfo.existingAvatar && (
                            <small className="text-muted">
                              Current: {blogInfo.existingAvatar}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group mt-2">
                      <label htmlFor="description">Blog Description*</label>
                      <ReactQuill
                        theme="snow"
                        value={blogInfo.description}
                        modules={module}
                        onChange={(value) => setBlogInfo({ ...blogInfo, description: value })}
                      />
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <button type="button" className="buttonStyle" onClick={updateBlog}>
                      Update Blog
                    </button>
                    <button 
                      type="button" 
                      className="buttonStyle" 
                      style={{backgroundColor: '#6c757d'}}
                      onClick={() => navigate("/admin_blogs")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>}
      </>
    </Wrapper>
  )
}

const Wrapper = styled.section`
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
    
    &:hover,
    &:active {
      background-color: white;
      border: #17a2b8 1px solid;
      color: black;
      cursor: pointer;
      transform: scale(0.96);
    }
  }
  
  
  .custom-file-label::after {
    content: "Browse";
  }
`;

export default AdminAddBlog