import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import toast from 'react-hot-toast';
import axios from 'axios';
import { postHeaderWithToken } from '../../../../Database/Utils';
import { setLoder } from '../../../../Database/Action/AdminAction';

const AdminAddColorVaraint = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { slug, name, value } = location.state || {}

    const [colorName, setColorName] = useState(name !== undefined ? name : "")
    const [colorValue, setColorValue] = useState(value !== undefined ? value : "")

    const createColor = async () => {
        let formData = new FormData();
        formData.append("name", colorName)
        formData.append("value", colorValue)
        formData.append("url", location.pathname)
        dispatch(setLoder(true));
        axios.post(process.env.REACT_APP_BASE_URL + "addColor", formData, postHeaderWithToken)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(setLoder(false));
                    navigate("/admin_color_variant");
                    toast.success(response?.data?.message)
                }
            })
            .catch((error) => {
                console.log("error is   ", error)
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message)
            })
    }

    const updateColor = async () => {
        let formData = new FormData();
        formData.append("name", name)
        formData.append("value", colorValue)
        formData.append("slug", slug)
        dispatch(setLoder(true));
        axios.post(process.env.REACT_APP_BASE_URL + "updateColor", formData, postHeaderWithToken)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(setLoder(false));
                    navigate("/admin_color_variant");
                    toast.success(response?.data?.message)
                }
            })
            .catch((error) => {
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message)
            })
    }

    return (
        <Wrapper>
            <>
                {slug === undefined ?
                    <section className="content">
                        <div className="container-fluid">
                            <div>
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Create Category</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Color Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            placeholder="Enter category name"
                                                            value={name}
                                                            onChange={(e) => setColorName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Choose Color</label>
                                                        <input
                                                            type="color"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            placeholder="Enter category name"
                                                            value={value}
                                                            onChange={(e) => setColorValue(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-20px" }}>
                                            <button type="button" className="buttonStyle" onClick={() =>
                                                colorName === undefined || colorName === "" ? toast.error("Failed! Enter Color name")
                                                    : createColor()
                                            }>
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
                                        <h3 className="card-title">Update Category</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Color Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            placeholder="Enter category name"
                                                            value={name}
                                                            onChange={(e) => setColorName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Choose Color</label>
                                                        <input
                                                            type="color"
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            placeholder="Enter category name"
                                                            value={value}
                                                            onChange={(e) => setColorValue(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{ marginTop: "-20px" }}>
                                            <button type="button" className="buttonStyle" onClick={() =>
                                                colorName === undefined || colorName === "" ? toast.error("Failed! Enter Color name")
                                                    : updateColor()
                                            }>
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>}
            </>
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
`;

export default AdminAddColorVaraint