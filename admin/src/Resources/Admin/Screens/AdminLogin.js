import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../Components/Button";
import bg3 from "../Assets/img/bg_3.jpg";
import { Treeview } from "../Javascript/AdminMain";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { adminLogin, errorNavigation } from "../../../Database/Action/AdminAction";

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [adminInfo, setAdminInfo] = useState({
        email: "",
        password: "",
        navigate: navigate,
    });
    useEffect(() => {
        Treeview();
        dispatch(errorNavigation(false))
    }, []);
    return (
        <Wrapper>
            <div className="parentView" style={{ backgroundImage: `url(${bg3})` }}>
                <img src={bg3} className="imageStyle" />
                <div className="childView">
                    <div className="login-box">
                        {/* /.login-logo */}
                        <div className="card card-outline card-primary">
                            <div className="card-header text-center">
                                <a className="h1">
                                    <b>IoTtech</b>Bazaar
                                </a>
                            </div>
                            <div className="card-body">
                                <p className="login-box-msg h5" style={{ marginTop: "-10px" }}>
                                    Sign in to start your session
                                </p>
                                <form>
                                    <div className="input-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            value={adminInfo.email}
                                            onChange={(e) =>
                                                setAdminInfo({ ...adminInfo, email: e.target.value })
                                            }
                                        />

                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            value={adminInfo.password}
                                            onChange={(e) =>
                                                setAdminInfo({ ...adminInfo, password: e.target.value })
                                            }
                                        />

                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"></div>
                                        {/* /.col */}
                                        <div className="col-7">
                                            <Button
                                                type="button"
                                                className="btn btn-primary btn-block float-right"
                                                onClick={() =>
                                                    adminInfo.email === ""
                                                        ? toast.error("Failed! Please enter email address")
                                                        : adminInfo.password === ""
                                                            ? toast.error("Failed! Please enter valid password")
                                                            : dispatch(adminLogin(adminInfo))
                                                }
                                            >
                                                Sign In
                                            </Button>
                                        </div>
                                        {/* /.col */}
                                    </div>
                                </form>
                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  .parentView {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .imageStyle {
    width: 100%;
    object-fit: scale-down;
  }

  .childView {
    position: absolute;
    top: 25%;
    left: 35%;
  }
`;

export default AdminLogin;
