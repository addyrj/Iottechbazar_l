import React, { useEffect, useState } from 'react'
import logo from "../Assets/img/fav_logo.png"
import user from "../Assets/img/user2-160x160.jpg"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { toast } from "react-hot-toast"
import { Treeview } from '../Javascript/AdminMain'

const NavSideBar = () => {
    const location = useLocation();
    const navState = 1;
    const navigate = useNavigate();

    const logoutAdmin = () => {
        localStorage.removeItem("iottechAdminToken");
        navigate("/admin_login");
        toast.success("Logout successfull");
    }
    useEffect(() => {
        Treeview();
    }, [navState + 1, location])
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
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item nav-li-style">
                                <NavLink to={"/admin_dashboard"} className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>Dashboard</p>
                                </NavLink>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="#" className={location.pathname === "/admin_user_list" || location.pathname === "/admin_product_revies" || location.pathname === "/admin_cart" ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon fas fa-users"></i>
                                    <p>
                                        Customer
                                        <i className="fas fa-angle-left right"></i>
                                        <span className="badge badge-info right">6</span>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item nav-li-style">
                                        <NavLink to={"/admin_user_list"} className={location.pathname === "/admin_user_list" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Customers</p>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item nav-li-style">
                                        <NavLink to={"/admin_product_revies"} className={location.pathname === "/admin_product_revies" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Reviews</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to={"/admin_cart"} className={location.pathname === "/admin_cart" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Cart</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="#" className={location.pathname === "/admin_product" || location.pathname === "/admin_category" || location.pathname === "/admin_sub_category" || location.pathname === "/admin_attributes" || location.pathname === "/admin_family_attributes" || location.pathname === "/admin_color_variant" ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon fas fa-chart-pie"></i>
                                    <p>
                                        Catlog
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_product" className={location.pathname === "/admin_product" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Product</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_category" className={location.pathname === "/admin_category" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Category</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_sub_category" className={location.pathname === "/admin_sub_category" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Sub-Category</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_attributes" className={location.pathname === "/admin_attributes" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Attributes</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_family_attributes" className={location.pathname === "/admin_family_attributes" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Attributes Families</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_color_variant" className={location.pathname === "/admin_color_variant" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Color Variant</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="#" className={location.pathname === "/admin_order" || location.pathname === "/admin_shipment" ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon fas fa-tree"></i>
                                    <p>
                                        Sale
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_order" className={location.pathname === "/admin_order" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Order</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_shipment" className={location.pathname === "/admin_shipment" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Shipment</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="#" className={location.pathname === "/admin_contact_us" ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon fas fa-edit"></i>
                                    <p>
                                        Marketing
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_contact_us" className={location.pathname === "/admin_contact_us" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Contact Us</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="#" className={location.pathname === "/admin_refreal_pages" || location.pathname === "/admin_slider" || location.pathname === "/admin_blogs" ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon fas fa-table"></i>
                                    <p>
                                        CMS
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_refreal_pages" className={location.pathname === "/admin_refreal_pages" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Pages</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_slider" className={location.pathname === "/admin_slider" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Slider</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_blogs" className={location.pathname === "/admin_blogs" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Blog</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="#" className={location.pathname === "/admin_software" ? "nav-link active" : "nav-link"}>
                                    <i className="nav-icon far fa-envelope"></i>
                                    <p>
                                        Software
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_software" className={location.pathname === "/admin_software" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Softwares</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="#"
                                    className={"nav-link"}
                                //  className={location.pathname === "/admin_attributes" ? "nav-link active" : "nav-link"}
                                >
                                    <i className="nav-icon fas fa-book"></i>
                                    <p>
                                        ATL Equipments
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item nav-li-style">
                                        <a to="/admin_attributes" className={location.pathname === "/admin_attributes" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Category</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="#"
                                    className={location.pathname === "/admin_role" || location.pathname === "/admin_management" || location.pathname === "/admin_role_permission" || location.pathname === "/admin_general_setting" ? "nav-link active" : "nav-link"}
                                >
                                    <i className="nav-icon fas fa-book"></i>
                                    <p>
                                        Setting
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_role" className={location.pathname === "/admin_role" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Role</p>
                                        </NavLink>
                                    </li>
                                    {/* admin_role_permission */}
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_management" className={location.pathname === "/admin_management" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Management</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_role_permission" className={location.pathname === "/admin_role_permission" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Permission</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item nav-li-style">
                                        <NavLink to="/admin_general_setting" className={location.pathname === "/admin_general_setting" ? "nav-link active" : "nav-link"}>
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>General Setting</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item nav-li-style">
                                <a href="pages/calendar.html" className="nav-link">
                                    <i className="nav-icon far fa-calendar-alt"></i>
                                    <p>
                                        Transaction
                                        <span className="badge badge-info right">2</span>
                                    </p>
                                </a>
                            </li>

                            <li className="nav-item nav-li-style" onClick={() => logoutAdmin()}>
                                <a href="#" className="nav-link">
                                    <i className="nav-icon far fa-image"></i>
                                    <p>
                                        Logout
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
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

export default NavSideBar