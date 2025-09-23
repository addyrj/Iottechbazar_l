import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminCsutomerCart } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css"
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json";
import { useNavigate } from "react-router-dom"
import moment from "moment"

const AdminCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([])
  const cartList = useSelector((state) => state.AdminReducer.cartList);

  const getTime = (oldDate) => {
    var dateTime = new Date(oldDate);
    dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss a");
    return dateTime;
  }

  useEffect(() => {
    dispatch(getAdminCsutomerCart({ navigate: navigate }))
  }, [dispatch]);

  useEffect(() => {
    if (cartData.length !== 0) {
      userListDatatables();
    }
  }, [cartData])

  useEffect(() => {
    setCartData(cartList)
  }, [cartList])

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
                  style={{ width: "98%" }}
                >
                  <thead>
                    <tr>
                      <th className="col-2">User</th>
                      <th className="col-2">Contact/Email</th>
                      <th className="col-2">Product</th>
                      <th className="col-1">Price</th>
                      <th className="col-1">Qty</th>
                      <th className="col-1">Total</th>
                      <th className="col-2">Created At</th>
                      <th className="col-1">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList.length === 0 ?
                      <div className="noDataStyle">
                        <Lottie
                          className="lottieStyle"
                          style={{ width: "300px", height: "300px" }}
                          animationData={noData}
                          loop={true}
                        />
                      </div>
                      :
                      cartList.map((currElem, index) => {
                        return (
                          <tr key={index}>
                            <td className="table-text-style">{currElem.userName}</td>
                            <td className="table-text-style">{currElem.userEmail} <br /> {currElem.userContact}</td>
                            <td className="table-text-style">{currElem.cartName}</td>
                            <td className="table-text-style">₹{currElem.cartSellPrice}</td>
                            <td className="table-text-style text-center">{currElem.cartCount}</td>
                            <td className="table-text-style text-center">₹{currElem.cartItemtotalSellPrice}</td>
                            <td className="table-text-style text-center">{getTime(currElem.createdAt)}</td>
                            <td className="table-text-style text-center"><i className="fa fa-cogs" /></td>
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
  .noDataStyle {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  }
`;

export default AdminCart;
