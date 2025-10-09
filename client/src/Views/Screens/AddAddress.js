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
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countryList = useSelector((state) => state.DashboardReducer.countryList);
    const stateList = useSelector((state) => state.DashboardReducer.stateList);
    const [stateData, setStateData] = useState([{ name: "Select State" }]);

    const getCountryList = () => {
        let newVal = [{ name: "Select Country...", id: "" }, ...countryList]
        return newVal;
    }

    const getStateList = (countryId) => {
        setAddressInfo({ ...addressInfo, country: countryId, state: "" }); // Reset state when country changes

        if (!countryId) {
            setStateData([{ name: "Select State" }]);
            return;
        }

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
        defaultAddress: "false", // Set default value
        addressType: "0" // Set default value
    })

    const handleInputChange = (e) => {
        setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value })
    }

    const handleRadioChange = (name, value) => {
        setAddressInfo({ ...addressInfo, [name]: value })
    }

    const validateForm = () => {
        if (isEmpty(addressInfo.fName.trim())) {
            toast.error("Failed! First Name is required");
            return false;
        }
        if (isEmpty(addressInfo.lName.trim())) {
            toast.error("Failed! Last Name is required");
            return false;
        }
        if (isEmpty(addressInfo.contact.trim())) {
            toast.error("Failed! Contact is required");
            return false;
        }
        if (isEmpty(addressInfo.email.trim())) {
            toast.error("Failed! Email is required");
            return false;
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(addressInfo.email)) {
            toast.error("Failed! Please enter a valid email address");
            return false;
        }
        if (isEmpty(addressInfo.address1.trim())) {
            toast.error("Failed! Address Line 1 is required");
            return false;
        }
        if (isEmpty(addressInfo.pincode.trim())) {
            toast.error("Failed! Pincode is required");
            return false;
        }
        if (isEmpty(addressInfo.city.trim())) {
            toast.error("Failed! City is required");
            return false;
        }
        if (isEmpty(addressInfo.state.trim()) || addressInfo.state === "Select State") {
            toast.error("Failed! State is required");
            return false;
        }
        if (isEmpty(addressInfo.country.trim()) || addressInfo.country === "") {
            toast.error("Failed! Country is required");
            return false;
        }
        if (isEmpty(addressInfo.defaultAddress)) {
            toast.error("Failed! Please select default address option");
            return false;
        }
        if (isEmpty(addressInfo.addressType.toString())) {
            toast.error("Failed! Please select address type");
            return false;
        }
        return true;
    }

    const addNewAddress = () => {
        if (!validateForm()) {
            return;
        }

        dispatch(setLoader(true));
        
        // Prepare data for API
        const submitData = {
            ...addressInfo,
            // Convert empty optional_contact to null
            optional_contact: addressInfo.optional_contact.trim() || null,
            address2: addressInfo.address2.trim() || null
        };

        console.log("Submitting address data:", submitData); // Debug log

        axios.post(process.env.REACT_APP_BASE_URL + "addAddress", submitData, postHeaderWithToken)
            .then((res) => {
                dispatch(setLoader(false));
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    // Navigate back or clear form
                    navigate(-1); // Go back to previous page
                    // Alternatively, clear the form:
                    // setAddressInfo({
                    //     fName: "",
                    //     lName: "",
                    //     email: "",
                    //     contact: "",
                    //     optional_contact: "",
                    //     address1: "",
                    //     address2: "",
                    //     pincode: "",
                    //     city: "",
                    //     state: "",
                    //     country: "",
                    //     defaultAddress: "false",
                    //     addressType: "0"
                    // });
                } else {
                    toast.error(res.data.message || "Failed to add address");
                }
            })
            .catch((error) => {
                console.log("Error adding address:", error);
                dispatch(setLoader(false));
                
                // Handle specific error cases
                if (error.response?.data?.errors) {
                    // Show validation errors from backend
                    error.response.data.errors.forEach(err => {
                        toast.error(`${err.field}: ${err.message}`);
                    });
                } else {
                    toast.error(error?.response?.data?.message || error.message || "Failed to add address");
                }
            })
    }

    useEffect(() => {
        dispatch(getCountry());
        dispatch(getState());
    }, [dispatch]);

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
                </nav>

                <div
                    className="page-header text-center"
                    style={{ backgroundImage: `url(${headerBg})` }}
                >
                    <div className="container">
                        <h1 className="page-title">
                            Add New<span>Address</span>
                        </h1>
                    </div>
                </div>

                <div className='page-content pb-0'>
                    <div className="tab-pane">
                        <form onSubmit={(e) => { e.preventDefault(); addNewAddress(); }}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>First Name *</label>
                                    <input 
                                        type="text" 
                                        name="fName" 
                                        className="form-control" 
                                        value={addressInfo.fName} 
                                        onChange={handleInputChange} 
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label>Last Name *</label>
                                    <input 
                                        type="text" 
                                        name="lName" 
                                        className="form-control" 
                                        value={addressInfo.lName} 
                                        onChange={handleInputChange} 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Contact *</label>
                                    <input 
                                        type="tel" 
                                        name="contact" 
                                        className="form-control" 
                                        value={addressInfo.contact} 
                                        onChange={handleInputChange}
                                        pattern="[0-9]{10}"
                                        title="Please enter a 10-digit phone number"
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label>Other Contact (Optional)</label>
                                    <input 
                                        type="tel" 
                                        name="optional_contact" 
                                        className="form-control" 
                                        value={addressInfo.optional_contact} 
                                        onChange={handleInputChange}
                                        pattern="[0-9]{10}"
                                        title="Please enter a 10-digit phone number"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Email *</label>
                                    <input 
                                        type="email" 
                                        name='email' 
                                        className="form-control" 
                                        value={addressInfo.email} 
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label>Address Line 1 *</label>
                                    <input 
                                        type="text" 
                                        name='address1' 
                                        className="form-control" 
                                        value={addressInfo.address1} 
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <label>Address Line 2 (Optional)</label>
                            <input 
                                type="text" 
                                name="address2" 
                                className="form-control" 
                                value={addressInfo.address2} 
                                onChange={handleInputChange} 
                            />

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>City *</label>
                                    <input 
                                        type="text" 
                                        name='city' 
                                        className="form-control" 
                                        value={addressInfo.city} 
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label>Pincode *</label>
                                    <input 
                                        type="text" 
                                        name='pincode' 
                                        className="form-control" 
                                        value={addressInfo.pincode} 
                                        onChange={handleInputChange}
                                        pattern="[0-9]{6}"
                                        title="Please enter a 6-digit pincode"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Country *</label>
                                    <select
                                        className="form-control select2"
                                        style={{ width: "100%" }}
                                        value={addressInfo.country}
                                        onChange={(e) => getStateList(e.target.value)}
                                        required
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
                                    <label>State *</label>
                                    <select
                                        className="form-control select2"
                                        style={{ width: "100%" }}
                                        value={addressInfo.state}
                                        onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
                                        required
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
                                    <label>Address Type *</label>
                                    <RadioGroup
                                        row
                                        aria-labelledby="address-type-label"
                                        name="addressType"
                                        value={addressInfo.addressType}
                                        onChange={(e) => handleRadioChange("addressType", e.target.value)}
                                    >
                                        <FormControlLabel value="0" control={<Radio size='large' />} label="Home" />
                                        <FormControlLabel value="1" control={<Radio size='large' />} label="Work" />
                                        <FormControlLabel value="2" control={<Radio size='large' />} label="Other" />
                                    </RadioGroup>
                                </div>
                                <div className="col-sm-6">
                                    <label>Default Address *</label>
                                    <RadioGroup
                                        row
                                        aria-labelledby="default-address-label"
                                        name="defaultAddress"
                                        value={addressInfo.defaultAddress}
                                        onChange={(e) => handleRadioChange("defaultAddress", e.target.value)}
                                    >
                                        <FormControlLabel value="true" control={<Radio size='large' />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio size='large' />} label="No" />
                                    </RadioGroup>
                                </div>
                            </div>
                            
                            <button type="submit" style={{ marginTop: "20px" }} className="btn btn-outline-primary-2">
                                <span>Add Address</span>
                                <i className="icon-long-arrow-right" />
                            </button>
                        </form>
                    </div>
                </div>
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

.form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

.select2 {
    width: 100% !important;
}
`;
export default AddAddress;