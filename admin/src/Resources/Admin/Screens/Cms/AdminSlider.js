import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSlider, setLoder } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css"
import { NavLink, useNavigate } from "react-router-dom";
import { postHeaderWithToken } from "../../../../Database/Utils";
import toast from "react-hot-toast";

const AdminSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const homeSlider = useSelector((state) => state.AdminReducer.homeSlider);

  const handleDeleteSlider = (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;

    if (!id) {
      toast.error("Failed! Slider id is empty");
      return;
    }

    let formData = new FormData();
    formData.append("id", id);

    dispatch(setLoder(true));
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "deleteSlider",
        formData,
        postHeaderWithToken
      )
      .then((response) => {
        dispatch(setLoder(false));
        if (response.data.status === 200) {
          toast.success(response?.data?.message);
          // Refresh the slider list
          dispatch(getAdminSlider());
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(setLoder(false));
        console.log("Delete slider error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong while deleting the slider.");
      });
  };

  useEffect(() => {
    dispatch(getAdminSlider());
  }, [dispatch]);

  useEffect(() => {
    if (homeSlider.length > 0) {
      setTimeout(() => {
        userListDatatables();
      }, 100);
    }
  }, [homeSlider]);

  return (
    <Wrapper>
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body mb-4">
                <div className='page-event'>
                  <NavLink to={"/admin_add_slider"} className='buttonStyle'>Create Slider</NavLink>
                </div>
                <table
                  id="datatable"
                  className="table table-bordered table-hover table-fixed"
                  style={{ width: "98%" }}
                >
                  <thead>
                    <tr>
                      <th className="col-1">Id</th>
                      <th className="col-2">Title</th>
                      <th className="col-3">Name</th>
                      <th className="col-2 text-center">Image</th>
                      <th className="col-2">CreatedBy</th>
                      <th className="col-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homeSlider.map((currElem, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-text-style">{currElem.id}</td>
                          <td className="table-text-style">{currElem.title}</td>
                          <td className="table-text-style">{currElem.productData?.[0]?.name || 'N/A'}</td>
                          <td className="table-text-style text-center">
                            <img 
                              className="imageStyle" 
                              src={process.env.REACT_APP_IMAGE_URL + currElem.avatar} 
                              alt={currElem.title}
                            />
                          </td>
                          <td className="table-text-style text-left">{currElem.createdBy}</td>
                          <td className="table-text-style text-center">
                            <NavLink 
                              to={"/admin_add_slider"}
                              state={{
                                id: currElem.id,
                                title: currElem.title,
                                type: currElem.type,
                                name: currElem.productData?.[0]?.name,
                                proSlug: currElem.productData?.[0]?.slug,
                                avatar: process.env.REACT_APP_IMAGE_URL + currElem.avatar
                              }}
                              className="table-text-style"
                            >
                              <i className="fa fa-edit" />
                            </NavLink>
                            <a
                              className="ml-2 table-text-style cursor-pointer"
                              onClick={() => handleDeleteSlider(currElem.id)}
                            >
                              <i className="fa fa-trash" />
                            </a>
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
  );
};

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
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    text-decoration: none;
  }
  .table-text-style:hover {
    color: #ff6000;
  }
  .cursor-pointer {
    cursor: pointer;
  }

  .page-event{
    width: 75%;
    margin-bottom: 20px;
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
      text-decoration: none;
      
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
  
  .imageStyle {
    width: 50px;
    height: 30px;
    object-fit: cover;
  }
`;

export default AdminSlider;