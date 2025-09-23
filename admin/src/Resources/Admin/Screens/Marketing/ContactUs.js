import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactUsQuery,
  getTestApiData,
} from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css";
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json";
import moment from "moment";
import { useNavigate, NavLink } from "react-router-dom";

const ContactUs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const enquiryQuiry = useSelector(
    (state) => state.AdminReducer.contactUsQuery
  );

  const getTime = (oldDate) => {
    var dateTime = new Date(oldDate);
    dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss a");
    return dateTime;
  };

  useEffect(() => {
    dispatch(getContactUsQuery({ navigate: navigate }));
  }, [dispatch]);

  useEffect(() => {
    if (enquiryQuiry.length !== 0) {
      userListDatatables();
    }
  }, [enquiryQuiry]);

  return (
    <Wrapper>
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body mb-4">
                <table
                  id="datatable"
                  className="table table-bordered table-hover table-fixed"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="col-1">Id</th>
                      <th className="col-1">Name</th>
                      <th className="col-1">Email</th>
                      <th className="col-2">Subject</th>
                      <th className="col-3">Enquiry</th>
                      <th className="col-1">Status</th>
                      <th className="col-1">Type</th>
                      <th className="col-1">Created At</th>
                      <th className="col-1">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiryQuiry.length === 0 ? (
                      <div className="noDataStyle">
                        <Lottie
                          className="lottieStyle"
                          style={{ width: "300px", height: "300px" }}
                          animationData={noData}
                          loop={true}
                        />
                      </div>
                    ) : (
                      enquiryQuiry.map((currElem, index) => {
                        return (
                          <tr key={index}>
                            <td className="table-text-style text-left">
                              {index + 1}
                            </td>
                            <td className="table-text-style">
                              {currElem.name}
                            </td>
                            <td className="table-text-style text-center">
                              {currElem.email}
                            </td>
                            <td className="table-text-style table-subject">
                              {currElem.subject}
                            </td>
                            <td className="table-text-style text-center ellipse two-lines">
                              {currElem.message}
                            </td>
                            <td className="table-text-style text-center">
                              {currElem.status}
                            </td>
                            <td className="table-text-style text-center">
                              {currElem.userType}
                            </td>
                            <td className="table-text-style text-center">
                              {getTime(currElem.createdAt)}
                            </td>
                            <td className="text-center">
                              <NavLink to={"/admin_edit_conatct_query"} className="table-text-style cursor-pointer"> <i className="fa fa-eye" /> </NavLink>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .mainLayout {
    height: 100vh;
    overflow-y: auto;
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
  .buttonStyle {
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    padding: 8px 18px 8px 18px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    font-size: 16px;
  }
  .noDataStyle {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  }

  .ellipse {
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .two-lines {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
  .width {
    width: 100px;
    border: 1px solid hotpink;
  }
  .table-subject{
    overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap;
  width: 100px; 
  height: 42px; 
  }
`;

export default ContactUs;
