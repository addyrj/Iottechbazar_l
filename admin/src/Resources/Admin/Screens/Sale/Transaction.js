import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistory, getTransactionSearchHistory } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import "../../Javascript/datatable.css"
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json";
import moment from "moment"
import isEmpty from "lodash.isempty";

const Transaction = () => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState({
        orderId: "",
        transactionId: ""
    })

    const transactionHistory = useSelector((state) => state.AdminReducer.transactionHistory);


    const getTime = (oldDate) => {
        var dateTime = new Date(oldDate);
        dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss a");
        return dateTime;
    }

    console.log(transactionHistory)

    const filterTransaction = (e) => {
        e.preventDefault();
        console.log(e)
        dispatch(getTransactionSearchHistory({ list: transactionHistory, searchInput: searchInput }))
        // if (isEmpty(searchInput.orderId) && isEmpty(searchInput.transactionId)) {
        //     toast.error("Failed! Search input is blank")
        // } else {
        //     dispatch(getTransactionSearchHistory({ list: transactionHistory, searchInput: searchInput }))
        // }
    }

    useEffect(() => {
        if (isEmpty(searchInput.orderId) && isEmpty(searchInput.transactionId)) {
            dispatch(getTransactionHistory());
        }
    }, [dispatch, searchInput]);

    // useEffect(() => {
    //     if (transactionHistory?.length !== 0) {
    //         transactionTables();
    //     }
    // }, [transactionHistory])

    return (
        <Wrapper>
            <section className="content">
                <div className="card ml-2 mr-2">
                    <div className="card-body">
                        <h4 style={{ color: "#409DB2", marginBottom: "15px" }}>Filter Transaction List:</h4>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">
                                        Order Id*
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="orderId"
                                        name="orderId"
                                        placeholder="Enter Order Id"
                                        value={searchInput.orderId}
                                        onChange={(e) => setSearchInput({ ...searchInput, orderId: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Transaction Id*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="transactionId"
                                        name="transactionId"
                                        placeholder="Enter Transaction Id"
                                        value={searchInput.transactionId}
                                        onChange={(e) => setSearchInput({ ...searchInput, transactionId: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" style={{ visibility: "hidden" }}>Model*</label>
                                    <button type="button" className="buttonStyle" onClick={(e) => filterTransaction(e)}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body mb-4">
                                <table
                                    id="transactionTables"
                                    className="table table-bordered table-hover table-striped table-fixed"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th className="col-1 text-left">Id</th>
                                            <th className="col-2">Name</th>
                                            <th className="col-2">Order Number</th>
                                            <th className="col-2">Transaction Id</th>
                                            <th className="col-1">Paid Amount</th>
                                            <th className="col-1 text-center">Payment Mode</th>
                                            <th className="col-1 text-center">Status</th>
                                            <th className="col-1">Created At</th>
                                            <th className="col-1">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionHistory.length === 0 ?
                                            <div className="noDataStyle">
                                                <Lottie
                                                    className="lottieStyle"
                                                    style={{ width: "300px", height: "300px" }}
                                                    animationData={noData}
                                                    loop={true}
                                                />
                                            </div>
                                            :
                                            transactionHistory?.slice(0, 10).map((currElem, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="table-text-style text-left">{index + 1}</td>
                                                        <td className="table-text-style">{currElem.notes.userName}</td>
                                                        <td className="table-text-style">{currElem.order_id}</td>
                                                        <td className="table-text-style text-center">{currElem.id}</td>
                                                        <td className="table-text-style text-center">₹{currElem.amount / 100}</td>
                                                        <td className="table-text-style text-center">{currElem.method}</td>
                                                        <td className="table-text-style text-center">{currElem.status}</td>
                                                        <td className="table-text-style text-center">{getTime(currElem.created_at)}</td>
                                                        <td className="table-text-style text-center cursor-pointer">
                                                            <i className="fa fa-eye" />
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
  .buttonStyle {
    width: 150px;
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
`;

export default Transaction;
