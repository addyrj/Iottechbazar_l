import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import noData from "../../../../Components/no_data.json"
import Lottie from "lottie-react";
import styled from "styled-components"
import { getAppSocialLink, setLoder } from '../../../../../Database/Action/AdminAction';
import axios from "axios"
import { postHeaderWithToken } from '../../../../../Database/Utils';
import toast from 'react-hot-toast';


const SocialLink = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const appSocialLink = useSelector((state) => state.AdminReducer.appSocialLink);

  const { name, url, icon, slug } = location.state || {}
  const [socialLinkState, setSocialLinkState] = useState(0)
  const [socialLinkInfo, setSocialLinkInfo] = useState({
    name: name === undefined ? "" : name,
    url: url === undefined ? "" : url,
    icon: icon === undefined ? "" : icon,
    pageUrl: location.pathname

  })

  const createSocialLink = () => {
    dispatch(setLoder(true))
    axios.post(process.env.REACT_APP_BASE_URL + "createSocialLink", socialLinkInfo, postHeaderWithToken)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setLoder(false))
          setSocialLinkState(0);
          toast.success(res?.data?.message)
        }
      })
      .catch((error) => {
        console.log("erros is    ", error)
        dispatch(setLoder(false));
        toast.error(error?.response?.data?.message || error.message)
      })
  }

  const updateSocialLink = () => {

  }

  useEffect(() => {
    dispatch(getAppSocialLink())
  }, [dispatch, socialLinkState])
  return (
    <Wrapper>
      <main>
        <div className="body_layout">
          {socialLinkState === 0 ?
            <section className="content">
              <div className="header_layout">
                <button className='buttonStyle' type='button' onClick={() => setSocialLinkState(1)}>
                  Create Social Link
                </button>
              </div>
              <hr />
              {appSocialLink?.length === 0 ?
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
                      <th className="col-3">Url</th>
                      <th className="col-3">Status</th>
                      <th className="col-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appSocialLink?.map((currElem, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-text-style text-center">
                            {currElem.id}
                          </td>
                          <td className="table-text-style">
                            <a target='_blank' href={currElem.url}>{currElem.name}</a>
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
                  <p className='text-white font-weight-bold h-2 pt-2 pl-4 col-11'>Create Social Link</p>
                  <i className='fa fa-arrow-left col-1 pt-3 text-white' style={{ cursor: "pointer" }} onClick={() => setSocialLinkState(0)} />
                </div>
                <div className="body_layout_form">
                  <form>
                    <div className="">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Link Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter link titile"
                          value={socialLinkInfo.name}
                          onChange={(e) => setSocialLinkInfo({ ...socialLinkInfo, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Link Url</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Enter link url"
                          value={socialLinkInfo.url}
                          onChange={(e) => setSocialLinkInfo({ ...socialLinkInfo, url: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="linkIcon">Link Icon</label>
                        <input
                          type="text"
                          className="form-control"
                          id="linkIcon"
                          placeholder="Enter link icon"
                          value={socialLinkInfo.icon}
                          onChange={(e) => setSocialLinkInfo({ ...socialLinkInfo, icon: e.target.value })}
                        />
                      </div>

                    </div>
                    <button type="button" className="buttonStyle mb-4 float-right" onClick={() => createSocialLink()}>
                      Create
                    </button>
                  </form>
                </div>
              </section>
              :
              <section className="content">
                <div className="header_layout_from row">
                  <p className='text-white font-weight-bold h-2 pt-2 pl-4 col-11'>Create Title</p>
                  <i className='fa fa-arrow-left col-1 pt-3 text-white' style={{ cursor: "pointer" }} onClick={() => setSocialLinkState(0)} />
                </div>
                <div className="body_layout_form">
                  <form>
                    <div className="">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Link Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter link titile"
                          value={socialLinkInfo.name}
                          onChange={(e) => setSocialLinkInfo({ ...socialLinkInfo, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Link Url</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Enter link url"
                          value={socialLinkInfo.url}
                          onChange={(e) => setSocialLinkInfo({ ...socialLinkInfo, url: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="linkIcon">Link Icon</label>
                        <input
                          type="text"
                          className="form-control"
                          id="linkIcon"
                          placeholder="Enter link icon"
                          value={socialLinkInfo.icon}
                          onChange={(e) => setSocialLinkInfo({ ...socialLinkInfo, icon: e.target.value })}
                        />
                      </div>

                    </div>
                    <button type="button" className="buttonStyle mb-4 float-right" onClick={() =>
                      updateSocialLink()
                    }>
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

export default SocialLink