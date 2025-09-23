/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import noData from "../../../../Components/no_data.json"
import Lottie from "lottie-react";
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getAppLanguages, setLoder } from '../../../../../Database/Action/AdminAction';
import axios from "axios"
import { postHeaderWithToken } from '../../../../../Database/Utils';

const Language = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { name, countryCode, slug } = location.state || {}
    const [productTitleState, setProductTitleState] = useState(0)
    const [languageInfo, setLanguageInfo] = useState({
        name: name === undefined ? "" : name,
        countryCode: countryCode === undefined ? "" : countryCode,
        url: location.pathname

    })
    const languages = useSelector((state) => state.AdminReducer.languages);

    const createLanguage = () => {
        dispatch(setLoder(true))
        axios.post(process.env.REACT_APP_BASE_URL + "createLangugae", languageInfo, postHeaderWithToken)
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch(setLoder(false))
                    setProductTitleState(0);
                    toast.success(res?.data?.message)
                }
            })
            .catch((error) => {
                console.log("erros is    ", error)
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message)
            })
    }

    const updateLanguage = () => {

    }

    useEffect(() => {
        dispatch(getAppLanguages())
    }, [dispatch])
    return (
        <Wrapper>
            <div className="body_layout">
                {productTitleState === 0 ?
                    <section className="content">
                        <div className="header_layout">
                            <button className='buttonStyle' type='button' onClick={() => setProductTitleState(1)}>
                                Create Language
                            </button>
                        </div>
                        <hr />
                        {languages?.length === 0 ?
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
                                        <th className="col-1">Id</th>
                                        <th className="col-3">Name</th>
                                        <th className="col-3">Contry Code</th>
                                        <th className="col-3">Status</th>
                                        <th className="col-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {languages?.map((currElem, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="table-text-style text-center">
                                                    {currElem.id}
                                                </td>
                                                <td className="table-text-style">
                                                    <div className="nameTextStyle">
                                                        {currElem.name}
                                                    </div>
                                                </td>
                                                <td className="table-text-style">
                                                    {currElem.countryCode}
                                                </td>
                                                <td className="table-text-style">
                                                    <div className="statusStyle">
                                                        {currElem.status}
                                                    </div>
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
                                <p className='text-white font-weight-bold h-2 pt-2 pl-4 col-11'>Create Language</p>
                                <i className='fa fa-arrow-left col-1 pt-3 text-white' style={{ cursor: "pointer" }} onClick={() => setProductTitleState(0)} />
                            </div>
                            <div className="body_layout_form">
                                <form>
                                    <div className="">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Language Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder="Enter language name"
                                                value={languageInfo.name}
                                                onChange={(e) => setLanguageInfo({ ...languageInfo, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Country Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Enter category hindi name"
                                                value={languageInfo.countryCode}
                                                onChange={(e) => setLanguageInfo({ ...languageInfo, countryCode: e.target.value })}
                                            />
                                        </div>

                                    </div>
                                    <button type="button" className="buttonStyle mb-4 float-right" onClick={() =>
                                        languageInfo.name === "" ? toast.error("Failed! Enter Language Name")
                                            : languageInfo.countryCode === "" ?
                                                toast.error("Failed! Enter Country Code") : createLanguage()
                                    }>
                                        Create
                                    </button>
                                </form>
                            </div>
                        </section>
                        :
                        <section className="content">
                            <div className="header_layout_from row">
                                <p className='text-white font-weight-bold h-2 pt-2 pl-4 col-11'>Create Title</p>
                                <i className='fa fa-arrow-left col-1 pt-3 text-white' style={{ cursor: "pointer" }} onClick={() => setProductTitleState(0)} />
                            </div>
                            <div className="body_layout_form">
                                <form>
                                    <div className="">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Language Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder="Enter language name"
                                                value={languageInfo.name}
                                                onChange={(e) => setLanguageInfo({ ...languageInfo, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Country Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Enter category hindi name"
                                                value={languageInfo.countryCode}
                                                onChange={(e) => setLanguageInfo({ ...languageInfo, countryCode: e.target.value })}
                                            />
                                        </div>

                                    </div>
                                    <button type="button" className="buttonStyle mb-4 float-right" onClick={() =>
                                        languageInfo.name === "" ? toast.error("Failed! Enter Language Name")
                                            : languageInfo.countryCode === "" ?
                                                toast.error("Failed! Enter Country Code") : updateLanguage()
                                    }>
                                        Update
                                    </button>
                                </form>
                            </div>
                        </section>
                }
            </div>
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

export default Language