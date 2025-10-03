import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTrackLog } from "../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../Javascript/Datatbales.Main";
import "../Javascript/datatable.css"
import moment from "moment"

const AdminTrackLog = () => {
    const dispatch = useDispatch();
    const trackLog = useSelector((state) => state.AdminReducer.trackLog);
    const [trackLogData, setTackLogData] = useState([])

    const getDate = (oldDate) => {
        let date = new Date(oldDate);
        const formatDate = moment(date).format("DD/MM/YYYY, h:mm:ss a");
        return formatDate;
    }

    useEffect(() => {
        dispatch(getUserTrackLog());
    }, [dispatch]);

    useEffect(() => {
        if (trackLogData.length !== 0) {
            userListDatatables();
        }
    }, [trackLogData])

    useEffect(() => {
        setTackLogData(trackLog)
    }, [trackLog])

    return (
        <Wrapper>
            <section className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                            </div>
                            <div className="card-body mb-4">
                                <table
                                    id="datatable"
                                    className="table table-bordered table-hover table-fixed"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th >Id</th>
                                            <th >User Type</th>
                                            <th >Name</th>
                                            <th >Operation</th>
                                            <th >Contact</th>
                                            <th >Ip</th>
                                            <th >Platform</th>
                                            <th >Created At</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trackLog.map((currElem, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="table-text-style">{currElem.id}</td>
                                                    <td className="table-text-style">{currElem.role}</td>
                                                    <td className="table-text-style">{currElem.name}</td>
                                                    <td className="table-text-style">{currElem.accessType}</td>
                                                    <td className="table-text-style">{currElem.contact}</td>
                                                    <td className="table-text-style">{currElem.ip}</td>
                                                    <td className="table-text-style">{currElem.platform}</td>
                                                    <td className="table-text-style">{getDate(currElem.createdAt)}</td>
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
`;

export default AdminTrackLog;
