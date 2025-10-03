/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getWebsiteTheme, setLoder } from '../../../../../Database/Action/AdminAction';
import axios from 'axios';
import { postHeaderWithToken } from '../../../../../Database/Utils';
import toast from 'react-hot-toast';

const WebsiteThemes = () => {
  const dispatch = useDispatch();
  const webTheme = useSelector((state) => state.AdminReducer.getWebsiteTheme);

  const [websiteTheme, setWebsiteTheme] = useState({
    themeColor: webTheme?.themeColor !== undefined ? webTheme?.themeColor : "",
    headerColor: webTheme?.headerColor !== undefined ? webTheme?.headerColor : "",
    footerColor: webTheme?.footerColor !== undefined ? webTheme?.footerColor : "",
    footerTitleFontColor: webTheme?.footerTitleFontColor !== undefined ? webTheme?.footerTitleFontColor : "",
    footerFontColor: webTheme?.footerFontColor !== undefined ? webTheme?.footerFontColor : "",
    mobSideBarColor: webTheme?.mobSideBarColor !== undefined ? webTheme?.mobSideBarColor : "",
    mobSideBarTextColor: webTheme?.mobSideBarTextColor !== undefined ? webTheme?.mobSideBarTextColor : ""
  });

  const createWebsiteTheme = () => {
    dispatch(setLoder(true));
    let formData = new FormData();
    formData.append("themeColor", websiteTheme.themeColor);
    formData.append("headerColor", websiteTheme.headerColor);
    formData.append("footerColor", websiteTheme.footerColor);
    formData.append("footerTitleFontColor", websiteTheme.footerTitleFontColor);
    formData.append("footerFontColor", websiteTheme.footerFontColor);
    formData.append("mobSideBarColor", websiteTheme.mobSideBarColor);
    formData.append("mobSideBarTextColor", websiteTheme.mobSideBarTextColor);
    axios.post(process.env.REACT_APP_BASE_URL + "createWebsiteTheme", formData, postHeaderWithToken)
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

  useEffect(() => {
    setWebsiteTheme({
      themeColor: webTheme?.themeColor,
      headerColor: webTheme?.headerColor,
      footerColor: webTheme?.footerColor,
      footerTitleFontColor: webTheme?.footerTitleFontColor,
      footerFontColor: webTheme?.footerFontColor,
      mobSideBarColor: webTheme?.mobSideBarColor,
      mobSideBarTextColor: webTheme?.mobSideBarTextColor
    })
  }, [webTheme])

  useEffect(() => {
    dispatch(getWebsiteTheme());
  }, [dispatch]);

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
                  <label htmlFor="themeColor">Theme Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="themeColor"
                    name='themeColor'
                    placeholder="Enter Website Theme Color"
                    value={websiteTheme.themeColor}
                    onChange={(e) => setWebsiteTheme({ ...websiteTheme, themeColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="headerColor">Header Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="headerColor"
                    name='headerColor'
                    placeholder="Enter Header Color"
                    value={websiteTheme.headerColor}
                    onChange={(e) => setWebsiteTheme({ ...websiteTheme, headerColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="footerColor">Footer Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="footerColor"
                    name='footerColor'
                    placeholder="Enter Footer Color"
                    value={websiteTheme.footerColor}
                    onChange={(e) => setWebsiteTheme({ ...websiteTheme, footerColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="footerTextColor">Footer Text Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="footerTextColor"
                    name='footerTextColor'
                    placeholder="Enter Footer Text Color"
                    value={websiteTheme.footerFontColor}
                    onChange={(e) => setWebsiteTheme({ ...websiteTheme, footerFontColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="footerIconColor">Footer Icon Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="footerIconColor"
                    name='footerIconColor'
                    placeholder="Enter Footer Icon Color"
                    value={websiteTheme.footerTitleFontColor}
                    onChange={(e) => setWebsiteTheme({ ...websiteTheme, footerTitleFontColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="mobileSideBarColor">Mobile SideBar Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="mobileSideBarColor"
                    name='mobileSideBarColor'
                    placeholder="Enter Mobile Sidebar Color"
                    value={websiteTheme.mobSideBarColor}
                    onChange={(e) => setWebsiteTheme({ ...websiteTheme, mobSideBarColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="sideBarTextColor">Mobile Sidebar Text Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="sideBarTextColor"
                    name='sideBarTextColor'
                    placeholder="Enter Mobile Sidebar Text Color"
                    value={websiteTheme.mobSideBarTextColor}
                    onChange={(e) => setWebsiteTheme({ ...websiteTheme, mobSideBarTextColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <button type="button" className='buttonStyle mb-4 float-right' onClick={() => createWebsiteTheme()}>
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

export default WebsiteThemes