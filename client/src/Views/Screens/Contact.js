/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getAppInfo, getAppSocialLink, setLoader } from '../../Database/Action/DashboardAction';
import { NavLink } from "react-router-dom"
import headerBg from "../../Assets/images/page-header-bg.jpg";
import toast from "react-hot-toast"
import axios from "axios";
import { postHeaderWithoutToken } from '../../Database/ApiHeader';



const Contact = () => {
  const dispatch = useDispatch();
  const appInfo = useSelector((state) => state.DashboardReducer.appInfo)
  const appSocialLink = useSelector((state) => state.DashboardReducer.appSocialLink)
  const userInfo = localStorage.getItem("iottechUserInfo");

  const [contactUsInfo, setContactUsInfo] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
    userType: userInfo !== null ? "Registred" : "Unregistred"
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoader(true));
    axios.post(process.env.REACT_APP_BASE_URL + "createEnquiry", contactUsInfo, postHeaderWithoutToken)
      .then((res) => {
        dispatch(setLoader(false));
        setContactUsInfo({
          ...contactUsInfo,
          name: "",
          email: "",
          contact: "",
          subject: "",
          message: "",
        })
        toast.success(res?.data?.message)
      })
      .catch((error) => {
        console.log("error is   ", error)
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message || error.message)
      })
  }

  useEffect(() => {
    dispatch(getAppInfo())
    dispatch(getAppSocialLink())
  }, [dispatch])

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="container">
          <h1 className="page-title">
            Contact Us<span>Pages</span>
          </h1>
        </div>
        {/* End .container */}
      </div>
      {/* End .page-header */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact Us
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div id="map" className="mb-5" >
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4991768982354!2d77.07065707571824!3d28.58479807569092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b0ad6565c37%3A0x9ee772d45ffed70d!2sIOTtech%20Softwares!5e0!3m2!1sen!2sin!4v1726773425385!5m2!1sen!2sin"
            style={{ border: "none", width: "100%", height: "100%" }}></iframe>
        </div>
        {/* End #map */}
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="contact-box text-center">
                <h3>Office</h3>
                <address>
                  {appInfo?.app_address},{appInfo?.app_city},({appInfo?.app_pin_code})
                </address>
              </div>
              {/* End .contact-box */}
            </div>
            {/* End .col-md-4 */}
            <div className="col-md-4">
              <div className="contact-box text-center">
                <h3>Start a Conversation</h3>
                <div>
                  <a href="mailto:#">{appInfo?.app_email}</a>
                </div>
                <div>
                  <a href="tel:#">+91{appInfo?.app_contact}</a>
                </div>
              </div>
              {/* End .contact-box */}
            </div>
            {/* End .col-md-4 */}
            <div className="col-md-4">
              <div className="contact-box text-center">
                <h3>Social</h3>
                <div className="social-icons social-icons-color justify-content-center">
                  {appSocialLink?.map((item) => {
                    console.log(item.icon)
                    return (
                      <a
                        href={item.url}
                        className="social-icon"
                        title={item.name}
                        target="_blank"
                      >
                        <i className={item.icon} />
                      </a>
                    )
                  })}
                </div>
                {/* End .soial-icons */}
              </div>
              {/* End .contact-box */}
            </div>
            {/* End .col-md-4 */}
          </div>
          {/* End .row */}
          <hr className="mt-3 mb-5 mt-md-1" />
          <div className="touch-container row justify-content-center">
            <div className="col-md-9 col-lg-7">
              <div className="text-center">
                <h2 className="title mb-1">Get In Touch</h2>
                {/* End .title mb-2 */}
                <p className="lead text-primary">
                  We collaborate with ambitious brands and people; we’d love to
                  build something great together.
                </p>
                {/* End .lead text-primary */}
              </div>
              {/* End .text-center */}
              <form action="#" className="contact-form mb-2">
                <div className="row">
                  <div className="col-sm-4">
                    <label htmlFor="cname" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder="Name *"
                      value={contactUsInfo.name}
                      onChange={(e) => setContactUsInfo({ ...contactUsInfo, name: e.target.value })}
                    />
                  </div>
                  {/* End .col-sm-4 */}
                  <div className="col-sm-4">
                    <label htmlFor="cemail" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder="Email *"
                      value={contactUsInfo.email}
                      onChange={(e) => setContactUsInfo({ ...contactUsInfo, email: e.target.value })}
                    />
                  </div>
                  {/* End .col-sm-4 */}
                  <div className="col-sm-4">
                    <label htmlFor="cphone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder="Phone"
                      value={contactUsInfo.contact}
                      onChange={(e) => setContactUsInfo({ ...contactUsInfo, contact: e.target.value })}
                    />
                  </div>
                  {/* End .col-sm-4 */}
                </div>
                {/* End .row */}
                <label htmlFor="csubject" className="sr-only">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="csubject"
                  placeholder="Subject"
                  value={contactUsInfo.subject}
                  onChange={(e) => setContactUsInfo({ ...contactUsInfo, subject: e.target.value })}
                />
                <label htmlFor="cmessage" className="sr-only">
                  Message
                </label>
                <textarea
                  className="form-control"
                  cols={30}
                  rows={4}
                  id="cmessage"
                  required=""
                  placeholder="Message *"
                  value={contactUsInfo.message}
                  onChange={(e) => setContactUsInfo({ ...contactUsInfo, message: e.target.value })}
                />
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-outline-primary-2 btn-minwidth-sm"
                  >
                    <span>SUBMIT</span>
                    <i className="icon-long-arrow-right" />
                  </button>
                </div>
                {/* End .text-center */}
              </form>
              {/* End .contact-form */}
            </div>
            {/* End .col-md-9 col-lg-7 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .page-content */}
    </main>

  )
}

export default Contact