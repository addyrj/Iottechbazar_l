/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import noData from "../../../../Components/no_data.json"
import Lottie from "lottie-react";
import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getAdminCoupons, getCategoryData, setLoder } from '../../../../../Database/Action/AdminAction';
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

  const getCategoryList = () => {
    let newVal = [{ name: "Select Category..." }, ...categoryData]
    return newVal;
  }

  const catList = getCategoryList();

  const [couponInfo, setCouponInfo] = useState({
    url: location.pathname,
    coupon: coupon === undefined ? "" : coupon,
    categoryId: categoryId === undefined ? "" : categoryId,
    discountType: discountType === undefined ? "" : discountType,
    minPurchaseAmount: minPurchaseAmount === undefined ? "" : minPurchaseAmount,
    discountValue: discountValue === undefined ? "" : discountValue,
    startDate: startDate === undefined ? "" : startDate,
    expiryDate: expiryDate === undefined ? "" : expiryDate,
    avatar: {}
  });

  const createCoupons = () => {
    if (isEmpty(couponInfo.coupon)) {
      toast.error("Failed! Coupon is empty")
    } else if (isEmpty(couponInfo.discountType)) {
      toast.error("Failed! Please select discount type")
    } else if (isEmpty(couponInfo.minPurchaseAmount)) {
      toast.error("Failed! please enter minum purchase amount")
    } else if (isEmpty(couponInfo.discountValue)) {
      toast.error("Failed! please enter discount value")
    } else {
      axios.post(process.env.REACT_APP_BASE_URL + "createCoupon", couponInfo, postHeaderWithToken)
        .then((res) => {
          if (res.data.status === 200) {
            dispatch(setLoder(false))
            setCouponState(0);
            toast.success(res?.data?.message)
          }
        })
        .catch((error) => {
          console.log("erros is    ", error)
          dispatch(setLoder(false));
          toast.error(error?.response?.data?.message || error.message)
        })
    }
  }

  useEffect(() => {
    dispatch(getAdminCoupons({ navigate: navigate }))
    dispatch(getCategoryData())
  }, [dispatch])
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
                      <th className="col-2">Status</th>
                      <th className="col-2">Added By</th>
                      <th className="col-1">Action</th>
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
                            {currElem.discountType === "0" ? "Percentage" : "Value"}
                          </td>
                          <td className="table-text-style">
                            {currElem.discountValue}
                          </td>
                          <td className="table-text-style text-center">
                            ₹{currElem.min_purchase_amount}
                          </td>
                          <td className="table-text-style">
                            <div className="statusStyle">
                              {currElem.status}
                            </div>
                          </td>
                          <td className="table-text-style">
                            {currElem.createdBy}
                          </td>
                          <td className="table-text-style text-center">
                            <i className='fa fa-edit'></i>
                            <i className='fa fa-trash ml-4'></i>
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
                          <select className="form-control select2" id="category" name="category" style={{ width: "100%" }}
                            onChange={(e) => setCouponInfo({ ...couponInfo, categoryId: e.target.value })}>
                            {catList?.map((currElem, index) => {
                              return (
                                <option key={index} value={currElem.slug}>{currElem.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Discount Type</label>
                          <select className="form-control select2" id="category" name="category" style={{ width: "100%" }}
                            onChange={(e) => setCouponInfo({ ...couponInfo, discountType: e.target.value })}>
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
                            placeholder="Enter Minium Purchase Amount"
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

                    <button type="button" className="buttonStyle mb-4 float-right" onClick={() => createCoupons()}>
                      Create Coupon
                    </button>
                  </form>
                </div>
              </section>
              :
              <section className="content">
                <div className="header_layout_from row">
                  <p className='text-white font-weight-bold h-2 pt-2 pl-4 col-11'>Create Title</p>
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
                          <select className="form-control select2" id="category" name="category" style={{ width: "100%" }}
                            onChange={(e) => setCouponInfo({ ...couponInfo, categoryId: e.target.value })}>
                            {catList?.map((currElem, index) => {
                              return (
                                <option key={index} value={currElem.slug}>{currElem.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Discount Type</label>
                          <select className="form-control select2" id="category" name="category" style={{ width: "100%" }}
                            onChange={(e) => setCouponInfo({ ...couponInfo, discountType: e.target.value })}>
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
                            placeholder="Enter Minium Purchase Amount"
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

                    <button type="button" className="buttonStyle mb-4 float-right">
                      Update
                    </button>
                  </form>
                </div>
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
    color  : white;
    padding-top: 2px;
    cursor: pointer;
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

`;

export default Coupons