/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useEffect, useState } from 'react'
import headerBg from "../../Assets/images/page-header-bg.jpg"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserAddress, getUserProfile } from '../../Database/Action/DashboardAction'
import Avatar from '../Components/Avatar'


const Profile = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { referPage } = location.state || {}
    const [profileState, setProfileState] = useState(referPage !== undefined ? 3 : 1);
    const addressList = useSelector((state) => state.DashboardReducer.userAddress);
    const userProfile = useSelector((state) => state.DashboardReducer.userProfile);

    const [userInfo, setUserInfo] = useState({
        name: userProfile?.profileInfo?.name,
        email: userProfile?.profileInfo?.email,
        contact: userProfile?.profileInfo?.contact,
        avatar: {}
    })

    const getAddressType = (addType) => {
        if (addType === 0) {
            return "Home";
        } else if (addType === 1) {
            return "Office";
        } else if (addType === 2) {
            return "Other"
        }
    }

    const handleProfileChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const logout = () => {
        localStorage.removeItem("iottechUserInfo");
        navigate("/register");
        window.location.reload(false);
    }

    useEffect(() => {
        setUserInfo({
            ...userInfo,
            name: userProfile?.profileInfo?.name,
            email: userProfile?.profileInfo?.email,
            contact: userProfile?.profileInfo?.contact,
        })
    }, [userProfile])


    useEffect(() => {
        dispatch(getUserAddress({ navigate: navigate }))
        dispatch(getUserProfile({ navigate: navigate }))
    }, [dispatch])

    return (
        <>
            <main className="main">
                <div
                    className="page-header text-center"
                    style={{ backgroundImage: `url(${headerBg})` }}
                >
                    <div className="container">
                        <h1 className="page-title">
                            My Account<span>Shop</span>
                        </h1>
                    </div>
                    {/* End .container */}
                </div>
                {/* End .page-header */}
                <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Shop</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                My Account
                            </li>
                        </ol>
                    </div>
                    {/* End .container */}
                </nav>
                {/* End .breadcrumb-nav */}
                <div className="page-content">
                    <div className="dashboard">
                        <div className="container">
                            <div className="row">
                                <aside className="col-md-4 col-lg-3">
                                    <ul
                                        className="nav nav-dashboard flex-column mb-3 mb-md-0"
                                        role="tablist"
                                    >
                                        <li className="nav-item">
                                            <a
                                                className={profileState === 1 ? "nav-link active cursor-pointer" : "nav-link cursor-pointer"}
                                                id="tab-dashboard-link"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="tab-dashboard"
                                                aria-selected="true"
                                                onClick={() => setProfileState(1)}
                                            >
                                                My Account
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={profileState === 2 ? "nav-link active cursor-pointer" : "nav-link cursor-pointer"}
                                                id="tab-orders-link"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="tab-orders"
                                                aria-selected="false"
                                                onClick={() => setProfileState(2)}

                                            >
                                                Orders
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a
                                                className={profileState === 3 ? "nav-link active cursor-pointer" : "nav-link cursor-pointer"}
                                                id="tab-address-link"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="tab-address"
                                                aria-selected="false"
                                                onClick={() => setProfileState(3)}

                                            >
                                                Adresses
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={profileState === 4 ? "nav-link active cursor-pointer" : "nav-link cursor-pointer"}
                                                id="tab-account-link"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="tab-account"
                                                aria-selected="false"
                                                onClick={() => setProfileState(4)}

                                            >
                                                Edit Profile
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={profileState === 5 ? "nav-link active cursor-pointer" : "nav-link cursor-pointer"}
                                                onClick={() => setProfileState(5)}
                                            >
                                                Sign Out
                                            </a>
                                        </li>
                                    </ul>
                                </aside>
                                {/* End .col-lg-3 */}
                                <div className="col-md-8 col-lg-9">
                                    <div className="tab-content">
                                        <div
                                            className={profileState === 1 ? "tab-pane fade show active" : "tab-pane fade"}
                                            id="tab-dashboard"
                                            role="tabpanel"
                                            aria-labelledby="tab-dashboard-link">
                                            <div className="col-lg-8">
                                                <div className="card card-dashboard">
                                                    <div className="card-body">
                                                        <div className='flex items-center justify-center'>
                                                            <Avatar width={80} height={80} name={userProfile?.profileInfo?.name} imageUrl={""} />
                                                        </div>
                                                        <p className='text-center'>
                                                            Name : {userProfile?.profileInfo?.name}
                                                            <br />
                                                            Contact : {userProfile?.profileInfo?.contact}
                                                            <br />
                                                            Email : {userProfile?.profileInfo?.email}
                                                            <br />
                                                            <a href="#">
                                                                Edit <i className="icon-edit" />
                                                            </a>
                                                        </p>
                                                    </div>
                                                    {/* End .card-body */}
                                                </div>
                                                {/* End .card-dashboard */}
                                            </div>
                                        </div>
                                        {/* .End .tab-pane */}
                                        <div
                                            className={profileState === 2 ? "tab-pane fade show active" : "tab-pane fade"}
                                            id="tab-orders"
                                            role="tabpanel"
                                            aria-labelledby="tab-orders-link"
                                        >
                                            <p>No order has been made yet.</p>
                                            <a href="category.html" className="btn btn-outline-primary-2">
                                                <span>GO SHOP</span>
                                                <i className="icon-long-arrow-right" />
                                            </a>
                                        </div>
                                        {/* .End .tab-pane */}
                                        <div
                                            className={profileState === 3 ? "tab-pane fade show active" : "tab-pane fade"}
                                            id="tab-downloads"
                                            role="tabpanel"
                                            aria-labelledby="tab-downloads-link"
                                        >
                                            <p>
                                                User Address
                                            </p>
                                            <div className="row">
                                                {addressList.length === 0 ?
                                                    <div className='col'>
                                                        <p>There are no address exist!</p>
                                                        <NavLink to={"/addAddress"} className="btn btn-outline-primary-2">
                                                            <span>Add Address</span>
                                                            <i className="icon-long-arrow-right" />
                                                        </NavLink>
                                                    </div>
                                                    :
                                                    addressList?.map((item, index) => {
                                                        return (
                                                            <div className="col-lg-4">
                                                                <div className="card card-dashboard">
                                                                    <div className="card-body">
                                                                        <input type="checkbox" className='float-right mb-2' checked={item.defautAddress === "true" ? true : false} />
                                                                        {/* End .card-title */}
                                                                        <p>
                                                                            Name : {item.name}
                                                                            <br />
                                                                            Contact : {item.contact}
                                                                            <br />
                                                                            Address : {item.address1}
                                                                            <br />
                                                                            {item.address2}{" "}{`(${item.pincode})`}
                                                                            <br />
                                                                            Addrss Type : {getAddressType(item.addressType)}
                                                                            <br />
                                                                            <a href="#">
                                                                                Edit <i className="icon-edit" />
                                                                            </a>
                                                                            <a href="#" className='ml-3'>
                                                                                Delete <i className="fa fa-trash" />
                                                                            </a>
                                                                        </p>
                                                                    </div>
                                                                    {/* End .card-body */}
                                                                </div>
                                                                {/* End .card-dashboard */}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <NavLink to={"/addAddress"} className="btn btn-outline-primary-2 float-right">
                                                <span>Add Address</span>
                                                <i className="icon-long-arrow-right" />
                                            </NavLink>
                                        </div>
                                        {/* .End .tab-pane */}
                                        <div
                                            className={profileState === 4 ? "tab-pane fade show active" : "tab-pane fade"}
                                            id="tab-address"
                                            role="tabpanel"
                                            aria-labelledby="tab-address-link"
                                            onClick={() => setProfileState(4)}
                                        >
                                            <div className="">
                                                <div className="card-body">
                                                    <div className="cart-title" style={{ fontWeight: "bold", fontSize: "18px" }}>Edit Profile</div>
                                                    <label>Name *</label>
                                                    <input
                                                        type="text"
                                                        name='name'
                                                        className="form-control"
                                                        value={userInfo.name}
                                                        onChange={handleProfileChange}
                                                    />
                                                    <label>Email *</label>
                                                    <input
                                                        type="text"
                                                        name='email'
                                                        className="form-control"
                                                        value={userInfo.email}
                                                        onChange={handleProfileChange}
                                                    />
                                                    <label>Contact *</label>
                                                    <input
                                                        type="text"
                                                        name='contact'
                                                        className="form-control"
                                                        value={userInfo.contact}
                                                        onChange={handleProfileChange}
                                                    />

                                                    <button type="submit" className="btn btn-outline-primary-2 mt-2">
                                                        <span>SAVE CHANGES</span>
                                                        <i className="icon-long-arrow-right" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* .End .tab-pane */}
                                        <div
                                            className={profileState === 5 ? "tab-pane fade show active" : "tab-pane fade"}
                                            id="tab-account"
                                            role="tabpanel"
                                            aria-labelledby="tab-account-link"
                                            onClick={() => setProfileState(5)}
                                        >
                                            <p>You just click button to logout!</p>
                                            <a href="#" className="btn btn-outline-primary-2"
                                                onClick={() => logout()}>
                                                <span>Logout</span>
                                                <i className="icon-long-arrow-right" />
                                            </a>
                                        </div>
                                        {/* .End .tab-pane */}
                                    </div>
                                </div>
                                {/* End .col-lg-9 */}
                            </div>
                            {/* End .row */}
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .dashboard */}
                </div>
                {/* End .page-content */}
            </main>
            {/* End .main */}
        </>

    )
}

export default Profile