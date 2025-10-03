import React, { useEffect } from 'react'
import noData from "../../../../Components/no_data.json"
import Lottie from "lottie-react";
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { getAppCountry } from '../../../../../Database/Action/AdminAction';
import { userListDatatables } from '../../../Javascript/Datatbales.Main';

const Country = () => {
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.AdminReducer.countryList);

  useEffect(() => {
    dispatch(getAppCountry())
  }, [dispatch])

  useEffect(() => {
    if (countryList.length !== 0) {
      userListDatatables();
    }
  }, [countryList])

  return (
    <Wrapper>
      <main>
        <div className="body_layout">
          <section className="content">
            {
              countryList?.length === 0 ?
                <div className="noDataLayout">
                  <Lottie
                    className="lottieStyle"
                    style={{ width: "300px", height: "300px" }}
                    animationData={noData}
                    loop={true}
                  />
                </div>
                :
                <table
                  id="datatable"
                  className="table table-bordered table-hover table-fixed"
                  style={{ width: "98%", margin: "0 auto 10px auto" }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Iso3</th>
                      <th>phonecode</th>
                      <th>currency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryList?.map((currElem, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-text-style">
                            <div className="nameTextStyle">
                              {currElem.name}
                            </div>
                          </td>

                          <td className="table-text-style">
                            {currElem.iso3}
                          </td>
                          <td className="table-text-style text-center">
                            +{currElem.phonecode}
                          </td>

                          <td className="table-text-style">
                            {currElem.currency}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
            }
          </section>
        </div>
      </main>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .header_layout{
    padding: 15px 0px 5px 20px;
  }
  .buttonStyle {
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
  .table-text-style {
    color: black;
    font-size: 1rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
  .table-text-style:hover {
    color: #ff6000;
  }
  .imageStyle {
    width: 50px;
    height: 30px;
  }
  .nameTextStyle {
    white-space: nowrap;
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
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
  .noDataLayout{
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header_layout_from{
    height: 3rem;
    background-color: #17a2b8;
  }
  .body_layout_form{
    padding: 10px 15px 5px 15px;
  }
  .body_layout{
    background-color: white;
  }

`;

export default Country