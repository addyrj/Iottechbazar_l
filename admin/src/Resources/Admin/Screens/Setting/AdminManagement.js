import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getManager } from '../../../../Database/Action/AdminAction';
import { userListDatatables } from '../../Javascript/Datatbales.Main';
import styled from 'styled-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader';

const AdminManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [managementData, setManagementData] = useState([])
    const managerList = useSelector((state) => state.AdminReducer.manager);

    useEffect(() => {
        dispatch(getManager({ navigate }))
    }, [location, dispatch]);

    useEffect(() => {
        if (managementData.length !== 0) {
            userListDatatables();
        }
    }, [managementData])

    useEffect(() => {
        setManagementData(managerList)
    }, [managerList])

    return (
        <Wrapper>
            <section className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body mb-4">

                                <div className='page-event'>
                                    <NavLink to={"/admin_add_management"} className='buttonStyle'>Create Manager</NavLink>
                                </div>
                                <table
                                    id="datatable"
                                    className="table table-bordered table-hover table-fixed"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th className="col-1">Id</th>
                                            <th className="col-3">Name</th>
                                            <th className="col-2">Role</th>
                                            <th className="col-2 text-left">Status</th>
                                            <th className="col-2 text-center">Added By</th>
                                            <th className="col-2 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {managerList.map((currElem, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="table-text-style">{currElem.id}</td>
                                                    <td className="table-text-style">{currElem.name}</td>
                                                    <td className="table-text-style">{currElem.role}</td>
                                                    <td className="table-text-style text-center">
                                                        <div className='statusStyle'>{currElem.status}</div>
                                                    </td>
                                                    <td className="table-text-style text-center">{currElem.addedBy}</td>
                                                    <td className="table-text-style text-center">
                                                        <div>
                                                            <i className='fa fa-edit' />
                                                            <i className='fa fa-trash' />
                                                        </div>
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
    )
}

const Wrapper = styled.section`
.parentLayout{
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
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
  .page-event{
    position: absolute;
    width: 75%;
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    z-index: 999;
    gap: 20px;

    .buttonStyle{
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
  }
  .statusStyle{
    background-color: green;
    color: white;
    height: 2rem;
    padding-top: 2px;
    border-radius: 25px;
    cursor: pointer;
  }
`;


export default AdminManagement