import React, { useEffect, useState } from 'react'
import NavHeader from '../Components/NavHeader'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { webUrlList } from '../../Components/Constant'
import SideBar from '../Components/SideBar'
import { checkAuthRoute } from '../../../Database/Action/AdminAction'
import Lottie from "lottie-react";
import noApproved from "../../Components/not_approved.json";
import Loader from '../../Components/Loader'
import CategoryModal from '../Screens/Catlog/Model/CategoryModal'
import SubCategoryModal from '../Screens/Catlog/Model/SubCategoryModal'
import AttributeModal from '../Screens/Catlog/Model/AttributeModal'
import AttributeFamily from '../Screens/Catlog/Model/AttributeFamily'
import ColorModal from '../Screens/Catlog/Model/ColorModal'
import ProductMoodal from '../Screens/Catlog/Model/ProductMoodal'
import "../Styles/datatables.css"

const BaseActivity = ({ children }) => {
    const dispatch = useDispatch();
    const sideBarState = useSelector((state) => state.AdminReducer.sideBarState);
    const routeAuth = useSelector((state) => state.AdminReducer.routeAuth)
    const location = useLocation();
    const loader = useSelector((state) => state.AdminReducer.loader)
    const catLanState = useSelector((state) => state.ConstantReducer.catLanState);
    const subCatLanState = useSelector((state) => state.ConstantReducer.subCatLanState);
    const attrLanState = useSelector((state) => state.ConstantReducer.attrLanState);
    const attrFamilyLanState = useSelector((state) => state.ConstantReducer.attrFamilyLanState);
    const colorLanState = useSelector((state) => state.ConstantReducer.colorLanState);
    const proLanState = useSelector((state) => state.ConstantReducer.proLanState);

    // Fix: Add safety check for currentScreenName
    let currentScreenName = webUrlList.filter((currElem) => {
        return currElem.url === location.pathname
    });

    // Provide a default value if no match is found
    const currentScreen = currentScreenName.length > 0 ? currentScreenName[0] : { title: 'Page Not Found' };

    useEffect(() => {
        if (location.pathname !== "/admin_dashboard") {
            dispatch(checkAuthRoute({ url: location.pathname }));
        }
    }, [location, dispatch])

    return (
        <Wrapper>
            <div className={sideBarState === "fixed" ? "hold-transition sidebar-mini layout-fixed mainLayout" : "sidebar-mini layout-fixed sidebar-collapse mainLayout"}>
                <div className="">
                    {/* <!-- Navbar --> */}
                    <NavHeader />
                    {/* <!-- Main Side Bar --> */}
                    <SideBar />
                    {/* <!-- Main Content --> */}
                    <div className="content-wrapper">
                        {/* <!-- Content Header (Page header) --> */}
                        <div className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1 className="m-0">{currentScreen.title}</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item">
                                                <NavLink to="/admin_dashboard" href="#">Home</NavLink>
                                            </li>
                                            <li className="breadcrumb-item active">{currentScreen.title}</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /.content-header --> */}

                        {/* not authorized layout */}

                        <div className={routeAuth?.info === false ? "d-block bg-white" : "d-none"}>
                            <div className="noDataStyle">
                                <div>
                                    <Lottie
                                        className="lottieStyle"
                                        style={{ widows: "300px", height: "300px" }}
                                        animationData={noApproved}
                                        loop={true}
                                    />
                                    <h2>You are not authorized person</h2>
                                </div>

                            </div>
                        </div>
                        <div className={routeAuth?.info === false ? "d-none" : "d-block"}>
                            {loader && <Loader />}
                            <div style={loader ? { opacity: "0.2" } : {}}>
                                {catLanState && <CategoryModal />}
                                {subCatLanState && <SubCategoryModal />}
                                {attrLanState && <AttributeModal />}
                                {attrFamilyLanState && <AttributeFamily />}
                                {colorLanState && <ColorModal />}
                                {proLanState && <ProductMoodal />}
                                {children}
                            </div>
                        </div>

                        {/*  */}
                    </div>

                    {/* Admin Footer */}
                    {/* <NavFooter /> */}

                    <aside className="control-sidebar control-sidebar-dark">
                        {/* <!-- Control sidebar content goes here --> */}
                    </aside>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
.mainLayout {
  height: 100vh;
  overflow-y: auto;
}

.noDataStyle{
    position: absolute;
    height: 400px;
    display: flex;
    left: 45%;
    top: 35%;
  }
`;

export default BaseActivity