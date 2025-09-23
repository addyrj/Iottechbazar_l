import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getAdminTheme, setLoder } from '../../../../../Database/Action/AdminAction';
import axios from 'axios';
import { postHeaderWithToken } from '../../../../../Database/Utils';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom"

const Theme = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appInfo = useSelector((state) => state.AdminReducer.getAdminTheme);

  const [adminTheme, setAdminTheme] = useState({
    sidebarColor: appInfo.sidebarColor !== undefined ? appInfo.sidebarColor : "",
    headerColor: appInfo.headerColor !== undefined ? appInfo.headerColor : "",
    fontFamily: appInfo.fontFamily !== undefined ? appInfo.fontFamily : "",
    textColor: appInfo.textColor !== undefined ? appInfo.textColor : "",
    themeColor: appInfo.themeColor !== undefined ? appInfo.themeColor : "",
  });

  const updateTheme = () => {
    console.log(adminTheme)
    dispatch(setLoder(true));
    let formData = new FormData();
    formData.append("sidebarColor", adminTheme.sidebarColor);
    formData.append("headerColor", adminTheme.headerColor);
    formData.append("fontFamily", adminTheme.fontFamily);
    formData.append("textColor", adminTheme.textColor);
    formData.append("themeColor", adminTheme.themeColor);
    axios.post(process.env.REACT_APP_BASE_URL + "createAdminTheme", formData, postHeaderWithToken)
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
    setAdminTheme({
      sidebarColor: appInfo.sidebarColor,
      headerColor: appInfo.headerColor,
      fontFamily: appInfo.fontFamily,
      textColor: appInfo.textColor,
      themeColor: appInfo.themeColor,
    })
  }, [appInfo])

  useEffect(() => {
    dispatch(getAdminTheme({ navigate: navigate }));
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
                  <label htmlFor="sidebarColor">Sidebar Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="sidebarColor"
                    name='sidebarColor'
                    placeholder="Enter Sidebar Color"
                    value={adminTheme.sidebarColor}
                    onChange={(e) => setAdminTheme({ ...adminTheme, sidebarColor: e.target.value })}
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
                    value={adminTheme.headerColor}
                    onChange={(e) => setAdminTheme({ ...adminTheme, headerColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="fontFamily">Font Family*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fontFamily"
                    name='fontFamily'
                    placeholder="Enter Font Family"
                    value={adminTheme.fontFamily}
                    onChange={(e) => setAdminTheme({ ...adminTheme, fontFamily: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="textColor">Text Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="textColor"
                    name='textColor'
                    placeholder="Enter Text Color"
                    value={adminTheme.textColor}
                    onChange={(e) => setAdminTheme({ ...adminTheme, textColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="themeColor">Theme Color*</label>
                  <input
                    type="color"
                    className="form-control"
                    id="themeColor"
                    name='themeColor'
                    placeholder="Enter Theme Color"
                    value={adminTheme.themeColor}
                    onChange={(e) => setAdminTheme({ ...adminTheme, themeColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <button type="button" className='buttonStyle mb-4 float-right' onClick={() => updateTheme()}>
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

export default Theme