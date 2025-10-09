import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import headerBg from "../../Assets/images/page-header-bg.jpg"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from "react-redux"
import { getCountry, getState, setLoader, getUserAddress } from '../../Database/Action/DashboardAction';
import isEmpty from "lodash.isempty"
import toast from "react-hot-toast"
import axios from "axios"
import { postHeaderWithToken } from "../../Database/ApiHeader"
import { useLocation, useNavigate } from 'react-router-dom';

const EditAddress = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Debug logs
    console.log("Location state:", location.state);
    console.log("Address data:", location.state?.addressData);
    
    const addressData = location.state?.addressData;
    
    const countryList = useSelector((state) => state.DashboardReducer.countryList);
    const stateList = useSelector((state) => state.DashboardReducer.stateList);
    const [stateData, setStateData] = useState([{ name: "Select State" }]);

    // Split name into first and last name
    const getFirstName = () => {
        if (addressData?.name) {
            const nameParts = addressData.name.split(" ");
            return nameParts[0] || "";
        }
        return "";
    };

    const getLastName = () => {
        if (addressData?.name) {
            const nameParts = addressData.name.split(" ");
            return nameParts.slice(1).join(" ") || "";
        }
        return "";
    };

    // Pre-fill form with existing address data
    const [addressInfo, setAddressInfo] = useState({
        addressId: "",
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
        defaultAddress: "false",
        addressType: "0"
    });

    // Initialize form data when addressData is available
    useEffect(() => {
        if (addressData) {
            console.log("Setting address info:", addressData); // Debug log
            setAddressInfo({
                addressId: addressData.id || "",
                fName: getFirstName(),
                lName: getLastName(),
                email: addressData.email || "",
                contact: addressData.contact || "",
                optional_contact: addressData.optional_contact || "",
                address1: addressData.address1 || "",
                address2: addressData.address2 || "",
                pincode: addressData.pincode || "",
                city: addressData.city || "",
                state: addressData.state || "",
                country: addressData.country || "",
                defaultAddress: addressData.defaultAddress || "false",
                addressType: addressData.addressType?.toString() || "0"
            });
        }
    }, [addressData]);

    // Rest of your code remains the same...

    const handleInputChange = (e) => {
        setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value })
    }

    const updateAddress = () => {
        if (isEmpty(addressInfo.fName)) {
            toast.error("Failed! First Name is empty")
        } else if (isEmpty(addressInfo.lName)) {
            toast.error("Failed! Last Name is empty")
        } else if (isEmpty(addressInfo.contact)) {
            toast.error("Failed! Contact is empty")
        } else if (isEmpty(addressInfo.email)) {
            toast.error("Failed! Email is empty")
        } else if (isEmpty(addressInfo.address1)) {
            toast.error("Failed! Address1 is empty")
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
            
            const updateData = {
                addressId: addressInfo.addressId,
                name: addressInfo.fName + " " + addressInfo.lName,
                email: addressInfo.email,
                contact: addressInfo.contact,
                optional_contact: addressInfo.optional_contact,
                address1: addressInfo.address1,
                address2: addressInfo.address2,
                pincode: addressInfo.pincode,
                city: addressInfo.city,
                state: addressInfo.state,
                country: addressInfo.country,
                defaultAddress: addressInfo.defaultAddress,
                addressType: addressInfo.addressType
            };

            console.log("Sending update data:", updateData); // Debug log

            axios.post(process.env.REACT_APP_BASE_URL + "updateAddress", updateData, postHeaderWithToken)
                .then((res) => {
                    dispatch(setLoader(false));
                    if (res.data.status === 200) {
                        toast.success(res.data.message);
                        dispatch(getUserAddress({ navigate: navigate }));
                        navigate("/checkout");
                    } else {
                        toast.error(res.data.message || "Failed to update address");
                    }
                })
                .catch((error) => {
                    console.log("Update address error:", error)
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message || "Failed to update address")
                })
        }
    }

    // Load states based on existing country
    useEffect(() => {
        if (addressData?.country) {
            const filterArray = stateList?.filter((item) => {
                return item.country_id === parseInt(addressData.country);
            });

            if (filterArray.length !== 0) {
                setStateData([{ name: "Select State" }].concat(filterArray));
            }
        }
    }, [addressData, stateList]);

    useEffect(() => {
        dispatch(getCountry())
        dispatch(getState())
    }, [dispatch])

    // Redirect if no address data
    useEffect(() => {
        if (!addressData) {
            toast.error("No address data found");
            navigate("/checkout");
        }
    }, [addressData, navigate]);

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
                                Edit Address
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
                            Edit<span>Address</span>
                        </h1>
                    </div>
                </div>
                <div className='page-content pb-0'>
                    <div className="tab-pane">
                        <form action="#">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>First Name *</label>
                                    <input type="text" name="fName" className="form-control" value={addressInfo.fName} onChange={handleInputChange} />
                                </div>
                                <div className="col-sm-6">
                                    <label>Last Name *</label>
                                    <input type="text" name="lName" className="form-control" value={addressInfo.lName} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Contact *</label>
                                    <input type="number" min="0" name="contact" className="form-control" value={addressInfo.contact} onChange={handleInputChange} />
                                </div>
                                <div className="col-sm-6">
                                    <label>Other Contact</label>
                                    <input type="number" min="0" name="optional_contact" className="form-control" value={addressInfo.optional_contact} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Email *</label>
                                    <input type="email" name='email' className="form-control" value={addressInfo.email} onChange={handleInputChange} />
                                </div>
                                <div className="col-sm-6">
                                    <label>Address1 *</label>
                                    <input type="text" name='address1' className="form-control" value={addressInfo.address1} onChange={handleInputChange} />
                                </div>
                            </div>
                            
                            <label>Address2</label>
                            <input type="text" name="address2" className="form-control" value={addressInfo.address2} onChange={handleInputChange} />

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>City *</label>
                                    <input type="text" name='city' className="form-control" value={addressInfo.city} onChange={handleInputChange} />
                                </div>
                                <div className="col-sm-6">
                                    <label>Pin *</label>
                                    <input type="text" name='pincode' className="form-control" value={addressInfo.pincode} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Country</label>
                                    <select
                                        className="form-control select2"
                                        style={{ width: "100%" }}
                                        value={addressInfo.country}
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
                                        value={addressInfo.state}
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
                                        aria-labelledby="address-type-label"
                                        name="addressType"
                                        value={addressInfo.addressType}
                                        onChange={(e) => setAddressInfo({ ...addressInfo, addressType: e.target.value })}
                                    >
                                        <FormControlLabel value="0" control={<Radio size='large' />} label="Home" />
                                        <FormControlLabel value="1" control={<Radio size='large' />} label="Work" />
                                        <FormControlLabel value="2" control={<Radio size='large' />} label="Other" />
                                    </RadioGroup>
                                </div>
                                <div className="col-sm-6">
                                    <label>Default Address</label>
                                    <RadioGroup
                                        row
                                        aria-labelledby="default-address-label"
                                        name="defaultAddress"
                                        value={addressInfo.defaultAddress}
                                        onChange={(e) => setAddressInfo({ ...addressInfo, defaultAddress: e.target.value })}
                                    >
                                        <FormControlLabel value="true" control={<Radio size='large' />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio size='large' />} label="No" />
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button type="button" style={{ marginTop: "20px" }} className="btn btn-outline-primary-2"
                                    onClick={() => updateAddress()}>
                                    <span>Update Address</span>
                                    <i className="icon-long-arrow-right" />
                                </button>
                                <button type="button" style={{ marginTop: "20px", marginLeft: "10px" }} className="btn btn-outline-secondary-2"
                                    onClick={() => navigate("/checkout")}>
                                    <span>Cancel</span>
                                    <i className="icon-long-arrow-left" />
                                </button>
                            </div>
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
.btn-group{
    display: flex;
    gap: 10px;
}
`;

export default EditAddress