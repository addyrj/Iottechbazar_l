import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestApiData } from "../../../../Database/Action/AdminAction";
import styled from "styled-components";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import "../../Javascript/datatable.css"

const AdminShipment = () => {
  const dispatch = useDispatch();
  const testingApi = useSelector((state) => state.AdminReducer.testingApi);

  useEffect(() => {
    dispatch(getTestApiData());
  }, [dispatch]);

  useEffect(() => {
    if (testingApi.length !== 0) {
      userListDatatables();
    }
  }, [testingApi])

  return (
    <Wrapper>
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body mb-4">
                <table
                  id="datatable"
                  className="table table-bordered table-hover table-fixed"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className="col-1">Post</th>
                      <th className="col-1">Id</th>
                      <th className="col-3">Name</th>
                      <th className="col-3">Email</th>
                      <th className="col-4">Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testingApi.map((currElem, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-text-style">{currElem.postId}</td>
                          <td className="table-text-style">{currElem.id}</td>
                          <td className="table-text-style">{currElem.name}</td>
                          <td className="table-text-style">{currElem.email}</td>
                          <td className="table-text-style text-center">{currElem.body}</td>
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
`;

export default AdminShipment;
