import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { mobileMenuArrow, mobileMenuToggle } from '../../Java/Main'
import { useLocation, useNavigate } from 'react-router-dom'
import MobileMenu from '../Components/MobileMenu'
import LoginModal from '../Components/LoginModal'
import $ from "jquery"
import Loader from '../Components/Loader'
import { useDispatch, useSelector } from "react-redux"
import { getAllCategory, getAllLanguages } from '../../Database/Action/DashboardAction'


const BaseActivity = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loader = useSelector((state) => state.DashboardReducer.loader)

    const menuCloseMobile = () => {
        $('body').removeClass('mmenu-active');
        $('.menu-toggler').removeClass('active');
    }
    useEffect(() => {
        menuCloseMobile();
        mobileMenuArrow();
        mobileMenuToggle();
    }, [location])

    useEffect(() => {
        dispatch(getAllLanguages())
        dispatch(getAllCategory())
    }, [dispatch])

    useEffect(() => {
        const userInfo = localStorage.getItem("iottechUserInfo");
        console.log(userInfo)
        // if (userInfo !== null) {
        //     dispatch(checkLoginSession({ navigate: navigate }))
        // }
    }, [dispatch])
    return (
        <>
            <div className="page-wrapper">
                <Header />
                {/* End Header */}

                {loader && <Loader />}

                <div className={loader ? "opacity-15" : ""}>
                    {children}
                </div>
                {/* End Body */}

                <Footer />
                {/* End Footer  */}
            </div>

            <button id="scroll-top" title="Back to Top">
                <i className="icon-arrow-up" />
            </button>
            {/* Mobile Menu */}
            <div className="mobile-menu-overlay" />
            {/* End .mobil-menu-overlay */}
            <MobileMenu />
            {/* End .mobile-menu-container */}
            <LoginModal />
            {/* Sign in / Register Modal */}

            {/* End .modal */}
        </>
    )
}

export default BaseActivity