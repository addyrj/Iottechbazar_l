import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import isEmpty from 'lodash.isempty'
import toast from 'react-hot-toast'
import axios from 'axios'
import { postHeaderWithToken } from '../../../../Database/Utils'
import "../../../../../node_modules/react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { quilToolbarOption } from "../../Constants/Constant";
import { setLoder } from '../../../../Database/Action/AdminAction'

const EditContactUsQuery = () => {
    return (
        <Wrapper>
            <>
                <section className="content">
                    <div className="container-fluid">
                        <div>
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Contact Enquiry</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form>
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="pageTitle">User Name*</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="pageTitle"
                                                        name="pageTitle"
                                                        disabled
                                                        placeholder="Enter Page Title"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">
                                                        User Email*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="pageurl"
                                                        name="pageurl"
                                                        disabled
                                                        placeholder="Enter Page Url"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer" style={{ marginTop: "-30px" }}>
                                        <button type="button" className="buttonStyle">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </section>
            </>
        </Wrapper >
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

export default EditContactUsQuery