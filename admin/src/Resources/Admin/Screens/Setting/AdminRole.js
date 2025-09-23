import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRole, getTestApiData } from '../../../../Database/Action/AdminAction';
import { userListDatatables } from '../../Javascript/Datatbales.Main';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import moment from "moment"

const AdminRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roleData, setRoleData] = useState([])
  const roleList = useSelector((state) => state.AdminReducer.role);
  const errorNavigation = useSelector((state) => state.AdminReducer.errorNavigation);

  const getDate = (oldDate) => {
    let date = new Date(oldDate);
    const formatDate = moment(date).format("DD/MM/YYYY, h:mm:ss a");
    return formatDate;
  }

  useEffect(() => {
    dispatch(getRole())
    if (errorNavigation === true) {
      navigate("/admin_login")
    }
  }, [dispatch]);

  useEffect(() => {
    if (roleData.length !== 0) {
      userListDatatables();
    }
  }, [roleData])

  useEffect(() => {
    setRoleData(roleList)
  }, [roleList])
  return (
    <Wrapper>
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body mb-4">

                <div className='page-event'>
                  <NavLink to={"/admin_add_role"} className='buttonStyle'>Add Role</NavLink>
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
                      <th className="col-2">AddedBy</th>
                      <th className="col-2 text-center">Status</th>
                      <th className="col-2">Create Date</th>
                      <th className="col-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleList?.map((currElem, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-text-style">{currElem.id}</td>
                          <td className="table-text-style">{currElem.name}</td>
                          <td className="table-text-style">{currElem.addedBy}</td>
                          <td className="table-text-style text-center">
                            <div className='statusStyle'>
                              {currElem.status}
                            </div>
                          </td>
                          <td className="table-text-style">{getDate(currElem.createTime)}</td>
                          <td className="table-text-style text-center">
                            <li className="nav-item dropdown" style={{ listStyleType: "none" }}>

                              <a className="nav-link" data-toggle="dropdown">
                                <i className="fa fa-cogs"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-2">
                                <NavLink to={"/admin_add_role"} className="dropdown-item mt-2 mb-1"
                                  state={{
                                    slug: currElem.slug,
                                    name: currElem.name,
                                    rolePermission: currElem.permission
                                  }}
                                >
                                  <div className="media">
                                    <i className="fa fa-edit text-primary" />
                                    <div className="media-body ml-2">
                                      <h3 className="dropdown-item-title">
                                        Edit Role*
                                      </h3>
                                    </div>
                                  </div>
                                </NavLink>
                                <div className="dropdown-divider" />

                                <a className="dropdown-item mt-2 mb-1" style={{ cursor: "pointer" }}>
                                  <div className="media"
                                  // onClick={() => deleteProduct(currElem.id, "/deleteProduct")}
                                  >
                                    <i className="fa fa-trash text-primary" />
                                    <div className="media-body ml-2">
                                      <h3 className="dropdown-item-title">
                                        Delete Role*
                                      </h3>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </li>
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
    height: 2rem;
    border-radius: 20px;
    color  : white;
    padding-top: 2px;
    cursor: pointer;
  }
`;


export default AdminRole