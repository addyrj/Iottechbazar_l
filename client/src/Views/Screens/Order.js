/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import headerBg from "../../Assets/images/page-header-bg.jpg"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { getOrder } from '../../Database/Action/DashboardAction'
import { userDataTable } from '../../Java/Datatable'
import moment from 'moment'

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userOrder = useSelector((state) => state.DashboardReducer.userOrder);
  const [orderList, setOrderList] = useState([])

  const getTime = (oldDate) => {
    var dateTime = new Date(oldDate);
    dateTime = moment(dateTime).format("DD-MM-YYYY");
    return dateTime;
  }

  useEffect(() => {
    if (orderList.length !== 0) {
      userDataTable();
    }
  }, [orderList])

  useEffect(() => {
    setOrderList(userOrder)
    console.log(localStorage.getItem("iottechUserInfo"))
  }, [userOrder])

  useEffect(() => {
    dispatch(getOrder({ navigate: navigate }))
  }, [dispatch])
  return (
    <Wrapper>
      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: `url(${headerBg})` }}
        >
          <div className="container">
            <h1 className="page-title">
              Orders
            </h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a>Shop</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Wishlist
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="container">
            <table id="datatable" className="table table-hover table-fixed">
              <thead>
                <tr style={{ backgroundColor: "#a6c76c" }}>
                  <th className='col-2 text-white text-center font-weight-bold'>Order No</th>
                  <th className='col-2 text-white text-center font-weight-bold mobileHeading'>No Of Product</th>
                  <th className='col-2 text-white text-center font-weight-bold'>Total</th>
                  <th className='col-2 text-white text-center font-weight-bold mobileHeading'>Order Date</th>
                  <th className='col-3 text-white text-center font-weight-bold'>Status</th>
                  <th className='col-1 text-white text-center font-weight-bold'>View</th>
                </tr>
              </thead>
              <tbody>
                {
                  orderList.map((currElem, index) => {
                    return (
                      <tr>
                        <td className='text-center textStyle' style={{ paddingLeft: "10px" }}>
                          {currElem.orderNumber}
                        </td>
                        <td className='mobileHeading text-center textStyle'>
                          {currElem.totalProduct}
                        </td>
                        <td className='text-center textStyle'>
                          ₹{currElem.totalAmount}
                        </td>
                        <td className='mobileHeading text-center textStyle'>
                          {getTime(currElem.createdAt)}
                        </td>
                        <td className={currElem.Status === "Success" ? "text-success text-center textStyle"
                          : currElem.Status === "Panding" ? "text-warning text-center textStyle" :
                            currElem.Status === "Cancel" ? "text-danger text-center textStyle" :
                              "text-primary text-center textStyle"} >
                          {currElem.status}
                        </td>
                        <td className='text-center textStyle'>
                          <NavLink to={"#"} className="cursor-pointer">
                            <i className='fa fa-eye' />
                          </NavLink>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Wrapper>

  )
}

const Wrapper = styled.section`
.textStyle {
    color: black;
    font-size: 12px;
    font-weight: bold;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
  .textStyle:hover {
    color: #ff6000;
  }
  table{
    border-spacing:  0px 10px;
  }
@media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobileHeading {
      display: none;
    }
    .mainLayout_active {
      margin-left: 0px;
    }
    .mainLayout {
      margin-left: 0px;
    }
  }
`;

export default Order