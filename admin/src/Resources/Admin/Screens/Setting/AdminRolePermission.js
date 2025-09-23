import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAdminPermissionFamily } from '../../../../Database/Action/AdminAction';
import { userListDatatables } from '../../Javascript/Datatbales.Main';
import styled from 'styled-components';

const AdminRolePermission = () => {
    const dispatch = useDispatch();
    const [permissionData, setPermissionData] = useState([])
    const permissionList = useSelector((state) => state.AdminReducer.permissionFamily);

    useEffect(() => {
        dispatch(getAdminPermissionFamily());
    }, [dispatch]);

    useEffect(() => {
        if (permissionData.length !== 0) {
            userListDatatables();
        }
    }, [permissionData])

    useEffect(() => {
        setPermissionData(permissionList)
    }, [permissionList])

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
                                    <thead className='haedStyle'>
                                        <tr>
                                            <th className="col-1">Id</th>
                                            <th className="col-2 text-center">Group</th>
                                            <th className="col-2 text-center">Name</th>
                                            <th className="col-2 text-center">Added By</th>
                                            <th className="col-2 text-center">Status</th>
                                            <th className="col-2 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permissionList.map((currElem, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="table-text-style">{currElem.id}</td>
                                                    <td className="table-text-style text-center">{currElem.group}</td>
                                                    <td className="table-text-style text-center">{currElem.name}</td>
                                                    <td className="table-text-style text-center">{currElem.addedBy}</td>
                                                    <td className="table-text-style text-center">{currElem.status}</td>
                                                    <td className="table-text-style text-center">
                                                        <i className='fa fa-edit mr-3' />
                                                        <i className='fa fa-trash' />
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
  }
  .table-text-style:hover {
    color: #ff6000;
  }
.selectStyle_false{
    background-color: transparent;
    border-color: red;
    color: red;
  }
  .selectStyle_true{
    background-color: transparent;
    border-color: green;
    color: green;
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
`;


export default AdminRolePermission