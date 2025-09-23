import React, { useState } from 'react'
import styled from 'styled-components'
import { selectList, selectStatus } from '../../../Components/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setLoder } from '../../../../Database/Action/AdminAction'
import { postHeaderWithToken } from '../../../../Database/Utils'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminAddAttribue = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { name, hiName, slug } = location.state || {}
    const [attributeInfo, setAttributeInfo] = useState({
        name: name !== undefined ? name : "",
        hiName: hiName !== undefined ? hiName : "",
        url: location.pathname
    });

    const createAttribute = async () => {
        let formData = new FormData();
        formData.append("name", attributeInfo.name)
        formData.append("url", attributeInfo.url)
        dispatch(setLoder(true));
        axios.post(process.env.REACT_APP_BASE_URL + "addAtribute", formData, postHeaderWithToken)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(setLoder(false));
                    navigate("/admin_attributes");
                    toast.success(response?.data?.message)
                }
            })
            .catch((error) => {
                console.log("error is    ", error)
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message)
            })
    }

    const updateAttribute = async () => {
        let formData = new FormData();
        formData.append("name", attributeInfo.name)
        formData.append("slug", slug)
        dispatch(setLoder(true));
        axios.post(process.env.REACT_APP_BASE_URL + "updateAttribute", formData, postHeaderWithToken)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(setLoder(false));
                    navigate("/admin_attributes");
                    toast.success(response?.data?.message)
                }
            })
            .catch((error) => {
                console.log("error is    ", error)
                dispatch(setLoder(false));
                toast.error(error?.response?.data?.message || error.message)
            })
    }
    return (
        <Wrapper>
            {slug === undefined ?
                <section className="content">
                    <div className="container-fluid">
                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Create Attribute</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Attribute Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        placeholder="Enter Attribute Name"
                                                        value={attributeInfo.name}
                                                        onChange={(e) => setAttributeInfo({ ...attributeInfo, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Status</label>
                                                    <select className="form-control select2" style={{ width: "100%" }}>
                                                        {selectStatus.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem}>{currElem}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer" style={{ marginTop: "-20px" }}>
                                        <button type="button" className="buttonStyle" onClick={() => createAttribute()}>
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
                                    <h3 className="card-title">Update Attribute Family</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Attribute Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        placeholder="Enter Attribute Name"
                                                        value={attributeInfo.name}
                                                        onChange={(e) => setAttributeInfo({ ...attributeInfo, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Status</label>
                                                    <select className="form-control select2" style={{ width: "100%" }}>
                                                        {selectStatus.map((currElem, index) => {
                                                            return (
                                                                <option key={index} value={currElem}>{currElem}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer" style={{ marginTop: "-20px" }}>
                                        <button type="button" className="buttonStyle" onClick={() => updateAttribute()}>
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </section>}
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

export default AdminAddAttribue