import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { getAdminPermissionFamily, setLoder } from '../../../../Database/Action/AdminAction';
import Loader from '../../../Components/Loader';
import axios from 'axios';
import { postHeaderWithToken } from '../../../../Database/Utils';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom"

const AdminAddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const permissionList = useSelector((state) => state.AdminReducer.permissionFamily);
  const loader = useSelector((state) => state.AdminReducer.loader);
  const { slug, name, rolePermission } = location.state || {};

  const [roleName, setRoleName] = useState(name || "");
  const [permission, setPermission] = useState(() => Array.isArray(rolePermission) ? [...rolePermission] : []);

  const selectAllRef = useRef(null);

  // keep permission in sync if rolePermission changes (edit-mode)
  useEffect(() => {
    setPermission(Array.isArray(rolePermission) ? [...rolePermission] : []);
  }, [rolePermission]);

  // update indeterminate state for Select All
  useEffect(() => {
    if (!selectAllRef.current) return;
    if (!permissionList || permissionList.length === 0) {
      selectAllRef.current.indeterminate = false;
      return;
    }
    if (permission.length === 0 || permission.length === permissionList.length) {
      selectAllRef.current.indeterminate = false;
    } else {
      selectAllRef.current.indeterminate = true;
    }
  }, [permission, permissionList]);

  const togglePermission = (slug) => {
    setPermission(prev =>
      prev.includes(slug) ? prev.filter(p => p !== slug) : [...prev, slug]
    );
  }

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const all = permissionList.map(p => p.slug);
      setPermission(all);
    } else {
      setPermission([]);
    }
  }

  const addRole = () => {
    let formData = new FormData();
    formData.append("Name", roleName);
    formData.append("Permission", JSON.stringify(permission));
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

  const updateRole = () => {
    let formData = new FormData();
    formData.append("Name", roleName);
    formData.append("slug", slug);
    formData.append("Permission", JSON.stringify(permission));
    dispatch(setLoder(true));
    axios.post(process.env.REACT_APP_BASE_URL + "updateRole", formData, postHeaderWithToken)
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

  useEffect(() => {
    dispatch(getAdminPermissionFamily());
  }, [dispatch]);

  return (
    <Wrapper>
      {slug === undefined ?
        <section className="content">
          <div className="container-fluid">
            <div>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Create Role</h3>
                </div>
                <form>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="roleName">Role Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="roleName"
                        placeholder="Enter Role Name"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <div className='row'>
                        <label className='col-10 row' htmlFor="selectAll">
                          Permissions
                          <input
                            type="checkbox"
                            id="selectAll"
                            ref={selectAllRef}
                            className='checkboxStyle'
                            style={{ marginLeft: "15px", width: "15px", height: "15px" }}
                            checked={permissionList.length > 0 && permission.length === permissionList.length}
                            onChange={handleSelectAllChange}
                          />
                          <p style={{ fontSize: "16px", fontWeight: "500", marginLeft: "10px" }}>Select All</p>
                        </label>
                        <input className='col-2' type="text" placeholder='Search Here' />
                      </div>

                      <div className='grid-container'>
                        {permissionList.map((item, index) => (
                          <div className='grid-item row' key={index}>
                            <input
                              type="checkbox"
                              className='checkboxStyle'
                              id={item.id}
                              checked={permission.includes(item.slug)}
                              onChange={() => togglePermission(item.slug)}
                            />
                            <p style={{ fontSize: "18px", fontWeight: "500" }}>{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer" style={{ marginTop: "-30px" }}>
                    <button
                      type="button"
                      className="buttonStyle"
                      onClick={() =>
                        roleName === "" ? toast.error("Please enter role name") :
                          permission.length === 0 ? toast.error("Please select at least one permission") :
                            addRole()
                      }
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        :
        <section className="content">
          <div className="container-fluid">
            <div>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Update Role</h3>
                </div>
                <form>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="roleName">Role Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="roleName"
                        placeholder="Enter Role Name"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <div className='row'>
                        <label className='col-10 row' htmlFor="selectAll">
                          Permissions
                          <input
                            type="checkbox"
                            id="selectAll"
                            ref={selectAllRef}
                            className='checkboxStyle'
                            style={{ marginLeft: "15px", width: "15px", height: "15px" }}
                            checked={permissionList.length > 0 && permission.length === permissionList.length}
                            onChange={handleSelectAllChange}
                          />
                          <p style={{ fontSize: "16px", fontWeight: "500", marginLeft: "10px" }}>Select All</p>
                        </label>
                        <input className='col-2' type="text" placeholder='Search Here' />
                      </div>

                      <div className='grid-container'>
                        {permissionList.map((item, index) => (
                          <div className='grid-item row' key={index}>
                            <input
                              type="checkbox"
                              className='checkboxStyle'
                              id={item.id}
                              checked={permission.includes(item.slug)}
                              onChange={() => togglePermission(item.slug)}
                            />
                            <p style={{ fontSize: "18px", fontWeight: "500" }}>{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer" style={{ marginTop: "-30px" }}>
                    <button
                      type="button"
                      className="buttonStyle"
                      onClick={() =>
                        roleName === "" ? toast.error("Please enter role name") :
                          permission.length === 0 ? toast.error("Please select at least one permission") :
                            updateRole()
                      }
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      }
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
  &:hover,
  &:active {
    background-color: white;
    border: #17a2b8 1px solid;
    color: black;
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
