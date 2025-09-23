import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminCustomerList } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css";
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json";
import { useNavigate } from "react-router-dom";

const AdminUserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([])
  const customerList = useSelector((state) => state.AdminReducer.customerList);

  useEffect(() => {
    dispatch(getAdminCustomerList({ navigate: navigate }));
  }, [dispatch]);

  useEffect(() => {
    if (customerData.length !== 0) {
      userListDatatables();
    }
  }, [customerData]);

  useEffect(() => {
    setCustomerData(customerList)
  }, [customerList]);

  const statusStyle = (status) => {
    return (
      <div
        style={
          status === "true"
            ? {
              width: "90%",
              height: "35px",
              backgroundColor: "green",
              color: "white",
              borderRadius: "10px",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }
            : {
              width: "90%",
              height: "35px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "10px",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              ontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }
        }
      >
        {status}
      </div>
    );
  };

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
                      <th className="col-2">Name</th>
                      <th className="col-2">Email</th>
                      <th className="col-2 text-left">Contact</th>
                      <th className="col-2">Status</th>
                      <th className="col-1">Ip</th>
                      <th className="col-2">Last Login</th>
                      <th className="col-1 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerList.length === 0 ? (
                      <div className="noDataStyle">
                        <Lottie
                          className="lottieStyle"
                          style={{ width: "300px", height: "300px" }}
                          animationData={noData}
                          loop={true}
                        />
                      </div>
                    ) : (
                      customerList.map((currElem, index) => {
                        return (
                          <tr key={index}>
                            <td className="table-text-style">
                              {currElem.name}
                            </td>
                            <td className="table-text-style">
                              {currElem.email}
                            </td>
                            <td className="table-text-style text-left">
                              {currElem.contact}
                            </td>
                            <td className="table-text-style cursor-pointer">
                              {statusStyle(currElem.status)}
                            </td>
                            <td className="table-text-style">{currElem.ip}</td>
                            <td className="table-text-style">
                              {currElem.lastLogin}
                            </td>
                            <td className="table-text-style text-center">
                              <i className="fa fa-edit" />
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
  .noDataStyle {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  }
`;

export default AdminUserList;
