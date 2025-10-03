/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import noData from "../../../../Components/no_data.json"
import Lottie from "lottie-react";
import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getAdminCoupons, getCategoryData, setLoder, getAllProducts } from '../../../../../Database/Action/AdminAction';
import axios from "axios"
import { postHeaderWithToken } from '../../../../../Database/Utils';
import { discountTyp } from '../../../../Components/CustomList';
import isEmpty from 'lodash.isempty';

const Coupons = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { slug, coupon, categoryId, discountType, discountValue, minPurchaseAmount, startDate, expiryDate } = location.state || {}
  const [couponState, setCouponState] = useState(0)

  const coupons = useSelector((state) => state.AdminReducer.coupons);
  const categoryData = useSelector((state) => state.AdminReducer.categoryData);
  const allProducts = useSelector((state) => state.AdminReducer.allProducts);

  const getCategoryList = () => {
    let newVal = [{ name: "Select Category...", slug: "" }, ...categoryData]
    return newVal;
  }

  const catList = getCategoryList();

  const [couponInfo, setCouponInfo] = useState({
    url: location.pathname,
    coupon: coupon === undefined ? "" : coupon,
    categoryId: categoryId === undefined ? "" : categoryId,
    scopeType: "all_products",
    productIds: [],
    discountType: discountType === undefined ? "" : discountType,
    minPurchaseAmount: minPurchaseAmount === undefined ? "" : minPurchaseAmount,
    discountValue: discountValue === undefined ? "" : discountValue,
    startDate: startDate === undefined ? "" : startDate,
    expiryDate: expiryDate === undefined ? "" : expiryDate,
    avatar: {}
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch all products on component mount
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter products when category changes
  useEffect(() => {
    if (couponInfo.categoryId && allProducts && allProducts.length > 0) {
      const productsInCategory = allProducts.filter(product =>
        product.categorySlug === couponInfo.categoryId
      );
      setFilteredProducts(productsInCategory);
    } else {
      setFilteredProducts([]);
    }
  }, [couponInfo.categoryId, allProducts]);

  // Handle category change
  const handleCategoryChange = (categorySlug) => {
    setCouponInfo({
      ...couponInfo,
      categoryId: categorySlug,
      productIds: [],
      scopeType: categorySlug ? "all_products" : ""
    });
    setSelectAll(false);
  };

  // Handle product selection
  const handleProductSelect = (productId) => {
    let updatedProductIds;
    if (couponInfo.productIds.includes(productId)) {
      updatedProductIds = couponInfo.productIds.filter(id => id !== productId);
    } else {
      updatedProductIds = [...couponInfo.productIds, productId];
    }

    setCouponInfo({
      ...couponInfo,
      productIds: updatedProductIds,
      scopeType: updatedProductIds.length > 0 ? "specific_products" : "all_products"
    });

    if (filteredProducts.length > 0) {
      setSelectAll(updatedProductIds.length === filteredProducts.length);
    }
  };

  // Handle select all products
  const handleSelectAll = () => {
    if (selectAll) {
      setCouponInfo({
        ...couponInfo,
        productIds: [],
        scopeType: "all_products"
      });
      setSelectAll(false);
    } else {
      if (filteredProducts.length > 0) {
        const allProductIds = filteredProducts.map(product => product.slug);
        setCouponInfo({
          ...couponInfo,
          productIds: allProductIds,
          scopeType: "specific_products"
        });
        setSelectAll(true);
      }
    }
  };

  const createCoupons = () => {
    if (isEmpty(couponInfo.coupon)) {
      toast.error("Failed! Coupon is empty");
      return;
    }
    if (isEmpty(couponInfo.discountType)) {
      toast.error("Failed! Please select discount type");
      return;
    }
    if (isEmpty(couponInfo.minPurchaseAmount)) {
      toast.error("Failed! please enter minimum purchase amount");
      return;
    }
    if (isEmpty(couponInfo.discountValue)) {
      toast.error("Failed! please enter discount value");
      return;
    }

    // Prepare the data exactly like your working version
    const requestData = {
      ...couponInfo,
      // Ensure productIds is properly formatted for your backend
      productIds: couponInfo.productIds.length > 0 ? couponInfo.productIds : undefined
    };

    // Remove empty fields that might cause issues
    Object.keys(requestData).forEach(key => {
      if (requestData[key] === "" || requestData[key] === null || requestData[key] === undefined) {
        delete requestData[key];
      }
    });

    // Use the same pattern as your working code
    axios.post(process.env.REACT_APP_BASE_URL + "createCoupon", requestData, postHeaderWithToken)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setLoder(false));
          setCouponState(0);
          toast.success(res?.data?.message);
          // Refresh the coupons list
          dispatch(getAdminCoupons({ navigate: navigate }));
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        dispatch(setLoder(false));

        // Handle token expiration specifically
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        }
      });
  };
  const handleDeleteCoupon = (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) {
      return; // stop if user clicks cancel
    }

    const requestData = {
      id,
      url: location.pathname
    };

    axios.post(process.env.REACT_APP_BASE_URL + "deleteCoupon", requestData, postHeaderWithToken)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          dispatch(getAdminCoupons({ navigate }));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      });
  };



  useEffect(() => {
    dispatch(getAdminCoupons({ navigate: navigate }))
    dispatch(getCategoryData())
  }, [dispatch, navigate])

  return (
    <Wrapper>
      <main>
        <div className="body_layout">
          {couponState === 0 ?
            <section className="content">
              <div className="header_layout">
                <button className='buttonStyle' type='button' onClick={() => setCouponState(1)}>
                  Create Coupons
                </button>
              </div>
              <hr />
              {coupons?.length === 0 ?
                <div className="noDataLayout">
                  <Lottie
                    className="lottieStyle"
                    style={{ width: "300px", height: "300px" }}
                    animationData={noData}
                    loop={true}
                  />
                </div>
                :
                <table
                  id="datatable"
                  className="table table-bordered table-hover table-fixed"
                  style={{ width: "98%", margin: "0 auto 10px auto" }}>
                  <thead>
                    <tr>
                      <th className="col-2">Coupon</th>
                      <th className="col-2">Type</th>
                      <th className="col-1">Discount</th>
                      <th className="col-2">Min Amt</th>
                      <th className="col-2">Scope</th>
                      <th className="col-2">Status</th>
                      <th className="col-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons?.map((currElem, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-text-style">
                            <div className="nameTextStyle">
                              {currElem.coupon}
                            </div>
                          </td>
                          <td className="table-text-style">
                            {currElem.discountType === "percentage" ? "Percentage" : "Fixed"}
                          </td>
                          <td className="table-text-style">
                            {currElem.discountValue}
                            {currElem.discountType === "percentage" ? "%" : ""}
                          </td>
                          <td className="table-text-style text-center">
                            ₹{currElem.min_purchase_amount}
                          </td>
                          <td className="table-text-style">
                            {currElem.scopeType === 'specific_products' ? 'Specific Products' : 'All Products'}
                          </td>
                          <td className="table-text-style">
                            <div className={`statusStyle ${currElem.status === "true" ? 'status-active' : 'status-inactive'}`}>
                              {currElem.status === "true" ? "Active" : "Inactive"}
                            </div>
                          </td>
                          <td
                            className="table-text-style text-center"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
                          >
                            <i
                              className="fa fa-edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate("/admin/coupons", { state: currElem })}
                            />
                            <i
                              className="fa fa-trash"
                              style={{ cursor: "pointer", color: "red" }}
                              onClick={() => handleDeleteCoupon(currElem.id)}
                            />
                          </td>


                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              }
            </section>
            : slug === undefined ?
              <section className="content">
                <div className="header_layout_from row">
                  <p className='text-white font-weight-bold h-2 pt-2 pl-4 col-11'>Create Coupon</p>
                  <i className='fa fa-arrow-left col-1 pt-3 text-white' style={{ cursor: "pointer" }} onClick={() => setCouponState(0)} />
                </div>
                <div className="body_layout_form">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="couponTitle">Coupon Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="couponTitle"
                            name="couponTitle"
                            placeholder="Enter coupon title"
                            value={couponInfo.coupon}
                            onChange={(e) => setCouponInfo({ ...couponInfo, coupon: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Choose Category</label>
                          <select
                            className="form-control select2"
                            style={{ width: "100%" }}
                            value={couponInfo.categoryId}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                          >
                            {catList?.map((currElem, index) => {
                              return (
                                <option key={index} value={currElem.slug}>{currElem.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Product Selection Section */}
                    {couponInfo.categoryId && (
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label>Product Selection</label>
                            <div className="scope-selection mb-3">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="scopeType"
                                  id="allProducts"
                                  value="all_products"
                                  checked={couponInfo.scopeType === "all_products"}
                                  onChange={(e) => setCouponInfo({ ...couponInfo, scopeType: e.target.value, productIds: [] })}
                                />
                                <label className="form-check-label" htmlFor="allProducts">
                                  All Products in Category
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="scopeType"
                                  id="specificProducts"
                                  value="specific_products"
                                  checked={couponInfo.scopeType === "specific_products"}
                                  onChange={(e) => setCouponInfo({ ...couponInfo, scopeType: e.target.value })}
                                />
                                <label className="form-check-label" htmlFor="specificProducts">
                                  Specific Products
                                </label>
                              </div>
                            </div>

                            {couponInfo.scopeType === "specific_products" && filteredProducts.length > 0 && (
                              <div className="product-selection-container">
                                <div className="select-all-container mb-2">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="selectAllProducts"
                                      checked={selectAll}
                                      onChange={handleSelectAll}
                                    />
                                    <label className="form-check-label" htmlFor="selectAllProducts">
                                      Select All Products ({filteredProducts.length} products available)
                                    </label>
                                  </div>
                                </div>

                                <div className="product-list">
                                  {filteredProducts.map((product) => (
                                    <div key={product.slug} className="form-check product-checkbox">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`product-${product.slug}`}
                                        checked={couponInfo.productIds.includes(product.slug)}
                                        onChange={() => handleProductSelect(product.slug)}
                                      />
                                      <label className="form-check-label" htmlFor={`product-${product.slug}`}>
                                        {product.name} - ₹{product.productPrice}
                                      </label>
                                    </div>
                                  ))}
                                </div>

                                {couponInfo.productIds.length > 0 && (
                                  <div className="selected-count mt-2">
                                    <small className="text-muted">
                                      {couponInfo.productIds.length} product(s) selected
                                    </small>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Discount Type</label>
                          <select
                            className="form-control select2"
                            style={{ width: "100%" }}
                            value={couponInfo.discountType}
                            onChange={(e) => setCouponInfo({ ...couponInfo, discountType: e.target.value })}
                          >
                            {discountTyp?.map((currElem, index) => {
                              return (
                                <option key={index} value={currElem.value}>{currElem.title}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="minPurchaseAmt">Min Purchase Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            id="minPurchaseAmt"
                            name='minPurchaseAmt'
                            placeholder="Enter Minimum Purchase Amount"
                            value={couponInfo.minPurchaseAmount}
                            onChange={(e) => setCouponInfo({ ...couponInfo, minPurchaseAmount: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="discountValue">Discount Value</label>
                          <input
                            type="text"
                            className="form-control"
                            id="discountValue"
                            name="discountValue"
                            placeholder="Enter discount value"
                            value={couponInfo.discountValue}
                            onChange={(e) => setCouponInfo({ ...couponInfo, discountValue: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Coupon Image</label>
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="exampleInputFile"
                                onChange={(e) => setCouponInfo({ ...couponInfo, avatar: e.target.files[0] })}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="exampleInputFile"
                              >
                                {couponInfo.avatar && couponInfo.avatar.name ? couponInfo.avatar.name : "Choose file"}
                              </label>
                            </div>
                            <div className="input-group-append">
                              <span className="input-group-text">Upload</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="startDate">Start Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            value={couponInfo.startDate}
                            onChange={(e) => setCouponInfo({ ...couponInfo, startDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Expiry Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="expiryDate"
                            name='expiryDate'
                            value={couponInfo.expiryDate}
                            onChange={(e) => setCouponInfo({ ...couponInfo, expiryDate: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <button type="button" className="buttonStyle mb-4 float-right" onClick={createCoupons}>
                      Create Coupon
                    </button>
                  </form>
                </div>
              </section>
              :
              <section className="content">
                {/* Edit section remains the same */}
              </section>
          }
        </div>
      </main>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .header_layout{
    padding: 15px 0px 5px 20px;
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
  .table-text-style {
    color: black;
    font-size: 1rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
  .table-text-style:hover {
    color: #ff6000;
  }
  .imageStyle {
    width: 50px;
    height: 30px;
  }
  .nameTextStyle {
    white-space: nowrap;
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .statusStyle{
    background-color: green;
    height: 2rem;
    text-align: center;
    border-radius: 20px;
    color: white;
    padding-top: 2px;
    cursor: pointer;
  }
  .status-active {
    background-color: green;
  }
  .status-inactive {
    background-color: red;
  }
  .noDataLayout{
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header_layout_from{
    height: 3rem;
    background-color: #17a2b8;
  }
  .body_layout_form{
    padding: 10px 15px 5px 15px;
  }
  .body_layout{
    background-color: white;
  }

  /* Product selection styles */
  .scope-selection {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #dee2e6;
  }
  
  .product-selection-container {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #dee2e6;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .product-checkbox {
    margin-bottom: 8px;
    padding: 5px;
    border-bottom: 1px solid #e9ecef;
  }
  
  .product-checkbox:last-child {
    border-bottom: none;
  }
  
  .select-all-container {
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  
  .selected-count {
    background-color: #d4edda;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid #c3e6cb;
  }
`;

export default Coupons