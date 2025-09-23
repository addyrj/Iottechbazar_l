/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeColorLanState, getColorVarinat, setLoder } from '../../../../Database/Action/AdminAction';
import { userListDatatables } from '../../Javascript/Datatbales.Main';
import styled from 'styled-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json"
import { postHeaderWithToken } from '../../../../Database/Utils';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminColorVariant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const colorVariant = useSelector((state) => state.AdminReducer.colorVariant)

    const [colorData, setColorData] = useState([])

    const deleteColorVariant = (slug) => {
        let formData = new FormData();
        formData.append("slug", slug)
        dispatch(setLoder(true));
        axios.post(process.env.REACT_APP_BASE_URL + "deleteColor", formData, postHeaderWithToken)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(setLoder(false));
                    navigate("/admin_color_variant");
                    toast.success(response?.data?.message)
                }
            })
            .catch((error) => {
                dispatch(setLoder(false));
                console.log("error is    ", error)
                toast.error(error?.response?.data?.message || error.message)
            })
    }
    useEffect(() => {
        dispatch(getColorVarinat({ navigate: navigate }))
    }, [dispatch, location.pathname]);

    useEffect(() => {
        if (colorData.length !== 0) {
            userListDatatables();
        }
    }, [colorData])

    useEffect(() => {
        setColorData(colorVariant)
    }, [colorVariant])

    return (
        <Wrapper>
            <>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body mb-4">
                                    <div className='page-event'>
                                        <NavLink to={"/admin_add_color_variant"} className='buttonStyle'>Create Color Variant</NavLink>
                                    </div>
                                    <table
                                        id="datatable"
                                        className="table table-bordered table-hover table-fixed"
                                        style={{ width: "100%" }}
                                    >
                                        {colorVariant?.length === 0 ? <div className='noDataStyle'>
                                            <Lottie className='lottieStyle' style={{ widows: "300px", height: "300px" }} animationData={noData} loop={true} />
                                        </div> :
                                            <>
                                                <thead>
                                                    <tr>
                                                        <th className="col-1">Id</th>
                                                        <th className="col-3">Name</th>
                                                        <th className="col-3">Value</th>
                                                        <th className="col-2">Added By</th>
                                                        <th className="col-2">Status</th>
                                                        <th className="col-1">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {colorVariant.map((currElem, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="table-text-style">{currElem.id}</td>
                                                                <td className="table-text-style">{currElem.name}</td>
                                                                <td className="table-text-style">{currElem.value}</td>
                                                                <td className="table-text-style">{currElem.createdBy}</td>
                                                                <td className="table-text-style">
                                                                    <div className='statusStyle'>{currElem.status}</div>
                                                                </td>
                                                                <td className="table-text-style text-center">
                                                                    <li className="nav-item dropdown" style={{ listStyleType: "none" }}>

                                                                        <a className="nav-link" data-toggle="dropdown">
                                                                            <i className="fa fa-cogs"></i>
                                                                        </a>
                                                                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-2">
                                                                            <NavLink to={"/admin_add_color_variant"} className="dropdown-item mt-2 mb-1"
                                                                                state={{
                                                                                    slug: currElem.slug,
                                                                                    name: currElem.name,
                                                                                    hiName: currElem.hiName,
                                                                                    value: currElem.value
                                                                                }}
                                                                            >
                                                                                <div className="media">
                                                                                    <i className="fa fa-edit text-primary" />
                                                                                    <div className="media-body ml-2">
                                                                                        <h3 className="dropdown-item-title">
                                                                                            Edit Color Varinat*
                                                                                        </h3>
                                                                                    </div>
                                                                                </div>
                                                                            </NavLink>
                                                                            <div className="dropdown-divider" />

                                                                            <a className="dropdown-item mt-2 mb-1" style={{ cursor: "pointer" }}>
                                                                                <div className="media"
                                                                                    onClick={() => deleteColorVariant(currElem.slug)}
                                                                                >
                                                                                    <i className="fa fa-trash text-primary" />
                                                                                    <div className="media-body ml-2">
                                                                                        <h3 className="dropdown-item-title">
                                                                                            Delete Color Variant*
                                                                                        </h3>
                                                                                    </div>
                                                                                </div>
                                                                            </a>

                                                                            <a className="dropdown-item mt-2 mb-1" style={{ cursor: "pointer" }}>
                                                                                <div className="media" onClick={() => dispatch(changeColorLanState({ colState: true, colSlug: currElem.slug }))}
                                                                                >
                                                                                    <i className="fa fa-language text-primary" />
                                                                                    <div className="media-body ml-2">
                                                                                        <h3 className="dropdown-item-title">
                                                                                            Add More Languages*
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
                                            </>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
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
    text-align: center;
    border-radius: 20px;
    color  : white;
    padding-top: 2px;
    cursor: pointer;
  }
  .noDataStyle{
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  }
`;

export default AdminColorVariant