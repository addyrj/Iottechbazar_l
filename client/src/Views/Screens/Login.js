/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
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

    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [phoneLoginState, setPhoneLoginState] = useState(false);
    const [forgotPasswordState, setForgotPasswordState] = useState(false);
    const [otpState, setOtpState] = useState(false);
    const [otpInfo, setOtpInfo] = useState({
        contact: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });

    // OTP Timer States
    const [otpTimer, setOtpTimer] = useState(0);
    const [canResendOtp, setCanResendOtp] = useState(false);
    const [otpType, setOtpType] = useState(''); // 'login' or 'forgot_password'

    // OTP Timer Effect
    useEffect(() => {
        let timer;
        if (otpTimer > 0) {
            timer = setTimeout(() => {
                setOtpTimer(otpTimer - 1);
            }, 1000);
        } else if (otpTimer === 0 && otpState) {
            setCanResendOtp(true);
        }
        return () => clearTimeout(timer);
    }, [otpTimer, otpState]);

    // Start OTP Timer
    const startOtpTimer = () => {
        setOtpTimer(600); // 10 minutes in seconds
        setCanResendOtp(false);
    };

    // Format timer to MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const registerUser = () => {
        if (!privacyChecked) {
            toast.error("Failed! Please check privacy policy");
            return;
        } else if (isEmpty(registerInfo.Name)) {
            toast.error("Failed! Please enter name");
            return;
        } else if (isEmpty(registerInfo.Email)) {
            toast.error("Failed! Please enter email");
            return;
        } else if (isEmpty(registerInfo.Contact)) {
            toast.error("Failed! Please enter contact");
            return;
        } else if (isEmpty(registerInfo.Password)) {
            toast.error("Failed! Please enter password");
            return;
        } else if (isEmpty(registerInfo.ConfirmPassword)) {
            toast.error("Failed! Please enter confirm password");
            return;
        } else if (registerInfo.Password !== registerInfo.ConfirmPassword) {
            toast.error("Failed! Password and confirm password must be equal");
            return;
        } else {
            dispatch(setLoader(true));
            console.log("Registering user with data:", registerInfo);

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('Name', registerInfo.Name);
            formData.append('Email', registerInfo.Email);
            formData.append('Contact', registerInfo.Contact);
            formData.append('Password', registerInfo.Password);
            formData.append('ConfirmPassword', registerInfo.ConfirmPassword);
            if (registerInfo.avatar && registerInfo.avatar instanceof File) {
                formData.append('avatar', registerInfo.avatar);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };

            axios.post(process.env.REACT_APP_BASE_URL + "user_register", formData, config)
                .then((res) => {
                    dispatch(setLoader(false));
                    console.log("Registration response:", res.data);

                    if (res.data.status === 200) {
                        // Auto-login after successful registration
                        localStorage.setItem("iottechUserInfo", JSON.stringify({
                            token: res.data.token,
                            userId: res.data.id,
                            lastLogin: res.data.lastLogin
                        }));

                        setRegisterInfo({
                            Name: "",
                            Email: "",
                            Contact: "",
                            Password: "",
                            ConfirmPassword: "",
                            avatar: {}
                        });

                        toast.success(res?.data?.message || "Registration successful! Auto-login completed.");

                        // Create user track log and navigate to home
                        createUserTrackLog(res.data.token);
                    } else {
                        toast.error(res?.data?.message || "Registration completed with warnings");
                    }
                })
                .catch((error) => {
                    console.log("Registration error:", error);
                    dispatch(setLoader(false));

                    if (error.response) {
                        const status = error.response.status;
                        const errorData = error.response.data;

                        if (status === 400 || status === 300) {
                            toast.error(errorData?.message || "Please check your input and try again");
                        } else if (status === 500) {
                            toast.error("Server error. Please try again later.");
                        } else {
                            toast.error(errorData?.message || "Registration failed");
                        }
                    } else if (error.request) {
                        toast.error("Network error. Please check your connection.");
                    } else {
                        toast.error("Registration failed: " + error.message);
                    }
                });
        }
    }

    const loginUser = () => {
        if (isEmpty(loginInfo.userId) || isEmpty(loginInfo.userPass)) {
            toast.error("Failed! All fields must be required!")
        } else {
            dispatch(setLoader(true));
            axios.post(process.env.REACT_APP_BASE_URL + "user_login", {
                Email: loginInfo.userId,
                Password: loginInfo.userPass,
                rememberState: loginInfo.rememberMe
            }, postHeaderWithoutToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        localStorage.setItem("iottechUserInfo", JSON.stringify({
                            token: res.data.token,
                            userId: res.data.id,
                            lastLogin: res.data.lastLogin
                        }))
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

    // Send OTP for Phone Login
    // Send OTP for Phone Login - Improved version
    const sendPhoneLoginOtp = () => {
        if (isEmpty(otpInfo.contact)) {
            toast.error("Failed! Please enter contact number");
            return;
        } else if (otpInfo.contact.length !== 10) {
            toast.error("Failed! Contact number must be 10 digits");
            return;
        }

        console.log("Sending OTP for contact:", otpInfo.contact);

        dispatch(setLoader(true));
        axios.post(process.env.REACT_APP_BASE_URL + "sendLoginOtp",
            { Contact: otpInfo.contact },
            postHeaderWithoutToken
        )
            .then((res) => {
                dispatch(setLoader(false));
                console.log("OTP Response:", res.data);

                if (res.data.status === 200) {
                    setOtpState(true);
                    setOtpType('login');
                    startOtpTimer();
                    toast.success(res?.data?.message);
                    console.log("OTP sent successfully");

                    // Check if OTP is returned in response (for development)
                    if (res.data.info && res.data.info.otp) {
                        console.log("OTP for development:", res.data.info.otp);
                        // Auto-fill OTP for easier testing
                        setOtpInfo(prev => ({ ...prev, otp: res.data.info.otp }));
                        toast.success(`OTP: ${res.data.info.otp} (Development Mode)`);
                    }
                } else {
                    toast.error(res?.data?.message || "Failed to send OTP");
                }
            })
            .catch((error) => {
                console.log("OTP sending error:", error);
                dispatch(setLoader(false));

                if (error.response) {
                    // Server responded with error status
                    const errorMsg = error.response.data?.message || "Failed to send OTP";
                    toast.error(errorMsg);

                    // If it's a 400 error (user not found), show specific message
                    if (error.response.status === 400) {
                        toast.error("No account found with this phone number. Please register first.");
                    }
                } else if (error.request) {
                    // Network error
                    toast.error("Network error. Please check your internet connection.");
                } else {
                    // Other errors
                    toast.error("Failed to send OTP: " + error.message);
                }
            })
    }

    // Verify OTP for Phone Login
    const verifyPhoneLoginOtp = () => {
        if (isEmpty(otpInfo.otp)) {
            toast.error("Failed! Please enter OTP");
            return;
        } else if (otpInfo.otp.length !== 6) {
            toast.error("Failed! OTP must be 6 digits");
            return;
        }

        console.log("Verifying OTP:", otpInfo.otp, "for contact:", otpInfo.contact);

        dispatch(setLoader(true));
        axios.post(process.env.REACT_APP_BASE_URL + "verifyLoginOtp",
            {
                Contact: otpInfo.contact,
                Otp: otpInfo.otp
            },
            postHeaderWithoutToken
        )
            .then((res) => {
                dispatch(setLoader(false));
                if (res.data.status === 200) {
                    localStorage.setItem("iottechUserInfo", JSON.stringify({
                        token: res.data.token,
                        userId: res.data.id,
                        lastLogin: res.data.lastLogin
                    }))
                    createUserTrackLog(res.data.token);
                    toast.success(res?.data?.message);
                    console.log("Login successful");
                    // Reset OTP states
                    setOtpTimer(0);
                    setCanResendOtp(false);
                } else {
                    toast.error(res?.data?.message || "OTP verification failed");
                }
            })
            .catch((error) => {
                console.log("OTP verification error:", error);
                dispatch(setLoader(false));
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message || "OTP verification failed");
                } else {
                    toast.error("Network error. Please try again.");
                }
            })
    }

    // Send OTP for Forgot Password
    const sendForgotPasswordOtp = () => {
        if (isEmpty(otpInfo.contact)) {
            toast.error("Failed! Please enter contact number");
            return;
        } else if (otpInfo.contact.length !== 10) {
            toast.error("Failed! Contact number must be 10 digits");
            return;
        }

        console.log("Sending forgot password OTP for contact:", otpInfo.contact);

        dispatch(setLoader(true));
        axios.post(process.env.REACT_APP_BASE_URL + "sendForgotPasswordOtp",
            { Contact: otpInfo.contact },
            postHeaderWithoutToken
        )
            .then((res) => {
                dispatch(setLoader(false));
                if (res.data.status === 200) {
                    setOtpState(true);
                    setOtpType('forgot_password');
                    startOtpTimer();
                    toast.success(res?.data?.message);
                    console.log("Forgot password OTP sent successfully");

                    if (res.data.info.otp) {
                        console.log("Forgot Password OTP for development:", res.data.info.otp);
                        alert(`OTP for password reset: ${res.data.info.otp}`);
                    }
                } else {
                    toast.error(res?.data?.message || "Failed to send OTP");
                }
            })
            .catch((error) => {
                console.log("Forgot password OTP sending error:", error);
                dispatch(setLoader(false));
                if (error.response) {
                    if (error.response.status === 404) {
                        toast.error("Service temporarily unavailable. Please try email login.");
                    } else {
                        toast.error(error.response.data?.message || "Failed to send OTP");
                    }
                } else if (error.request) {
                    toast.error("Network error. Please check your connection.");
                } else {
                    toast.error("Failed to send OTP: " + error.message);
                }
            })
    }

    // Resend OTP
    const resendOtp = () => {
        if (!canResendOtp) {
            toast.error("Please wait before resending OTP");
            return;
        }

        if (otpType === 'login') {
            sendPhoneLoginOtp();
        } else if (otpType === 'forgot_password') {
            sendForgotPasswordOtp();
        }
    }

    // Reset Password with OTP
    const resetPasswordWithOtp = () => {
        if (isEmpty(otpInfo.otp) || isEmpty(otpInfo.newPassword) || isEmpty(otpInfo.confirmPassword)) {
            toast.error("Failed! All fields are required");
            return;
        } else if (otpInfo.newPassword !== otpInfo.confirmPassword) {
            toast.error("Failed! New password and confirm password must match");
            return;
        } else if (otpInfo.otp.length !== 6) {
            toast.error("Failed! OTP must be 6 digits");
            return;
        }

        console.log("Resetting password with OTP:", otpInfo.otp);

        dispatch(setLoader(true));
        axios.post(process.env.REACT_APP_BASE_URL + "resetPasswordWithOtp",
            {
                Contact: otpInfo.contact,
                Otp: otpInfo.otp,
                NewPassword: otpInfo.newPassword,
                ConfirmPassword: otpInfo.confirmPassword
            },
            postHeaderWithoutToken
        )
            .then((res) => {
                dispatch(setLoader(false));
                if (res.data.status === 200) {
                    toast.success(res?.data?.message);
                    // Reset all states
                    resetOtpFlow();
                    console.log("Password reset successfully");

                    // Redirect to login after successful password reset
                    setTimeout(() => {
                        setForgotPasswordState(false);
                        setSignInState(1);
                    }, 2000);
                } else {
                    toast.error(res?.data?.message || "Password reset failed");
                }
            })
            .catch((error) => {
                console.log("Password reset error:", error);
                dispatch(setLoader(false));
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message || "Password reset failed");
                } else {
                    toast.error("Network error. Please try again.");
                }
            })
    }

    const createUserTrackLog = (token) => {
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

    const handleChange = (event) => {
        setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value })
    }

    const handleLogin = (event) => {
        setLoginIfo({ ...loginInfo, [event.target.name]: event.target.value })
    }

    const handleOtpChange = (event) => {
        setOtpInfo({ ...otpInfo, [event.target.name]: event.target.value })
    }

    const uploadImage = () => {
        $("#imageUpload").click();
    }

    const resetOtpFlow = () => {
        setPhoneLoginState(false);
        setForgotPasswordState(false);
        setOtpState(false);
        setOtpTimer(0);
        setCanResendOtp(false);
        setOtpType('');
        setOtpInfo({
            contact: "",
            otp: "",
            newPassword: "",
            confirmPassword: ""
        });
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
                                                signInState === 1 && !phoneLoginState && !forgotPasswordState ? "nav-link cursor-pointer active" : "nav-link cursor-pointer"
                                            }
                                            role="tab"
                                            onClick={() => {
                                                setSignInState(1);
                                                resetOtpFlow();
                                            }}
                                        >
                                            Sign In
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={
                                                signInState === 0 && !phoneLoginState && !forgotPasswordState ? "nav-link cursor-pointer active" : "nav-link cursor-pointer"
                                            }
                                            role="tab"
                                            onClick={() => {
                                                setSignInState(0);
                                                resetOtpFlow();
                                            }}
                                        >
                                            Register
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">

                                    {/* Phone Login Flow */}
                                    {phoneLoginState && (
                                        <div className="tab-pane fade show active">
                                            {!otpState ? (
                                                // Phone Number Input
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="phone-login">Phone Number *</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            id="contact"
                                                            name="contact"
                                                            value={otpInfo.contact}
                                                            required=""
                                                            onChange={handleOtpChange}
                                                            placeholder="Enter 10-digit phone number"
                                                            maxLength="10"
                                                            autoComplete="tel"
                                                        />
                                                    </div>
                                                    <div className="form-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary-2"
                                                            onClick={sendPhoneLoginOtp}
                                                        >
                                                            <span>SEND OTP</span>
                                                            <i className="icon-long-arrow-right" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link"
                                                            onClick={resetOtpFlow}
                                                        >
                                                            Back to Email Login
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                // OTP Verification
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="login-otp">Enter OTP *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="otp"
                                                            name="otp"
                                                            value={otpInfo.otp}
                                                            required=""
                                                            onChange={handleOtpChange}
                                                            placeholder="Enter OTP sent to your phone"
                                                            maxLength="6"
                                                            autoComplete="one-time-code"
                                                        />
                                                    </div>

                                                    {/* OTP Timer Display */}
                                                    <div className="form-group text-center">
                                                        {otpTimer > 0 ? (
                                                            <p className="text-info">
                                                                OTP expires in: <strong>{formatTime(otpTimer)}</strong>
                                                            </p>
                                                        ) : (
                                                            <p className="text-warning">
                                                                OTP has expired. Please request a new one.
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="form-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary-2"
                                                            onClick={verifyPhoneLoginOtp}
                                                            disabled={otpTimer === 0}
                                                        >
                                                            <span>VERIFY OTP & LOGIN</span>
                                                            <i className="icon-long-arrow-right" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link"
                                                            onClick={resendOtp}
                                                            disabled={!canResendOtp}
                                                            style={{
                                                                opacity: canResendOtp ? 1 : 0.6,
                                                                cursor: canResendOtp ? 'pointer' : 'not-allowed'
                                                            }}
                                                        >
                                                            {canResendOtp ? "Resend OTP" : `Resend in ${formatTime(otpTimer)}`}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    )}

                                    {/* Forgot Password Flow */}
                                    {forgotPasswordState && (
                                        <div className="tab-pane fade show active">
                                            {!otpState ? (
                                                // Phone Number Input for Forgot Password
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="forgot-password-phone">Phone Number *</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            id="contact"
                                                            name="contact"
                                                            value={otpInfo.contact}
                                                            required=""
                                                            onChange={handleOtpChange}
                                                            placeholder="Enter registered phone number"
                                                            maxLength="10"
                                                            autoComplete="tel"
                                                        />
                                                    </div>
                                                    <div className="form-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary-2"
                                                            onClick={sendForgotPasswordOtp}
                                                        >
                                                            <span>SEND OTP</span>
                                                            <i className="icon-long-arrow-right" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link"
                                                            onClick={resetOtpFlow}
                                                        >
                                                            Back to Login
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                // OTP and New Password
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="reset-otp">Enter OTP *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="otp"
                                                            name="otp"
                                                            value={otpInfo.otp}
                                                            required=""
                                                            onChange={handleOtpChange}
                                                            placeholder="Enter OTP"
                                                            maxLength="6"
                                                            autoComplete="one-time-code"
                                                        />
                                                    </div>

                                                    {/* OTP Timer Display */}
                                                    <div className="form-group text-center">
                                                        {otpTimer > 0 ? (
                                                            <p className="text-info">
                                                                OTP expires in: <strong>{formatTime(otpTimer)}</strong>
                                                            </p>
                                                        ) : (
                                                            <p className="text-warning">
                                                                OTP has expired. Please request a new one.
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="new-password">New Password *</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="newPassword"
                                                            name="newPassword"
                                                            value={otpInfo.newPassword}
                                                            required=""
                                                            onChange={handleOtpChange}
                                                            placeholder="Enter new password"
                                                            autoComplete="new-password"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="confirm-password">Confirm Password *</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            value={otpInfo.confirmPassword}
                                                            required=""
                                                            onChange={handleOtpChange}
                                                            placeholder="Confirm new password"
                                                            autoComplete="new-password"
                                                        />
                                                    </div>
                                                    <div className="form-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary-2"
                                                            onClick={resetPasswordWithOtp}
                                                            disabled={otpTimer === 0}
                                                        >
                                                            <span>RESET PASSWORD</span>
                                                            <i className="icon-long-arrow-right" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link"
                                                            onClick={resendOtp}
                                                            disabled={!canResendOtp}
                                                            style={{
                                                                opacity: canResendOtp ? 1 : 0.6,
                                                                cursor: canResendOtp ? 'pointer' : 'not-allowed'
                                                            }}
                                                        >
                                                            {canResendOtp ? "Resend OTP" : `Resend in ${formatTime(otpTimer)}`}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    )}

                                    {/* Regular Email Login */}
                                    {!phoneLoginState && !forgotPasswordState && signInState === 1 && (
                                        <div className="tab-pane fade show active" id="signin-2" role="tabpanel" aria-labelledby="signin-tab-2">
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
                                                        autoComplete="email"
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
                                                        autoComplete="current-password"
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
                                                    <a
                                                        href="#"
                                                        className="forgot-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setForgotPasswordState(true);
                                                        }}
                                                    >
                                                        Forgot Your Password?
                                                    </a>
                                                </div>
                                            </form>
                                            <div className="form-choice">
                                                <p className="text-center">or sign in with</p>

                                                {/* Phone Login on Top */}
                                                <div className="col-sm-6 ml-auto mr-auto mt-2 cursor-pointer text-center">
                                                    <a
                                                        className="btn btn-login btn-f"
                                                        onClick={() => setPhoneLoginState(true)}
                                                    >
                                                        <i className="fa-solid fa-phone text-success"></i>
                                                        Login With Phone
                                                    </a>
                                                </div>

                                                {/* Facebook and Google Below */}
                                                <div className="row mt-3">
                                                    <div className="col-sm-6">
                                                        <a href="#" className="btn btn-login btn-f">
                                                            <i className="icon-facebook-f" />
                                                            Login With Facebook
                                                        </a>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <a href="#" className="btn btn-login btn-g">
                                                            <i className="icon-google" />
                                                            Login With Google
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )}

                                    {/* Registration Form */}
                                    {!phoneLoginState && !forgotPasswordState && signInState === 0 && (
                                        <div className="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
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
                                                        autoComplete="name"
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
                                                        autoComplete="email"
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
                                                        autoComplete="tel"
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
                                                        autoComplete="new-password"
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
                                                        autoComplete="new-password"
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
                                    )}
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

/* Style for disabled buttons */
.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Style for timer text */
.text-info {
    font-size: 14px;
    font-weight: 500;
}

.text-warning {
    font-size: 14px;
    font-weight: 500;
    color: #ff6b6b;
}

/* Style for resend OTP button */
.btn-link:disabled {
    color: #6c757d;
    text-decoration: none;
    cursor: not-allowed;
}
`;

export default Login;