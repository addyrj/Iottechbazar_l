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
    let newVal = [{ name: "Select Product...", slug: "" }, ...allProducts]
    return newVal;
  }

  const productList = getProductList();
  const typelist = ["Select Type", "Product"]

  const [sliderInfo, setSliderInfo] = useState({
    url: location.pathname,
    title: title !== undefined ? title : "",
    type: type !== undefined ? type : "Select Type",
    name: name !== undefined ? name : "",
    proSlug: proSlug !== undefined ? proSlug : "",
    avatar: avatar !== undefined ? avatar : {}
  })

  // Create Slider Function
  const createSlider = () => {
    if (!sliderInfo.title || !sliderInfo.type || sliderInfo.type === "Select Type" || !sliderInfo.proSlug) {
      toast.error("Please fill all required fields");
      return;
    }

    let formData = new FormData();
    formData.append("title", sliderInfo.title);
    formData.append("type", sliderInfo.type);
    formData.append("proSlug", sliderInfo.proSlug);
    formData.append("url", sliderInfo.url);
    if (sliderInfo.avatar && typeof sliderInfo.avatar !== 'string') {
      formData.append("avatar", sliderInfo.avatar);
    }
    
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
        } else {
          dispatch(setLoder(false));
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(setLoder(false));
        console.log("error is  ", error)
        toast.error(error?.response?.data?.message || error.message);
      });
  }

  // Update Slider Function
  const updateSlider = () => {
    if (!id) {
      toast.error("Slider ID is missing");
      return;
    }

    if (!sliderInfo.title || !sliderInfo.type || sliderInfo.type === "Select Type" || !sliderInfo.proSlug) {
      toast.error("Please fill all required fields");
      return;
    }

    let formData = new FormData();
    formData.append("id", id);
    formData.append("title", sliderInfo.title);
    formData.append("type", sliderInfo.type);
    formData.append("proSlug", sliderInfo.proSlug);
    formData.append("url", sliderInfo.url);
    if (sliderInfo.avatar && typeof sliderInfo.avatar !== 'string') {
      formData.append("avatar", sliderInfo.avatar);
    }
    
    dispatch(setLoder(true));
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "updateSlider",
        formData,
        postHeaderWithToken
      )
      .then((response) => {
        dispatch(setLoder(false));
        if (response.data.status === 200) {
          navigate("/admin_slider");
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(setLoder(false));
        console.log("Update slider error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong while updating the slider.");
      });
  }

  // Handle input changes
  const handleInputChange = (field, value) => {
    setSliderInfo(prev => ({
      ...prev,
      [field]: value
    }));
  }

  // Handle product selection
  const handleProductChange = (slug) => {
    const selectedProduct = allProducts.find(product => product.slug === slug);
    setSliderInfo(prev => ({
      ...prev,
      proSlug: slug,
      name: selectedProduct?.name || ""
    }));
  }

  useEffect(() => {
    dispatch(getAllProducts({ navigate: navigate }));
  }, [dispatch])

  // Set initial values when component mounts with edit data
  useEffect(() => {
    if (id) {
      setSliderInfo({
        url: location.pathname,
        title: title || "",
        type: type || "Select Type",
        name: name || "",
        proSlug: proSlug || "",
        avatar: avatar || {}
      });
    }
  }, [id, title, type, name, proSlug, avatar, location.pathname]);
  
  return (
    <Wrapper>
      <section className="content">
        <div className="container-fluid">
          <div>
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  {id ? "Update Slider" : "Create Slider"}
                </h3>
              </div>
              
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
                          onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="type">Type*</label>
                        <select
                          className="form-control select2"
                          id="type"
                          name="type"
                          style={{ width: "100%" }}
                          value={sliderInfo.type}
                          onChange={(e) => handleInputChange('type', e.target.value)}
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
                        <label htmlFor="product">Select Product*</label>
                        <select
                          className="form-control select2"
                          id="product"
                          name="product"
                          style={{ width: "100%" }}
                          value={sliderInfo.proSlug}
                          onChange={(e) => handleProductChange(e.target.value)}
                          disabled={sliderInfo.type !== "Product"}
                        >
                          <option value="">Select Product...</option>
                          {productList?.map((currElem, index) => {
                            if (index === 0) return null; // Skip the first placeholder
                            return (
                              <option key={index} value={currElem.slug}>
                                {currElem.name}
                              </option>
                            );
                          })}
                        </select>
                        {sliderInfo.type !== "Product" && (
                          <small className="text-muted">Please select 'Product' type to choose a product</small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="avatar">Slider Image*</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="avatar"
                              name="avatar"
                              onChange={(e) => handleInputChange('avatar', e.target.files[0])}
                              accept="image/*"
                            />
                            <label className="custom-file-label" htmlFor="avatar">
                              {sliderInfo.avatar && typeof sliderInfo.avatar === 'object' ? 
                                sliderInfo.avatar.name : "Choose file"}
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
                  <img 
                    style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                    src={
                      !sliderInfo.avatar || jquery.isEmptyObject(sliderInfo.avatar) ? noImage : 
                      typeof sliderInfo.avatar === "string" ? sliderInfo.avatar : 
                      URL.createObjectURL(sliderInfo.avatar)
                    } 
                    alt="Slider preview"
                  />
                </div>

                <div className="card-footer">
                  <button 
                    type="button" 
                    className="buttonStyle" 
                    onClick={() => id ? updateSlider() : createSlider()}
                  >
                    {id ? "Update" : "Create"}
                  </button>
                  <button 
                    type="button" 
                    className="buttonStyle ml-2" 
                    style={{backgroundColor: '#6c757d'}}
                    onClick={() => navigate("/admin_slider")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
    margin-right: 10px;
    
    &:hover,
    &:active {
      background-color: white;
      border: #17a2b8 1px solid;
      color: black;
      cursor: pointer;
      transform: scale(0.96);
    }
  }
  
  .ml-2 {
    margin-left: 10px;
  }
  
  .img-container{
    margin: 20px 5px;
    width: 100%;
    height: 400px;
    border: 1px solid #ddd;
    padding: 10px;
    background: #f9f9f9;
  }
  
  .text-muted {
    color: #6c757d !important;
    font-size: 12px;
    margin-top: 5px;
    display: block;
  }
`;

export default AdminAddSlider;