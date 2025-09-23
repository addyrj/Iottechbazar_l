/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import loginBg from "../../Assets/images/backgrounds/login-bg.jpg";
import Avatar from "@mui/material/Avatar";
import { indigo } from "@mui/material/colors";
import { Stack } from "@mui/material";
import styled from "styled-components";
import $ from "jquery"
import toast from "react-hot-toast"
import isEmpty from "lodash.isempty"
import { useNavigate } from "react-router-dom"
import { setLoader } from "../../Database/Action/DashboardAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import { postHeaderWithoutToken } from "../../Database/ApiHeader";
import jQuery from "jquery";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signInState, setSignInState] = useState(1);
    const [loginInfo, setLoginIfo] = useState({
        userId: "",
        userPass: "",
        rememberMe: false
    });
    const [registerInfo, setRegisterInfo] = useState({
        Name: "",
        Email: "",
        Contact: "",
        Password: "",
        ConfirmPassword: "",
        avatar: {}
    });

    const [privacyChecked, setPrivacyChecked] = useState(false)


    const registerUser = () => {
        if (!privacyChecked) {
            toast.error("Failed! Please check privacy policy")
        } else if (isEmpty(registerInfo.Name)) {
            toast.error("Failed! Please enter name")
        } else if (isEmpty(registerInfo.Email)) {
            toast.error("Failed! Please enter email")
        } else if (isEmpty(registerInfo.Contact)) {
            toast.error("Failed! Please enter contact")
        } else if (isEmpty(registerInfo.Password)) {
            toast.error("Failed! Please enter password")
        } else if (isEmpty(registerInfo.ConfirmPassword)) {
            toast.error("Failed! Please enter confirm password")
        } else if (registerInfo.Password !== registerInfo.ConfirmPassword) {
            toast.error("Failed! Password and confirm password must be equal")
        } else {
            dispatch(setLoader(true));
            axios.post(process.env.REACT_APP_BASE_URL + "user_register", registerInfo, postHeaderWithoutToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        setRegisterInfo({
                            Name: "",
                            Email: "",
                            Contact: "",
                            Password: "",
                            ConfirmPassword: "",
                            avatar: {}
                        });
                        setSignInState(1);
                        toast.success(res?.data?.message);
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error)
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message)
                })
        }
    }

    const loginUser = () => {
        if (isEmpty(loginInfo.userId) || isEmpty(loginInfo.userPass)) {
            toast.error("Failed! All fileds must have required!")
        } else {
            console.log("clicked");

            dispatch(setLoader(true));
            axios.post(process.env.REACT_APP_BASE_URL + "user_login", { Email: loginInfo.userId, Password: loginInfo.userPass, rememberState: loginInfo.rememberMe }, postHeaderWithoutToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        localStorage.setItem("iottechUserInfo", JSON.stringify({ token: res.data.token, userId: res.data.id, lastLogin: res.data.lastLogin }))
                        createUserTrackLog(res.data.token);
                        toast.success(res?.data?.message);
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error)
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message)
                })
        }
    }

    const createUserTrackLog = (token) => {
        console.log(token)
        dispatch(setLoader(true));
        let config = {
            headers: {
                Accept: "*/*",
                "Content-Type": "multipart/form-data",
                Authorization: token,
            }
        }
        axios.post(process.env.REACT_APP_BASE_URL + "createUserTrackLog", { accessType: "Login" }, config)
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch(setLoader(false));
                    navigate("/")
                    window.location.reload("false");
                }
            })
            .catch((error) => {
                console.log("error is   ", error)
                dispatch(setLoader(false));
                toast.error(error?.response?.data?.message || error.message)
            })
    }


    // const randomNumber = Math.floor(Math.random() * 30);

    const handleChange = (event) => {
        setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value })
    }

    const handleLogin = (event) => {
        setLoginIfo({ ...loginInfo, [event.target.name]: event.target.value })
    }

    const uploadImage = () => {
        $("#imageUpload").click();
    }

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
                                <a href="#">Pages</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Login
                            </li>
                        </ol>
                    </div>
                </nav>
                <div
                    className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
                    style={{ backgroundImage: `url(${loginBg})` }}
                >
                    <div className="container">
                        <div className="form-box">
                            <div className="form-tab">
                                <ul className="nav nav-pills nav-fill" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className={
                                                signInState === 1 ? "nav-link cursor-pointer active" : "nav-link cursor-pointer"
                                            }
                                            role="tab"
                                            onClick={() => setSignInState(1)}
                                        >
                                            Sign In
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={
                                                signInState === 0 ? "nav-link cursor-pointer active" : "nav-link cursor-pointer"
                                            }
                                            role="tab"
                                            onClick={() => setSignInState(0)}
                                        >
                                            Register
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div
                                        className={
                                            signInState === 1
                                                ? "tab-pane fade show active"
                                                : "tab-pane fade"
                                        }
                                        id="signin-2"
                                        role="tabpanel"
                                        aria-labelledby="signin-tab-2"
                                    >
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="singin-email-2">
                                                    Username or email address *
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="userId"
                                                    name="userId"
                                                    value={loginInfo.userId}
                                                    required=""
                                                    onChange={handleLogin}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="singin-password-2">Password *</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="userPass"
                                                    name="userPass"
                                                    value={loginInfo.userPass}
                                                    required=""
                                                    onChange={handleLogin}
                                                />
                                            </div>
                                            <div className="form-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary-2"
                                                    onClick={() => loginUser()}
                                                >
                                                    <span>LOG IN</span>
                                                    <i className="icon-long-arrow-right" />
                                                </button>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="signin-remember-2"
                                                        onClick={() => loginInfo.rememberMe ? setLoginIfo({ ...loginInfo, rememberMe: false })
                                                            : setLoginIfo({ ...loginInfo, rememberMe: true })}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="signin-remember-2"
                                                    >
                                                        Remember Me
                                                    </label>
                                                </div>
                                                <a href="#" className="forgot-link">
                                                    Forgot Your Password?
                                                </a>
                                            </div>
                                        </form>
                                        <div className="form-choice">
                                            <p className="text-center">or sign in with</p>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a href="#" className="btn btn-login btn-g">
                                                        <i className="icon-google" />
                                                        Login With Google
                                                    </a>
                                                </div>
                                                <div className="col-sm-6">
                                                    <a href="#" className="btn btn-login btn-f">
                                                        <i className="icon-facebook-f" />
                                                        Login With Facebook
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 ml-auto mr-auto mt-2 cursor-pointer">
                                                <a className="btn btn-login btn-f">
                                                    <i className="fa-solid fa-phone text-success"></i>
                                                    Login With Phone
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            signInState === 0
                                                ? "tab-pane fade show active"
                                                : "tab-pane fade"
                                        }
                                        id="register-2"
                                        role="tabpanel"
                                        aria-labelledby="register-tab-2"
                                    >
                                        <form>
                                            <div className="form-group">
                                                <Stack onClick={() => uploadImage()}
                                                    sx={{
                                                        marginLeft: "auto",
                                                        marginRight: "auto",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: indigo[400],
                                                            width: "70px",
                                                            height: "70px",
                                                            color: "white",
                                                            fontSize: "24px",
                                                            fontWeight: "bold",
                                                        }}
                                                        src={jQuery.isEmptyObject(registerInfo.avatar) ? "" : URL.createObjectURL(registerInfo.avatar)}
                                                    />
                                                </Stack>
                                                <input id="imageUpload" type="file" name="profile_photo" placeholder="Photo" required="" capture className="d-none"
                                                    onChange={(e) => setRegisterInfo({ ...registerInfo, avatar: e.target.files[0] })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-email-2">Your name *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="Name"
                                                    name="Name"
                                                    value={registerInfo.Name}
                                                    onChange={handleChange}
                                                    required=""
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-email-2">
                                                    Your email address *
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="Email"
                                                    name="Email"
                                                    required=""
                                                    value={registerInfo.Email}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-email-2">Your contact *</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="Contact"
                                                    name="Contact"
                                                    required=""
                                                    value={registerInfo.Contact}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-password-2">Password *</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="Password"
                                                    name="Password"
                                                    required=""
                                                    value={registerInfo.Password}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-password-2">
                                                    Confirm password *
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="ConfirmPassword"
                                                    name="ConfirmPassword"
                                                    required=""
                                                    value={registerInfo.ConfirmPassword}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary-2"
                                                    onClick={() => registerUser()}
                                                >
                                                    <span>SIGN UP</span>
                                                    <i className="icon-long-arrow-right" />
                                                </button>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="register-policy-2"
                                                        required=""
                                                        onClick={(e) => privacyChecked ?
                                                            setPrivacyChecked(false) : setPrivacyChecked(true)}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="register-policy-2"
                                                    >
                                                        I agree to the <a href="#">privacy policy</a> *
                                                    </label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Wrapper>
    );
};

const Wrapper = styled.section`
input#image:focus{
    background-color:#f5f8fa !important;
    border:1px solid #dadada;
}
`;

export default Login;
