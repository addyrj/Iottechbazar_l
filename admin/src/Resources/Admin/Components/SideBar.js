import React from 'react'
import logo from "../Assets/img/fav_logo.png"
import user from "../Assets/img/user2-160x160.jpg"
import { NavLink, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import CustomNavSidebar from './CustomNavSidebar'

const SideBar = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <NavLink to={"/admin_dashboard"} className="brand-link">
                    <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: "0.8" }} />
                    <span className="brand-text font-weight-bold">Iottech Bazaar</span>
                </NavLink>
                {/* <!-- Sidebar --> */}
                <div className="sidebar">
                    {/* <!-- Sidebar user panel (optional) --> */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={user} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Admin</a>
                        </div>
                    </div>

                    {/* <!-- SidebarSearch Form --> */}
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Sidebar Menu --> */}
                    <CustomNavSidebar />
                </div>
            </aside>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  .nav-li-style {
    margin-left: 5px;
  }
`;

export default SideBar