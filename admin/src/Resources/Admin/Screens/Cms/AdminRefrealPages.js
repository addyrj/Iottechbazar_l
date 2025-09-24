import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminLegalPages, setLoder } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css"
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json";
import isEmpty from "lodash.isempty";
import axios from "axios";
import { postHeaderWithToken } from "../../../../Database/Utils";
import toast from "react-hot-toast";

const AdminRefrealPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [legalData, setLegalData] = useState([])
  const legalPageList = useSelector((state) => state.AdminReducer.legalPageList);
  const statusList = ["true", "false"]

  const changeLegalPageStatus = (status, id) => {
    if (isEmpty(status)) {
      toast.error("Failed! Status is empty")
    } else if (isEmpty(id.toString())) {
      toast.error("Failed! id is empty")
    } else {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("status", status);
      dispatch(setLoder(true));
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "changePageStatus",
          formData,
          postHeaderWithToken
        )
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(setLoder(false));
            navigate("/admin_refreal_pages");
            toast.success(response?.data?.message);
          }
        })
        .catch((error) => {
          dispatch(setLoder(false));
          console.log("error is  ", error)
          toast.error(error?.response?.data?.message || error.message);
        });
    }
  }

    const deleteLegalPage = (id) => {
    if (!id) {
      toast.error("Failed! id is empty");
      return;
    }

    let formData = new FormData();
    formData.append("id", id);

    dispatch(setLoder(true));
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "deleteLegalPage",
        formData,
        postHeaderWithToken
      )
      .then((response) => {
        dispatch(setLoder(false));
        if (response.data.status === 200) {
          toast.success(response?.data?.message);
          // refresh list
          dispatch(getAdminLegalPages({ navigate: navigate }));
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(setLoder(false));
        console.log("error is ", error);
        toast.error(error?.response?.data?.message || error.message);
      });
  };


  useEffect(() => {
    dispatch(getAdminLegalPages({ navigate: navigate }))
  }, [dispatch]);

  useEffect(() => {
    if (legalData.length !== 0) {
      userListDatatables();
    }
  }, [legalData])

  useEffect(() => {
    setLegalData(legalPageList)
  }, [legalPageList])

  return (
    <Wrapper>
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body mb-4">
                <div className='page-event'>
                  <NavLink to={"/admin_add_legal_page"} className='buttonStyle'>Create Page</NavLink>
                </div>
                <table
                  id="datatable"
                  className="table table-bordered table-hover table-fixed"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="col-1">Id</th>
                      <th className="col-3">Title</th>
                      <th className="col-2">Url</th>
                      <th className="col-2">Status</th>
                      <th className="col-2">AddedBy</th>
                      <th className="col-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {legalPageList?.length === 0 ?
                      <div className="noDataStyle">
                        <Lottie
                          className="lottieStyle"
                          style={{ width: "300px", height: "300px" }}
                          animationData={noData}
                          loop={true}
                        />
                      </div>
                      :
                      legalPageList.map((currElem, index) => {
                        return (
                          <tr key={index}>
                            <td className="table-text-style">{currElem.id}</td>
                            <td className="table-text-style">{currElem.title}</td>
                            <td className="table-text-style">{currElem.url}</td>
                            <td className="table-text-style">
                              <select className="form-control select2" style={{ width: "100%" }} defaultValue={currElem.status} onChange={(e) => changeLegalPageStatus(e.target.value, currElem.id)}>
                                {statusList.map((item) => {
                                  return (
                                    <option key={index} value={item}>{item}</option>
                                  )
                                })}
                              </select>
                            </td>
                            <td className="table-text-style text-center">{currElem.createdBy}</td>
                            <td className="table-text-style text-center">
                              <NavLink to="/admin_add_legal_page" state={{
                                id: currElem.id,
                                title: currElem.title,
                                url: currElem.url,
                                value: currElem.value
                              }} className="table-text-style cursor-pointer"> <i className="fa fa-edit mr-2" /></NavLink>
                            <a
  className="table-text-style cursor-pointer"
  onClick={() => deleteLegalPage(currElem.id)}
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
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
  .table-text-style:hover {
    color: #ff6000;
  }
  .noDataStyle {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
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
`;

export default AdminRefrealPages;
