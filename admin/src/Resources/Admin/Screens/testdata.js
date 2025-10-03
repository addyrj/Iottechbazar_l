import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { getAdminPermission, setLoder } from '../../../../Database/Action/AdminAction';
import Loader from '../../../Components/Loader';
import axios from 'axios';
import { postHeaderWithToken } from '../../../../Database/Utils';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom"

const AdminAddRole = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const permissionList = useSelector((state) => state.AdminReducer.permission);
    const loader = useSelector((state) => state.AdminReducer.loader);
    const { slug, name, rolePermission } = location.state || {};

    const [roleName, setRoleName] = useState(name);
    const [permission, setPermission] = useState(rolePermission !== undefined ? rolePermission !== null ? rolePermission : [] : []);

    const addRole = () => {
        let formData = new FormData();
        formData.append("Name", roleName);
        formData.append("Permission", JSON.stringify(permission))
        dispatch(setLoder(true));
        axios.post(process.env.REACT_APP_BASE_URL + "addRole", formData, postHeaderWithToken)
            .then((res) => {
                dispatch(setLoder(false));
                toast.success(res?.data?.message);
                navigate("/admin_role")
            })
            .catch((error) => {
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message)
            })
    }

    const addPermission = (slug) => {
        const checkPermission = permission.filter((item) => {
            return item === slug
        });
        if (checkPermission.length !== 0) {
            let index = permission.indexOf(slug);
            if (index !== -1) {
                permission.splice(index, 1);
            }
            setPermission(permission)
        } else {
            const array = permission.push(slug);
            setPermission(permission, array)
        }
        console.log(permission)
    }

    const updateRole = () => {
        let formData = new FormData();
        formData.append("Name", roleName);
        formData.append("slug", slug);
        formData.append("Permission", JSON.stringify(permission))
        dispatch(setLoder(true));
        axios.post(process.env.REACT_APP_BASE_URL + "updateRole", formData, postHeaderWithToken)
            .then((res) => {
                dispatch(setLoder(false));
                toast.success(res?.data?.message);
                navigate("/admin_role")
            })
            .catch((error) => {
                console.log(error)
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message)
            })
    }

    const defaultChecked = (slug) => {
        if (rolePermission !== null) {
            const checked = rolePermission.filter((item) => {
                return item === slug
            })
            if (checked.length === 0) {
                return false
            } else {
                return true;
            }
        }
    }
    useEffect(() => {
        dispatch(getAdminPermission());
    }, [dispatch]);

    return (
        <Wrapper>
            {loader === true ? <Loader /> : ""}
            <div className={loader === true ? "parentLayout" : ""}>
                {slug === undefined ?
                    <section className="content">
                        <div className="container-fluid">
                            <div>
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Create Role</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Role Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="Enter Role Name"
                                                    value={roleName}
                                                    onChange={(e) => setRoleName(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <div className='row'>
                                                    <label className='col-10 row' htmlFor="exampleInputEmail1">
                                                        Permissions
                                                        <input type="checkbox" className='checkboxStyle' style={{ marginLeft: "15px", width: "15px", height: "15px" }} />
                                                        <p style={{ fontSize: "16px", fontWeight: "500", marginLeft: "10px" }}>Select All</p>
                                                    </label>
                                                    <input className='col-2' type="text" placeholder='Serach Here' />
                                                </div>
                                                <div className='grid-container'>
                                                    {permissionList.map((item, index) => {
                                                        return (
                                                            <div className='grid-item row' key={index}>
                                                                <input type="checkbox" className='checkboxStyle' id={item.id} onClick={() => addPermission(item.slug)} />
                                                                <p style={{ fontSize: "18px", fontWeight: "500" }}>{item.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-30px" }}>
                                            <button type="button" className="buttonStyle" onClick={() => roleName === "" ? toast.error("Please enter role name") : permission.length === 0 ? toast.error("Please select at least one permission") : addRole()}>
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    :
                    <section className="content">
                        <div className="container-fluid">
                            <div>
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Update Role</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Role Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="Enter Role Name"
                                                    value={roleName}
                                                    onChange={(e) => setRoleName(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <div className='row'>
                                                    <label className='col-10 row' htmlFor="exampleInputEmail1">
                                                        Permissions
                                                        <input type="checkbox" className='checkboxStyle' style={{ marginLeft: "15px", width: "15px", height: "15px" }} />
                                                        <p style={{ fontSize: "16px", fontWeight: "500", marginLeft: "10px" }}>Select All</p>
                                                    </label>
                                                    <input className='col-2' type="text" placeholder='Serach Here' />
                                                </div>
                                                <div className='grid-container'>
                                                    {permissionList.map((item, index) => {
                                                        return (
                                                            <div className='grid-item row' key={index}>
                                                                <input type="checkbox" className='checkboxStyle' defaultChecked={defaultChecked(item.slug)} id={item.id} onClick={() => addPermission(item.slug)} />
                                                                <p style={{ fontSize: "18px", fontWeight: "500" }}>{item.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-30px" }}>
                                            <button type="button" className="buttonStyle"
                                                onClick={() => roleName === "" ? toast.error("Please enter role name")
                                                    : permission.length === 0 ? toast.error("Please select at least one permission") : updateRole()}>
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                }
            </div>
        </Wrapper>

    )
}

const Wrapper = styled.section`
.parentLayout{
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
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
  .grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.grid-item {
  padding: 20px;
  font-size: 30px;
  text-align: center;
  gap: 15px;
}
  .checkboxStyle{
    width: 20px;
    height: 20px;
    margin-top: 4px;
  }
`;

export default AdminAddRole