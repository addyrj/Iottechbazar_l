import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import headerBg from "../../Assets/images/page-header-bg.jpg"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from "react-redux"
import { getCountry, getState, setLoader } from '../../Database/Action/DashboardAction';
import isEmpty from "lodash.isempty"
import toast from "react-hot-toast"
import axios from "axios"
import { postHeaderWithToken } from "../../Database/ApiHeader"

const AddAddress = () => {
    const dispatch = useDispatch();
    const countryList = useSelector((state) => state.DashboardReducer.countryList);
    const stateList = useSelector((state) => state.DashboardReducer.stateList);
    const [stateData, setStateData] = useState([{ name: "Select State" }]);

    const getCountryList = () => {
        let newVal = [{ name: "Select Country..." }, ...countryList]
        return newVal;
    }

    const getStateList = (countryId) => {
        setAddressInfo({ ...addressInfo, country: countryId });

        const filterArray = stateList?.filter((item) => {
            return item.country_id === parseInt(countryId);
        });

        if (filterArray.length !== 0) {
            setStateData([{ name: "Select State" }].concat(filterArray));
        } else {
            setStateData([{ name: "Select State" }]);
        }
    };

    const country = getCountryList();

    const [addressInfo, setAddressInfo] = useState({
        fName: "",
        lName: "",
        email: "",
        contact: "",
        optional_contact: "",
        address1: "",
        address2: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        defaultAddress: "",
        addressType: ""
    })

    const hnadleInputChange = (e) => {
        setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value })
    }

    const addNewAddress = () => {
        if (isEmpty(addressInfo.fName)) {
            toast.error("Failed! Name is empty")
        } else if (isEmpty(addressInfo.contact)) {
            toast.error("Failed! Contact is empty")
        } else if (isEmpty(addressInfo.email)) {
            toast.error("Failed! Email is empty")
        } else if (isEmpty(addressInfo.address1)) {
            toast.error("Failed! Address1 is empty")
        } else if (isEmpty(addressInfo.address2)) {
            toast.error("Failed! Address2 is empty")
        } else if (isEmpty(addressInfo.pincode)) {
            toast.error("Failed! Pincode is empty")
        } else if (isEmpty(addressInfo.city)) {
            toast.error("Failed! City is empty")
        } else if (isEmpty(addressInfo.state)) {
            toast.error("Failed! State is empty")
        } else if (isEmpty(addressInfo.country)) {
            toast.error("Failed! Country is empty")
        } else if (isEmpty(addressInfo.defaultAddress)) {
            toast.error("Failed! Please select default address")
        } else if (isEmpty(addressInfo.addressType.toString())) {
            toast.error("Failed! Please select address type")
        } else {
            dispatch(setLoader(true))
            axios.post(process.env.REACT_APP_BASE_URL + "addAddress", addressInfo, postHeaderWithToken)
                .then((res) => {
                    dispatch(setLoader(false));
                    toast.success(res.data.message);
                })
                .catch((error) => {
                    console.log("error is   ", error)
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message)
                })
        }
    }

    useEffect(() => {
        dispatch(getCountry())
        dispatch(getState())
    }, [dispatch])

    return (
        <Wrapper>
            <main className="main">
                <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a>Pages</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Add Address
                            </li>
                        </ol>
                    </div>
                    {/* End .container */}
                </nav>
                {/* End .breadcrumb-nav */}
                <div
                    className="page-header text-center"
                    style={{ backgroundImage: `url(${headerBg})` }}
                >
                    <div className="container">
                        <h1 className="page-title">
                            Add New<span>Address</span>
                        </h1>
                    </div>
                    {/* End .container */}
                </div>
                {/* End .container */}
                <div className='page-content pb-0'>
                    <div className="tab-pane">
                        <form action="#">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>First Name *</label>
                                    <input type="text" name="fName" className="form-control" value={addressInfo.fName} onChange={hnadleInputChange} />
                                </div>
                                {/* End .col-sm-6 */}
                                <div className="col-sm-6">
                                    <label>Last Name *</label>
                                    <input type="text" name="lName" className="form-control" value={addressInfo.lName} onChange={hnadleInputChange} />
                                </div>
                                {/* End .col-sm-6 */}
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Contact *</label>
                                    <input type="number" min="0" name="contact" className="form-control" value={addressInfo.contact} onChange={hnadleInputChange} />
                                </div>
                                {/* End .col-sm-6 */}
                                <div className="col-sm-6">
                                    <label>Other Contact *</label>
                                    <input type="number" min="0" name="optional_contact" className="form-control" value={addressInfo.optional_contact} onChange={hnadleInputChange} />
                                </div>
                                {/* End .col-sm-6 */}
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Email *</label>
                                    <input type="email" name='email' className="form-control" value={addressInfo.email} onChange={hnadleInputChange} />
                                </div>
                                <div className="col-sm-6">
                                    <label>Address1 *</label>
                                    <input type="text" name='address1' className="form-control" value={addressInfo.address1} onChange={hnadleInputChange} />
                                </div>
                            </div>
                            <label>Address2</label>
                            <input type="text" name="address2" className="form-control" value={addressInfo.address2} onChange={hnadleInputChange} />

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>City *</label>
                                    <input type="text" name='city' className="form-control" value={addressInfo.city} onChange={hnadleInputChange} />
                                </div>
                                {/* End .col-sm-6 */}
                                <div className="col-sm-6">
                                    <label>Pin *</label>
                                    <input type="text" name='pincode' className="form-control" value={addressInfo.pincode} onChange={hnadleInputChange} />
                                </div>
                                {/* End .col-sm-6 */}
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Country</label>
                                    <select
                                        className="form-control select2"
                                        style={{ width: "100%" }}
                                        onChange={(e) => getStateList(e.target.value)}
                                    >
                                        {country?.map((currElem, index) => {
                                            return (
                                                <option key={index} value={currElem.id}>
                                                    {currElem.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className="col-sm-6">
                                    <label>State</label>
                                    <select
                                        className="form-control select2"
                                        style={{ width: "100%" }}
                                        onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
                                    >
                                        {stateData?.map((currElem, index) => {
                                            return (
                                                <option key={index} value={currElem.name}>
                                                    {currElem.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Address Type</label>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={0} control={<Radio size='large' />} label="Home" onChange={(e) => setAddressInfo({ ...addressInfo, addressType: e.target.value })} />
                                        <FormControlLabel value={1} control={<Radio size='large' />} label="Work" onChange={(e) => setAddressInfo({ ...addressInfo, addressType: e.target.value })} />
                                        <FormControlLabel value={2} control={<Radio size='large' />} label="Other" onChange={(e) => setAddressInfo({ ...addressInfo, addressType: e.target.value })} />
                                    </RadioGroup>
                                </div>
                                <div className="col-sm-6">
                                    <label>Default Address</label>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="true" control={<Radio size='large' />} label="Yes" onChange={(e) => setAddressInfo({ ...addressInfo, defaultAddress: e.target.value })} />
                                        <FormControlLabel value="false" control={<Radio size='large' />} label="No" onChange={(e) => setAddressInfo({ ...addressInfo, defaultAddress: e.target.value })} />
                                    </RadioGroup>
                                </div>
                            </div>
                            <button type="button" style={{ marginTop: "20px" }} className="btn btn-outline-primary-2"
                                onClick={() => addNewAddress()}>
                                <span>Add Address</span>
                                <i className="icon-long-arrow-right" />
                            </button>
                        </form>
                    </div>

                </div>
                {/* End .page-content */}
            </main>

        </Wrapper>
    )
}

const Wrapper = styled.section`
.tab-pane{
    width: 90%;
    margin: 0 auto 0 auto;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
`;
export default AddAddress