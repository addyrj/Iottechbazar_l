/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import noImage from "../../../Assets/img/no_image.png"
import jquery from "jquery"
import { useDispatch, useSelector } from "react-redux"
import { getAppCountry, getAppInfo, getAppState, setLoder } from '../../../../../Database/Action/AdminAction'
import toast from 'react-hot-toast'
import axios from "axios"
import { postHeaderWithToken } from '../../../../../Database/Utils'
import { useLocation } from "react-router-dom"

const Setting = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const countryList = useSelector((state) => state.AdminReducer.countryList);
  const stateList = useSelector((state) => state.AdminReducer.stateList);
  const appInfo = useSelector((state) => state.AdminReducer.appInfo);
  const settingApiState = useSelector((state) => state.AdminReducer.settingApiState)

  const [stateData, setStateData] = useState([{ name: "Select State" }]);
  const [settingInfo, setSettingInfo] = useState({
    name: appInfo?.app_name !== undefined ? appInfo?.app_name : "",
    email: appInfo.app_email !== undefined ? appInfo.app_email : "",
    contact: appInfo.app_contact !== undefined ? appInfo.app_contact : "",
    logo: {},
    favicon: {},
    country: appInfo.countryId !== undefined ? appInfo.countryId : "",
    state: appInfo.stateId !== undefined ? appInfo.stateId : "",
    city: appInfo.app_city !== undefined ? appInfo.app_city : "",
    pincode: appInfo.app_pin_code !== undefined ? appInfo.app_pin_code : "",
    address: appInfo.app_address !== undefined ? appInfo.app_address : ""
  });

  const getCountryList = () => {
    let newVal = [{ name: "Select Country..." }, ...countryList]
    return newVal;
  }

  const getStateList = () => {
    const countryOutput = document.querySelector("#country");
    const countryId = countryOutput.options[countryOutput.selectedIndex].value;

    setSettingInfo({ ...settingInfo, country: countryId })
    const filterArray = stateList?.filter((item) => {
      return item.country_id === parseInt(countryId);
    });

    if (filterArray.length !== 0) {
      setStateData([{ name: "Select State" }].concat(filterArray));
    } else {
      setStateData([{ name: "Select State" }]);
    }
  };

  const country = getCountryList();

  const updateSetting = () => {
    if (settingInfo?.logo?.name !== "logo.png") {
      toast.error("Failed! logo image name must be logo and extension is png")
    } else if (settingInfo?.favicon?.name !== "favicon.png") {
      toast.error("Failed! favicon image name must be favicon and extension is png")
    } else {
      dispatch(setLoder(true))
      let formData = new FormData();
      formData.append("name", settingInfo.name);
      formData.append("email", settingInfo.email);
      formData.append("contact", settingInfo.contact);
      formData.append("address", settingInfo.address);
      formData.append("pincode", settingInfo.pincode);
      formData.append("city", settingInfo.city);
      formData.append("state", settingInfo.state);
      formData.append("country", settingInfo.country);
      let avatar = [settingInfo.logo, settingInfo.favicon];
      for (let index = 0; index < avatar.length; index++) {
        const element = avatar[index];
        formData.append("avatar", element)
      }

      axios.post(process.env.REACT_APP_BASE_URL + "createAppInfo", formData, postHeaderWithToken)
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
    setSettingInfo({
      name: appInfo?.app_name,
      email: appInfo.app_email,
      contact: appInfo.app_contact,
      logo: {},
      favicon: {},
      country: appInfo.countryId,
      state: appInfo.stateId,
      city: appInfo.app_city,
      pincode: appInfo.app_pin_code,
      address: appInfo.app_address
    })
  }, [appInfo])

  useEffect(() => {
    if (countryList.length === 0) {
      dispatch(getAppCountry())
    }
    if (stateList.length === 0) {
      dispatch(getAppState())
    }
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
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="name">Application Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name='name'
                    placeholder="Enter Application Name"
                    value={settingInfo.name}
                    onChange={(e) => setSettingInfo({ ...settingInfo, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name='email'
                    placeholder="Enter Email"
                    value={settingInfo.email}
                    onChange={(e) => setSettingInfo({ ...settingInfo, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="contact">Contact*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    name='contact'
                    placeholder="Enter Contact"
                    value={settingInfo.contact}
                    onChange={(e) => setSettingInfo({ ...settingInfo, contact: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="exampleInputFile">Logo*</label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="logo"
                        name='logo'
                        onChange={(e) => setSettingInfo({ ...settingInfo, logo: e.target.files[0] })}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="exampleInputFile"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="exampleInputFile">Favicon*</label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="favicon"
                        name='favicon'
                        onChange={(e) => setSettingInfo({ ...settingInfo, favicon: e.target.files[0] })}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="exampleInputFile"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label>Country*</label>
                  <select
                    name="country"
                    id="country"
                    className="form-control select2" style={{ width: "100%" }}
                    defaultValue={appInfo.countryId}
                    onChange={(e) => getStateList(e.target.value)}
                  >
                    {country.map((currElem, index) => {
                      return (
                        <option key={index} value={currElem.id}>
                          {currElem.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <div>
                    <img src={jquery.isEmptyObject(settingInfo.logo) ? appInfo?.app_logo !== undefined
                      ? process.env.REACT_APP_IMAGE_URL + appInfo?.app_logo : noImage :
                      URL.createObjectURL(settingInfo.logo)}
                      style={{ width: "120px", height: "80px", objectFit: "contain" }} alt='logo' />
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <div>
                    <img src={jquery.isEmptyObject(settingInfo.favicon) ? appInfo?.app_favicon !== undefined ? process.env.REACT_APP_IMAGE_URL + appInfo?.app_favicon : noImage : URL.createObjectURL(settingInfo.favicon)} style={{ width: "120px", height: "80px", objectFit: "contain" }} alt='logo' />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label>State*</label>
                  <select
                    name="state"
                    id="state"
                    className="form-control select2" style={{ width: "100%" }}
                    defaultValue={appInfo.stateId}
                    onChange={(e) => setSettingInfo({ ...settingInfo, state: e.target.value })}>
                    {stateData.map((currElem, index) => {
                      return (
                        <option key={index} value={currElem.id}>
                          {currElem.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label>City*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name='city'
                    placeholder="Enter City"
                    value={settingInfo.city}
                    onChange={(e) => setSettingInfo({ ...settingInfo, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label>Pincode*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name='pincode'
                    placeholder="Enter pincode"
                    value={settingInfo.pincode}
                    onChange={(e) => setSettingInfo({ ...settingInfo, pincode: e.target.value })}

                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="name">Address*</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name='address'
                  placeholder="Enter Address"
                  value={settingInfo.address}
                  onChange={(e) => setSettingInfo({ ...settingInfo, address: e.target.value })}
                />
              </div>
            </div>
            <button type="button" className='buttonStyle mb-4 float-right' onClick={() => updateSetting()}>
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

export default Setting