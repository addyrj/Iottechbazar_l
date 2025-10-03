import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import noImage from "../../Assets/img/no_image.png"
import Loader from '../../../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { getRole, setLoder } from "../../../../Database/Action/AdminAction"
import { postHeaderWithToken } from '../../../../Database/Utils';
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const AdminAddManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleList = useSelector((state) => state.AdminReducer.role);
  const loader = useSelector((state) => state.AdminReducer.loader);
  const [managerInfo, setManagerInfo] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    cnfPassword: "",
    image: {},
    role: ""
  })

  const addManager = async () => {
    const statusSelect = document.querySelector("#roleSelect");
    const statusOutput = statusSelect.options[statusSelect.selectedIndex].value;
    dispatch(setLoder(true));

    let formData = new FormData();
    formData.append("Name", managerInfo.name);
    formData.append("Email", managerInfo.email);
    formData.append("Contact", managerInfo.contact);
    formData.append("Role", statusOutput);
    formData.append("Address", managerInfo.address);
    formData.append("Password", managerInfo.password);
    formData.append("ConfirmPassword", managerInfo.cnfPassword);
    // managerInfo.image ? formData.append("avatar", managerInfo.image) : ""

    axios.post(process.env.REACT_APP_BASE_URL + "addManagement", formData, postHeaderWithToken)
      .then((res) => {
        dispatch(setLoder(false));
        toast.success(res?.data?.message);
        navigate("/admin_management")
      })
      .catch((error) => {
        console.log("error is     ", error)
        dispatch(setLoder(false));
        toast.error(error?.response?.data?.message || error.message)
      })

  }

  useEffect(() => {
    dispatch(getRole())
  }, [dispatch])

  return (
    <Wrapper>
      <section className="content">
        <div className="container-fluid">
          <div>
            {/* general form elements */}
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Manager Information</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="productName">Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter Manager Name"
                          value={managerInfo.name}
                          onChange={(e) => setManagerInfo({ ...managerInfo, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="productHindiName">Email*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Enter Manager Email"
                          value={managerInfo.email}
                          onChange={(e) => setManagerInfo({ ...managerInfo, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Contact*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="contact"
                          placeholder="Enter Manager Contact"
                          value={managerInfo.contact}
                          onChange={(e) => setManagerInfo({ ...managerInfo, contact: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Address*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Enter Manager Address"
                          value={managerInfo.address}
                          onChange={(e) => setManagerInfo({ ...managerInfo, address: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password*</label>
                        <input
                          type="password"
                          className="form-control"
                          id="pass"
                          placeholder="Enter Password"
                          value={managerInfo.password}
                          onChange={(e) => setManagerInfo({ ...managerInfo, password: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Confirm Password*</label>
                        <input
                          type="password"
                          className="form-control"
                          id="cnfPass"
                          placeholder="Enter Confirm Password"
                          value={managerInfo.cnfPassword}
                          onChange={(e) => setManagerInfo({ ...managerInfo, cnfPassword: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputFile">Product Primary Image*</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                              onChange={(e) => setManagerInfo({ ...managerInfo, image: e.target.files[0] })}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputFile"
                            >
                              Choose file
                            </label>
                          </div>
                          <div className="input-group-append">
                            <span className="input-group-text">Upload</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Select Role*</label>
                        <select
                          name="roleSelect"
                          id="roleSelect"
                          className="form-control select2" style={{ width: "100%" }}>
                          {roleList.map((currElem, index) => {
                            return (
                              <option key={index} value={currElem.slug}>{currElem.name}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer" style={{ marginTop: "-30px" }}>
                  <button type="button" className="buttonStyle" onClick={() => addManager()}>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
width: 100%;

.parentLayout{
  filter: blur(8px);
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
  .ql-snow.ql-toolbar button,
.ql-snow .ql-toolbar button {
  background: white;
  border: 1px solid gray;
  cursor: pointer;
  display: inline-block;
  margin-left: 5px;
  margin-top: 5px;
}
.ql-toolbar.ql-snow .ql-picker-label {
    border: 1px solid gray;
    margin-top: 5px;
    margin-left: 5px;
}
.ql-toolbar.ql-snow {
    border: 1px solid gray;
    background-color: #F6F5F5;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
}
`;

export default AdminAddManagement