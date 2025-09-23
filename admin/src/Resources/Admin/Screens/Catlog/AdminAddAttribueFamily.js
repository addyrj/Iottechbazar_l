import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { selectStatus } from '../../../Components/Constant'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAttributeData, setLoder } from '../../../../Database/Action/AdminAction';
import { postHeaderWithToken } from '../../../../Database/Utils';
import axios from 'axios';
import isEmpty from 'lodash.isempty';

const AdminAddAttribueFamily = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const attributeData = useSelector((state) => state.AdminReducer.attributeData)

  const { name, slug } = location.state || {}
  const [attributeFamilyInfo, setAttributeFamilyInfo] = useState({
    name: name !== undefined ? name : "",
    url: location.pathname
  });

  const createAttributeFamily = () => {
    const statusSelect = document.querySelector("#attribute");
    const statusOutput = statusSelect.options[statusSelect.selectedIndex].value;
    if (isEmpty(statusOutput)) {
      toast.error("Failed! Please select attribute")
    } else if (isEmpty(attributeFamilyInfo.name)) {
      toast.error("Failed! Please enetr attribute family name")
    } else if (isEmpty(attributeFamilyInfo.url)) {
      toast.error("Failed! url is not found")
    } else {
      dispatch(setLoder(false));
      let formData = new FormData();
      formData.append("attributeSlug", statusOutput)
      formData.append("name", attributeFamilyInfo.name)
      formData.append("url", attributeFamilyInfo.url)

      axios.post(process.env.REACT_APP_BASE_URL + "addAttributeFamily", formData, postHeaderWithToken)
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(setLoder(false));
            navigate("/admin_family_attributes");
            toast.success(response?.data?.message)
          }
        })
        .catch((error) => {
          console.log("error is    ", error)
          dispatch(setLoder(false));
          toast.error(error?.response?.data?.message || error.message)
        })
    }
  }

  const updateAttributeFamily = () => {
    if (isEmpty(attributeFamilyInfo.name)) {
      toast.error("Failed! Please enetr attribute family name")
    } else {
      dispatch(setLoder(false));
      let formData = new FormData();
      formData.append("slug", slug)
      formData.append("name", attributeFamilyInfo.name)

      axios.post(process.env.REACT_APP_BASE_URL + "updateAttributeFamily", formData, postHeaderWithToken)
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(setLoder(false));
            navigate("/admin_family_attributes");
            toast.success(response?.data?.message)
          }
        })
        .catch((error) => {
          console.log("error is    ", error)
          dispatch(setLoder(false));
          toast.error(error?.response?.data?.message || error.message)
        })
    }
  }

  useEffect(() => {
    dispatch(getAttributeData())
  }, [dispatch])

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
                    <h3 className="card-title">Create Attribute Family</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form>
                    <div className="card-body">

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Attriute*</label>
                            <select className="form-control select2" id='attribute' name='attribute' style={{ width: "100%" }}>
                              {attributeData?.map((currElem, index) => {
                                return (
                                  <option key={index} value={currElem.slug}>{currElem.name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Attribtue Family Name*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter Attribute Family Name"
                              value={attributeFamilyInfo.name}
                              onChange={(e) => setAttributeFamilyInfo({ ...attributeFamilyInfo, name: e.target.value })}
                            />
                          </div>
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Select Status*</label>
                            <select className="form-control select2" style={{ width: "100%" }}>
                              {selectStatus.map((currElem, index) => {
                                return (
                                  <option key={index} value={currElem}>{currElem}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Value (Optional)*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Attribute Value"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                    {/* /.card-body */}
                    <div className="card-footer" style={{ marginTop: "-20px" }}>
                      <button type="button" className="buttonStyle" onClick={() => createAttributeFamily()}>
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
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Attribtue Family Name*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter Attribute Family Name"
                              value={attributeFamilyInfo.name}
                              onChange={(e) => setAttributeFamilyInfo({ ...attributeFamilyInfo, name: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Value (Optional)*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Attribute Family Hindi Name"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Select Status*</label>
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
                      <button type="button" className="buttonStyle" onClick={() => updateAttributeFamily()}>
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

export default AdminAddAttribueFamily