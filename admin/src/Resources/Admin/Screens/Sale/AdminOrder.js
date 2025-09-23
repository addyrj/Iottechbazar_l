import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrder, getOrderStatusTitle, setLoder } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css"
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json";
import moment from "moment"
import toast from "react-hot-toast"
import axios from "axios"
import { postHeaderWithToken } from "../../../../Database/Utils";
import { orderTitle } from "../../../Components/CustomList";
import { useNavigate } from "react-router-dom"

const AdminOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminOrder = useSelector((state) => state.AdminReducer.order);
  // const orderTitle = useSelector((state) => state.AdminReducer.orderStatusTitle);

  const getTime = (oldDate) => {
    var dateTime = new Date(oldDate);
    dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss a");
    return dateTime;
  }

  const chnageOrderStatus = (value, id, number) => {
    let formData = new FormData();
    formData.append("orderId", id)
    formData.append("orderNumber", number)
    formData.append("status", value)
    dispatch(setLoder(true));
    axios.post(process.env.REACT_APP_BASE_URL + "changeOrderStatus", formData, postHeaderWithToken)
      .then((response) => {
        if (response.data.status === 200) {
          dispatch(setLoder(false));
          toast.success(response?.data?.message)
        }
      })
      .catch((error) => {
        dispatch(setLoder(false));
        console.log("error is    ", error)
        toast.error(error?.response?.data?.message || error.message)
      })
  }

  useEffect(() => {
    dispatch(getAdminOrder({ navigate: navigate }));
    dispatch(getOrderStatusTitle({ navigate: navigate }))
  }, [dispatch]);

  useEffect(() => {
    if (adminOrder.length !== 0) {
      userListDatatables();
    }
  }, [adminOrder])

  return (
    <Wrapper>
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body mb-4">
                <div className="row float-right mb-4">
                  <button className="buttonStyle" style={{ backgroundColor: "#358597" }}>Pending</button>
                  <button className="buttonStyle" style={{ backgroundColor: "#23272B" }}>Approved</button>
                  <button className="buttonStyle" style={{ backgroundColor: "#3E3E65" }}>Process</button>
                  <button className="buttonStyle" style={{ backgroundColor: "#DC3545" }}>Cancel</button>
                  <button className="buttonStyle" style={{ backgroundColor: "#4CA746" }}>Completed</button>
                </div>
                <table
                  id="datatable"
                  className="table table-bordered table-hover table-striped table-fixed"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="col-1 text-left">Order Id</th>
                      <th className="col-2">Name</th>
                      <th className="col-1 text-center">Contact</th>
                      <th className="col-1">Total Amount</th>
                      <th className="col-1">Payment Mode</th>
                      <th className="col-1">Transaction Status</th>
                      <th className="col-2 text-center">Status</th>
                      <th className="col-2">Created At</th>
                      <th className="col-1">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminOrder.length === 0 ?
                      <div className="noDataStyle">
                        <Lottie
                          className="lottieStyle"
                          style={{ width: "300px", height: "300px" }}
                          animationData={noData}
                          loop={true}
                        />
                      </div>
                      :
                      adminOrder.map((currElem, index) => {
                        return (
                          <tr key={index}>
                            <td className="table-text-style text-left">{currElem.orderNumber}</td>
                            <td className="table-text-style">{currElem.name}</td>
                            <td className="table-text-style text-center">{currElem.contact}</td>
                            <td className="table-text-style">₹{currElem.totalAmount}</td>
                            <td className="table-text-style text-center">{currElem.paymentMode === "1" ? "Online" : "COD"}</td>
                            <td className="table-text-style text-center">{currElem.transactionStatus}</td>
                            <td className="table-text-style text-center">
                              <select className="form-control select2" style={{ width: "100%" }} defaultValue={currElem.status} onChange={(e) => chnageOrderStatus(e.target.value, currElem.id, currElem.orderNumber)}>
                                {orderTitle.map((item) => {
                                  return (
                                    <option key={index} value={item}>{item}</option>
                                  )
                                })}
                              </select>
                            </td>
                            <td className="table-text-style text-center">{getTime(currElem.createdAt)}</td>
                            <td className="table-text-style text-center cursor-pointer">
                              <i className="fa fa-eye mr-2" />
                              <i className="fa fa-print" />
                            </td>
                          </tr>
                        );
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
  .buttonStyle{
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
`;

export default AdminOrder;
