import React, { useState } from 'react'
import styled from 'styled-components'
import { ratingList, selectList, selectStatus } from '../../../Components/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import { setLoder } from '../../../../Database/Action/AdminAction'
import { postHeaderWithToken } from '../../../../Database/Utils'
import axios from 'axios'
import toast from 'react-hot-toast'
import { quilToolbarOption } from '../../Constants/Constant'
import ReactQuill from "react-quill";
import "../../../../../node_modules/react-quill/dist/quill.snow.css";

const AdminUpdateReview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { rating, review, status, id } = location.state || {}
    const [reviewInfo, setReviewInfo] = useState({
        review: review !== undefined ? review : "",
        rating: rating !== undefined ? rating : "",
        status: status !== undefined ? status : ""
    });

    const module = {
        toolbar: quilToolbarOption,
    };

    const updateReview = async () => {
        let formData = new FormData();
        formData.append("id", id)
        formData.append("rating", reviewInfo.rating)
        formData.append("review", reviewInfo.review)
        formData.append("status", reviewInfo.status)
        dispatch(setLoder(true));
        axios.post(process.env.REACT_APP_BASE_URL + "updateProductReview", formData, postHeaderWithToken)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(setLoder(false));
                    navigate("/admin_product_revies");
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
            <section className="content">
                <div className="container-fluid">
                    <div>
                        {/* general form elements */}
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Update Product Review</h3>
                                <NavLink to="/admin_product_revies" className="float-right cursor-pointer">
                                    <i className='fa fa-arrow-left text-white' />
                                </NavLink>
                            </div>
                            {/* /.card-header */}
                            {/* form start */}
                            <form>
                                <div className="card-body">
                                    <div className="card card-outline card-info">
                                        <div className="card-header">
                                            <h3
                                                className="card-title"
                                                style={{ fontWeight: "700" }}
                                            >
                                                Offer*
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <ReactQuill
                                                theme="snow"
                                                id="proOffer"
                                                value={reviewInfo.review}
                                                modules={module}
                                                onChange={(value) => setReviewInfo({ ...reviewInfo, review: value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Rating</label>
                                                <select className="form-control select2" style={{ width: "100%" }}
                                                    defaultValue={rating} onChange={(e) => setReviewInfo({ ...reviewInfo, rating: e.target.value })}>
                                                    {ratingList.map((currElem, index) => {
                                                        return (
                                                            <option key={index} value={currElem}>{currElem}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Select Status</label>
                                                <select className="form-control select2" style={{ width: "100%" }}
                                                    defaultValue={status} onChange={(e) => setReviewInfo({ ...reviewInfo, status: e.target.value })}>
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
                                    <button type="button" className="buttonStyle" onClick={() => updateReview()}>
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* /.container-fluid */}
            </section>
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

export default AdminUpdateReview