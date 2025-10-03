import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProductReview } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css"
import { useNavigate, NavLink } from "react-router-dom"
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json";
import moment from "moment"

const AdminReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [proReviewData, setProReviewData] = useState([])
  const productReview = useSelector((state) => state.AdminReducer.productReview);

  const getDate = (oldDate) => {
    var dateTime = new Date(oldDate);
    dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss a");
    return dateTime;
  }

  useEffect(() => {
    dispatch(getAdminProductReview({ navigate: navigate }))
  }, [dispatch]);

  useEffect(() => {
    if (proReviewData.length !== 0) {
      userListDatatables();
    }
  }, [proReviewData])

  useEffect(() => {
    setProReviewData(productReview)
  }, [productReview])

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
                      <th>Id</th>
                      <th>Customer</th>
                      <th>Email/Contact</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Product Review</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productReview.length === 0 ?
                      <div className="noDataStyle">
                        <Lottie
                          className="lottieStyle"
                          style={{ width: "300px", height: "300px" }}
                          animationData={noData}
                          loop={true}
                        />
                      </div>
                      :
                      productReview.map((currElem, index) => {
                        return (
                          <tr key={index}>
                            <td className="table-text-style">{currElem.id}</td>
                            <td className="table-text-style">{currElem.customerName}</td>
                            <td className="table-text-style">{currElem.customerEmail}/ {currElem.customerContact}</td>
                            <td className="table-text-style">{currElem.productName}</td>
                            <td className="table-text-style">
                              <img
                                className="imageStyle text-center"
                                src={
                                  process.env.REACT_APP_IMAGE_URL +
                                  currElem.productImage
                                }
                                alt={currElem.productName}
                              />
                            </td>
                            <td className="table-text-style">{currElem.review}</td>
                            <td className="table-text-style text-center">{currElem.rating}</td>
                            <td className="table-text-style">{currElem.status}</td>
                            <td className="table-text-style">{getDate(currElem.createdAt)}</td>
                            <td className="table-text-style text-center">
                              <NavLink to="/admin_update_review" state={{
                                id: currElem.id,
                                rating: currElem.rating,
                                review: currElem.review,
                                status: currElem.status
                              }} className="cursor-pointer">
                                <i className="fa fa-edit cursor-pointer" />
                              </NavLink>
                            </td>
                          </tr>
                        )
                      })}
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
  .noDataStyle {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  }
  .imageStyle {
    width: 70px;
    height: 70px;
  }
`;

export default AdminReview;
