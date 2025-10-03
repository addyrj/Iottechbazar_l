import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminBlogs, setLoder } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css"
import { NavLink } from "react-router-dom"
import moment from "moment"
import { postHeaderWithToken } from "../../../../Database/Utils";
import toast from "react-hot-toast";
import axios from "axios";

const HtmlToReactParser = require("html-to-react").Parser;

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState([]);
  const adminBlogs = useSelector((state) => state.AdminReducer.adminBlogs);
  const statusList = ["true", "false"]

  const getTime = (oldDate) => {
    var dateTime = new Date(oldDate);
    dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss a");
    return dateTime;
  }

  const getHtmlText = (html) => {
    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(html);
    return reactElement;
  };

  // Delete Blog Function using direct axios
  const handleDeleteBlog = (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    if (!id) {
      toast.error("Failed! Blog id is empty");
      return;
    }

    let formData = new FormData();
    formData.append("id", id);

    dispatch(setLoder(true));

    axios
      .post(
        process.env.REACT_APP_BASE_URL + "deleteBlog",
        formData,
        postHeaderWithToken
      )
      .then((response) => {
        dispatch(setLoder(false));
        console.log("Delete response:", response.data);

        if (response.data.status === 200) {
          toast.success(response?.data?.message);
          // Refresh the blog list
          dispatch(getAdminBlogs());
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(setLoder(false));
        console.log("Delete blog error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong while deleting the blog.");
      });
  };

  useEffect(() => {
    dispatch(getAdminBlogs())
  }, [dispatch]);

  useEffect(() => {
    if (blogData.length !== 0) {
      userListDatatables();
    }
  }, [blogData])

  useEffect(() => {
    setBlogData(adminBlogs)
  }, [adminBlogs])

  return (
    <Wrapper>
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body mb-4">
                <div className='page-event'>
                  <NavLink to={"/admin_add_blogs"} className='buttonStyle'>Create Blogs</NavLink>
                </div>
                <table
                  id="datatable"
                  className="table table-bordered table-hover table-fixed"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="col-2">Title</th>
                      <th className="col-3">Desc</th>
                      <th className="col-1">Image</th>
                      <th className="col-2">Status</th>
                      <th className="col-1">Added</th>
                      <th className="col-2">Created At</th>
                      <th className="col-1">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminBlogs.map((currElem, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-text-style">{currElem.title}</td>
                          <td className="table-text-style">{getHtmlText(currElem.description)}</td>
                          <td className="table-text-style text-center">
                            <img
                              className="imageStyle"
                              src={process.env.REACT_APP_IMAGE_URL + currElem.avatar}
                              alt={currElem.title}
                            />
                          </td>
                          <td className="table-text-style">
                            <select className="form-control select2" style={{ width: "100%" }} defaultValue={currElem.status}>
                              {statusList.map((item, itemIndex) => {
                                return (
                                  <option key={itemIndex} value={item}>{item}</option>
                                )
                              })}
                            </select>
                          </td>
                          <td className="table-text-style text-center">{currElem.createdBy}</td>
                          <td className="table-text-style">{getTime(currElem.createdAt)}</td>
                          <td className="table-text-style text-center">

                            <NavLink
                              to={"/admin_add_blogs"}
                              state={{ blogData: currElem }} 
                              className="table-text-style cursor-pointer"
                            >
                              <i className="fa fa-edit mr-2" />
                            </NavLink>
                            <a
                              className="table-text-style cursor-pointer"
                              onClick={() => handleDeleteBlog(currElem.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </td>
                        </tr>
                      )
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

export default AdminBlogs;