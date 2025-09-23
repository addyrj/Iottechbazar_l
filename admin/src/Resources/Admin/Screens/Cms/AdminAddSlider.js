import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAllProducts, getCategoryData, setLoder } from '../../../../Database/Action/AdminAction';
import jquery from "jquery"
import noImage from "../../Assets/img/iot_slider.jpg"
import axios from "axios"
import { postHeaderWithToken } from '../../../../Database/Utils'
import toast from "react-hot-toast"

const AdminAddSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id, title, type, name, avatar, proSlug } = location.state || {}
  const allProducts = useSelector((state) => state.AdminReducer.allProducts);

  const getProductList = () => {
    let newVal = [{ name: "Select Product..." }, ...allProducts]
    return newVal;
  }

  const productList = getProductList();
  const typelist = ["Select Type", "Product"]

  const [sliderInfo, setSliderInfo] = useState({
    url: location.pathname,
    title: title !== undefined ? title : "",
    type: type !== undefined ? type : "",
    name: name !== undefined ? name : "",
    avatar: avatar !== undefined ? avatar : {}
  })

  const createSlider = () => {
    let formData = new FormData();
    formData.append("title", sliderInfo.title);
    formData.append("type", sliderInfo.type);
    formData.append("proSlug", sliderInfo.name);
    formData.append("url", sliderInfo.url);
    formData.append("avatar", sliderInfo.avatar)
    dispatch(setLoder(true));
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "createSlider",
        formData,
        postHeaderWithToken
      )
      .then((response) => {
        if (response.data.status === 200) {
          dispatch(setLoder(false));
          navigate("/admin_slider");
          toast.success(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(setLoder(false));
        console.log("error is  ", error)
        toast.error(error?.response?.data?.message || error.message);
      });
  }

  useEffect(() => {
    dispatch(getAllProducts({ navigate: navigate }));
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
                            <label htmlFor="title">Title*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              placeholder="Enter Title"
                              value={sliderInfo.title}
                              onChange={(e) => setSliderInfo({ ...sliderInfo, title: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Type*
                            </label>
                            <select
                              className="form-control select2"
                              id="category"
                              name="category"
                              style={{ width: "100%" }}
                              onClick={(e) => setSliderInfo({ ...sliderInfo, type: e.target.value })}
                            >
                              {typelist?.map((currElem, index) => {
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="pageTitle">Select Product*</label>
                            <select
                              className="form-control select2"
                              id="category"
                              name="category"
                              style={{ width: "100%" }}
                              defaultValue="Select Product"
                              onChange={(e) => setSliderInfo({ ...sliderInfo, name: e.target.value })}
                            >
                              {sliderInfo.type === "Product" && productList?.map((currElem, index) => {
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
                            <label htmlFor="exampleInputPassword1">
                              Slider*
                            </label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="primaryImage"
                                  name="primaryImage"
                                  onChange={(e) =>
                                    setSliderInfo({
                                      ...sliderInfo,
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
                      </div>
                    </div>

                    <div className="img-container">
                      <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={jquery.isEmptyObject(sliderInfo.avatar) ? noImage : URL.createObjectURL(sliderInfo.avatar)} />
                    </div>

                    <div className="card-footer">
                      <button type="button" className="buttonStyle" onClick={() => createSlider()}>
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
                            <label htmlFor="title">Title*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              placeholder="Enter Title"
                              value={sliderInfo.title}
                              onClick={(e) => setSliderInfo({ ...sliderInfo, title: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Type*
                            </label>
                            <select
                              className="form-control select2"
                              id="category"
                              name="category"
                              style={{ width: "100%" }}
                              defaultValue={sliderInfo.type}
                              onClick={(e) => setSliderInfo({ ...sliderInfo, type: e.target.value })}
                            >
                              {typelist?.map((currElem, index) => {
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="pageTitle">Select Product*</label>
                            <select
                              className="form-control select2"
                              id="category"
                              name="category"
                              style={{ width: "100%" }}
                              defaultValue={sliderInfo.name}
                            >
                              {sliderInfo.type === "Product" && productList?.map((currElem, index) => {
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
                            <label htmlFor="exampleInputPassword1">
                              Slider*
                            </label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="primaryImage"
                                  name="primaryImage"
                                  onChange={(e) =>
                                    setSliderInfo({
                                      ...sliderInfo,
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
                      </div>
                    </div>

                    <div className="img-container">
                      <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={jquery.isEmptyObject(sliderInfo.avatar) ? noImage : typeof (avatar) === "string" ? sliderInfo.avatar : URL.createObjectURL(sliderInfo.avatar)} />
                    </div>

                    <div className="card-footer" style={{ marginTop: "-30px" }}>
                      <button type="button" className="buttonStyle">
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
  .img-container{
    margin-left: 5px;
    width: 100%;
    height: 590px;
  }
`;

export default AdminAddSlider