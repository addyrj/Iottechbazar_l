/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components"
import { getAppInfo, setLoder } from '../../../../../Database/Action/AdminAction';
import isEmpty from 'lodash.isempty';
import toast from 'react-hot-toast';
import axios from "axios"
import { postHeaderWithToken } from '../../../../../Database/Utils';

const Shipping = () => {
  // shipping_free_limit	shipping_fee
  const dispatch = useDispatch();
  const appInfo = useSelector((state) => state.AdminReducer.appInfo);

  const [shippingInfo, setShippingInfo] = useState({
    shippingFee: appInfo?.shipping_fee !== undefined ? appInfo?.shipping_fee : "",
    shippingFreeLimit: appInfo?.shipping_free_limit !== undefined ? appInfo?.shipping_free_limit : "",
  });

  const updateShipping = () => {
    console.log(shippingInfo);
    toast.success(shippingInfo.shippingFee)
    if (isEmpty(shippingInfo.shippingFee)) {
      toast.error("Failed! Shipping fee is empty")
    } else if (isEmpty(shippingInfo.shippingFreeLimit)) {
      toast.error("Failed! Shipping free limit is empty")
    } else {
      let formData = new FormData();
      formData.append("shipiingFreeLimit", shippingInfo.shippingFreeLimit);
      formData.append("shippingFee", shippingInfo.shippingFee);
      axios.post(process.env.REACT_APP_BASE_URL + "updateShipping", formData, postHeaderWithToken)
        .then((res) => {
          if (res.data.status === 200) {
            dispatch(setLoder(false));
            toast.success(res?.data?.message);
          }
        })
        .catch((error) => {
          console.log("error is   ", error)
          dispatch(setLoder(false))
          toast.error(error?.response?.data?.message || error.message)
        })
    }
  }

  useEffect(() => {
    setShippingInfo({
      shippingFee: appInfo?.shipping_fee,
      shippingFreeLimit: appInfo?.shipping_free_limit,
    })
  }, [appInfo])

  useEffect(() => {
    dispatch(getAppInfo());
  }, [dispatch])
  return (
    <Wrapper>
      <section className="content">
        <div className="header_layout_from row">
          <p className='text-white font-weight-bold h-2 pt-2 pl-4 col-11'>General Setting</p>
        </div>
        <div className="body_layout_form">
          <form>
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="shippingLimit">Free Shipping Above*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shippingLimit"
                    name='shippingLimit'
                    placeholder="Enter Shipping Free Limit"
                    defaultValue={appInfo.shipping_free_limit}
                    value={shippingInfo.shippingFreeLimit}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, shippingFreeLimit: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="shippingFee">Shipping Fee*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shippingFee"
                    name='shippingFee'
                    placeholder="Enter Shipping Fee"
                    defaultValue={appInfo.shipping_fee}
                    value={shippingInfo.shippingFee}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, shippingFee: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button type="button" className='buttonStyle mb-4 float-right' onClick={() => { updateShipping() }}>
              Update
            </button>
          </form>
        </div>
      </section>
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

export default Shipping