// import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUnlock, faUser, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Login({ setLoginStatus }) {
    const [user, setUser] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
        roleAcc: 1, // 0 for admin and 1 for user
    });
    // const nodemailer = require("nodemailer");
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [usernameoremail, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showInputOTP, setShowInputOTP] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);
    const warningFillInforRef = useRef(null);
    const warningFillInforRefSignup = useRef(null);
    const warningUnvalidPassword = useRef(null);
    const warningUnvalidNewPassword = useRef(null);
    const warningFailedLoginRef = useRef(null);
    const warningFailedSignupRef = useRef(null);
    const warningFailedChangePasswordRef = useRef(null);
    const warningFillInforRefNewPassword = useRef(null);
    const wrapperRef = useRef(null);
    const loginModal = useRef(null);
    const registerModal = useRef(null);
    const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
    const [showChangePassword, setShowChangePassword] = useState(false);

    const changeForm = () => {
        setShowLoginForm(!showLoginForm);
    };
    useEffect(() => {
        sessionStorage.removeItem("userID");
    }, []);
    useEffect(() => {
        if (showLoginForm === true) {
            wrapperRef.current.style.backgroundImage = "url(/img/background_login.png)";
        } else {
            wrapperRef.current.style.backgroundImage = "url(/img/background_register.png)";
        }
    }, [showLoginForm]);
    const checkLogin = () => {
        if (usernameoremail?.trim() !== "" && password?.trim() !== "") {
            if (warningFillInforRef.current !== null) {
                warningFillInforRef.current.style.display = "none";
            }
            const requestData = {
                userName: usernameoremail,
                userEmail: usernameoremail,
                userPassword: password,
            };
            axios
                .post("http://127.0.0.1:8080/api/v1/users/checkLogin", requestData, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        console.log(res.data.data.iDUser);
                        if (res.data !== null) {
                            sessionStorage.setItem("userID", res.data.data.iDUser);
                            if (res.data.data.roleAcc === 0) {
                                window.location.href = "http://localhost:3000/admin";
                            } else {
                                window.location.href = "http://localhost:3000";
                            }
                        }
                    } else {
                    }
                })
                .catch(() => {
                    if (warningFailedLoginRef.current !== null) {
                        warningFailedLoginRef.current.style.display = "block";
                    }
                });
        } else if (warningFillInforRef.current !== null && warningFailedLoginRef.current !== null) {
            console.log(usernameoremail, password);
            warningFillInforRef.current.style.display = "block";
            warningFailedLoginRef.current.style.display = "none";
        }
    };
    const handleSignUp = () => {
        const email = document.querySelector(".inputEmail").value;
        const username = document.querySelector(".inputUsername").value;
        const password = document.querySelector(".inputPassword").value;
        const confirmPassword = document.querySelector(".inputConfirmationPassword").value;
        if (password !== confirmPassword) {
            warningUnvalidPassword.current.style.display = "block";
        } else {
            warningUnvalidPassword.current.style.display = "none";
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    const encryptedPassword = hash;
                    const newUser = {
                        userName: username,
                        userEmail: email,
                        userPassword: encryptedPassword,
                        roleAcc: 1,
                    };
                    setUser(newUser);
                });
            });
            console.log(user);
        }
    };

    const signUp = () => {
        const email = document.querySelector(".inputEmail").value;
        const username = document.querySelector(".inputUsername").value;
        const password = document.querySelector(".inputPassword").value;
        const confirmPassword = document.querySelector(".inputConfirmationPassword").value;
        if (
            email?.trim() !== "" &&
            username?.trim() !== "" &&
            password?.trim() !== "" &&
            confirmPassword?.trim() !== ""
        ) {
            if (warningFillInforRefSignup.current !== null) {
                warningFillInforRefSignup.current.style.display = "none";
            }
            axios
                .post("http://localhost:8080/api/v1/users/insert", user)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        if (res.data !== null) {
                            changeForm();
                        }
                    } else {
                    }
                })
                .catch(() => {
                    if (warningFailedSignupRef.current !== null) {
                        warningFailedSignupRef.current.style.display = "block";
                    }
                });
        } else if (warningFillInforRefSignup.current !== null && warningUnvalidPassword.current !== null) {
            // console.log(username, password);
            warningFillInforRefSignup.current.style.display = "block";
            warningUnvalidPassword.current.style.display = "none";
        }
    };

    const handleSendOTP = () => {
        const email = document.querySelector(".inputEmailForgotPassword").value;
        if (email?.trim() !== "") {
            if (warningFillInforRefSignup.current !== null) {
                warningFillInforRefSignup.current.style.display = "none";
            }
            const requestEmail = {
                userEmail: email,
            };
            axios
                .post("http://localhost:8080/api/v1/users/forgotpw", requestEmail)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        if (res.data !== null) {
                            setShowInputOTP(true);
                        }
                    } else {
                    }
                })
                .catch(() => {
                    // if (warningFailedSignupRef.current !== null) {
                    //     warningFailedSignupRef.current.style.display = "block";
                    // }
                    console.log("Error!");
                });
        }
        // else if (warningFillInforRefSignup.current !== null && warningUnvalidPassword.current !== null) {
        //     // console.log(username, password);
        //     warningFillInforRefSignup.current.style.display = "block";
        //     warningUnvalidPassword.current.style.display = "none";
        // }
    };
    const verifyOTP = () => {
        const otpString = otpValues.join("");
        const email = document.querySelector(".inputEmailForgotPassword").value;
        // const eml = document.querySelector(".inputEmailChangePassword"); 
        if (otpString?.trim() !== "") {
            // if (warningFillInforRefSignup.current !== null) {
            //     warningFillInforRefSignup.current.style.display = "none";
            // }
            const requestOTP = {
                otpUser: otpString,
            };
            axios
                .post("http://localhost:8080/api/v1/users/checkotp", requestOTP)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        console.log("OTP: " + otpString);
                        console.log(res.data.data);
                        if (res.data.data === "") {
                            const setemail = {
                                userEmail: email,
                            };
                            setUser(setemail);
                            console.log(user.userEmail);
                            setShowChangePassword(true);
                            setShowInputOTP(false)
                            // eml.value = email;
                        }
                    } else {
                    }
                })
                .catch(() => {
                    // if (warningFailedSignupRef.current !== null) {
                    //     warningFailedSignupRef.current.style.display = "block";
                    // }
                    console.log("Error!");
                });
        }
        // else if (warningFillInforRefSignup.current !== null && warningUnvalidPassword.current !== null) {
        //     // console.log(username, password);
        //     warningFillInforRefSignup.current.style.display = "block";
        //     warningUnvalidPassword.current.style.display = "none";
        // }
        
        // const otp = parseInt(otpString);
    };

    const handleOTPInputChange = (index, value) => {
        const updatedOTP = [...otpValues];
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value)) || value === "" || value === null) {
            updatedOTP[index] = value;
            setOtpValues(updatedOTP);
            if (value !== "") {
                const nextInput = document.getElementById(`otp-input-${index + 1}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
        setOtpValues(updatedOTP);
    };

    const handleChangePassword = () => {
        const password = document.querySelector(".newPassword").value;
        const confirmPassword = document.querySelector(".confirmationNewPassword").value;
        if (password !== confirmPassword) {
            warningUnvalidNewPassword.current.style.display = "block";
        } else {
            warningUnvalidNewPassword.current.style.display = "none";
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    const encryptedPassword = hash;
                    const userforchange = {
                        userEmail: user.userEmail,
                        userPassword: encryptedPassword,
                    };
                    setUser(userforchange);
                });
            });
            console.log(user);
        }
    };
    const changePassword = () => {
        const password = document.querySelector(".newPassword").value;
        const confirmPassword = document.querySelector(".confirmationNewPassword").value;
        if (password?.trim() !== "" && confirmPassword?.trim() !== "") {
            if (warningFillInforRefNewPassword.current !== null) {
                warningFillInforRefNewPassword.current.style.display = "none";
            }
            axios
                .put("http://localhost:8080/api/v1/users/changepw", user)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        if (res.data !== null) {
                            console.log("Change password successfully");
                        }
                    } else {
                    }
                })
                .catch(() => {
                    if (warningFailedChangePasswordRef.current !== null) {
                        warningFailedChangePasswordRef.current.style.display = "block";
                    }
                    console.log("Error!");
                });
        }
        else if (warningFillInforRefNewPassword.current !== null && warningUnvalidNewPassword.current !== null) {
            // console.log(username, password);
            warningFillInforRefNewPassword.current.style.display = "block";
            warningUnvalidNewPassword.current.style.display = "none";
        }
    }

    return (
        <div ref={wrapperRef} className={cx("wrapper")}>
            {showLoginForm === true ? (
                <div ref={loginModal} className={cx("login-modal")}>
                    <div className={cx("content")}>
                        {showForgetPassword === true ? (
                            <Fragment>
                                <div className={cx("tittle")}>Forgot password</div>
                                <div className={cx("forgot-passwordForm")}>
                                    {showChangePassword === false ? (
                                        <div className={cx("information", "email")}>
                                            <FontAwesomeIcon className={cx("icon", "letter-icon")} icon={faEnvelope} />
                                            <input className={cx("inputEmailForgotPassword")} placeholder="Email" />
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    {showChangePassword === true ? (
                                        <div className={cx("change-password")}>
                                            <div className={cx("information", "password")}>
                                                <FontAwesomeIcon className={cx("icon", "lock-icon")} icon={faUnlock} />
                                                <input
                                                    type="password"
                                                    className={cx("newPassword")}
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <div className={cx("information", "confimationPassword")}>
                                                <FontAwesomeIcon className={cx("icon", "lock-icon")} icon={faLock} />
                                                <input
                                                    className={cx("confirmationNewPassword")}
                                                    placeholder="Password confirmation"
                                                    type="password"
                                                    onChange={handleChangePassword}
                                                />
                                            </div>
                                            <p ref={warningFillInforRefNewPassword} className={cx("danger-infor")}>
                                                Please fill all information.
                                            </p>
                                            <p ref={warningUnvalidNewPassword} className={cx("danger-infor")}>
                                                The confirm password does not match.
                                            </p>
                                            <p ref={warningFailedChangePasswordRef} className={cx("danger-infor-login")}>
                                                Change password unsuccessfully.
                                            </p>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    {showInputOTP === true ? (
                                        <div className={cx("check-otp")}>
                                            <p>The OTP has been sent to your email, please check it.</p>
                                            <div className={cx("input-otp")}>
                                                {[...Array(6)].map((_, index) => (
                                                    <input
                                                        key={index}
                                                        id={`otp-input-${index}`}
                                                        type="text"
                                                        maxLength={1}
                                                        value={otpValues[index] || ""}
                                                        onChange={(e) => handleOTPInputChange(index, e.target.value)}
                                                        autocomplete="none"
                                                    />
                                                ))}
                                            </div>
                                            <p>
                                                Enter the OTP code that we sent to your email, be careful not to share
                                                the code with anyone. Your otp code will be effective within only 2 minutes!
                                            </p>
                                            <button className={cx("submit-otp")} onClick={verifyOTP}>
                                                Verify
                                            </button>
                                            <div className={cx("send-otp-again")}>Didn’t get the OTP? Resend</div>
                                        </div>
                                    ) : showChangePassword === true ? (
                                        <button className={cx("btn_changePassword")} onClick={changePassword}>
                                            Save
                                        </button>
                                    ) : (
                                        <button className={cx("btn_sendOTP")} onClick={handleSendOTP}>
                                            Send OTP
                                        </button>
                                    )}
                                    <FontAwesomeIcon
                                        className={cx("btn_icon")}
                                        icon={faChevronLeft}
                                        onClick={() => {
                                            setShowForgetPassword(false);
                                            setShowInputOTP(false);
                                        }}
                                    />
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div className={cx("tittle")}>Welcome</div>
                                <div className={cx("login-form")}>
                                    <div className={cx("information", "username")}>
                                        <FontAwesomeIcon className={cx("icon", "letter-icon")} icon={faEnvelope} />
                                        <input
                                            onChange={(e) => setUsername(e.target.value)}
                                            className={cx("inputUsername")}
                                            placeholder="Username or email"
                                        />
                                    </div>
                                    <div className={cx("information", "password")}>
                                        <FontAwesomeIcon className={cx("icon", "lock-icon")} icon={faLock} />
                                        <input
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={cx("inputPassword")}
                                            placeholder="Password"
                                        />
                                    </div>

                                    <p ref={warningFillInforRef} className={cx("danger-infor")}>
                                        Please fill all information.
                                    </p>

                                    <p ref={warningFailedLoginRef} className={cx("danger-infor-login")}>
                                        Your password is incorrect. Please check your password again.
                                    </p>
                                    <Link
                                        className={cx("link-forgetPassword")}
                                        onClick={() => setShowForgetPassword(true)}
                                    >
                                        Forget your password?
                                    </Link>
                                    <button className={cx("btn_login")} onClick={checkLogin}>
                                        Log In
                                    </button>
                                </div>
                                <span className={cx("footer")}>
                                    Don't have an account?{" "}
                                    <div onClick={changeForm} className={cx("change-modal")}>
                                        Sign up
                                    </div>
                                </span>
                            </Fragment>
                        )}
                    </div>
                </div>
            ) : (
                <div ref={registerModal} className={cx("register-modal")}>
                    <div className={cx("content")}>
                        <div className={cx("tittle")}>Join with us</div>
                        <div className={cx("register-form")}>
                            <div className={cx("information", "email")}>
                                <FontAwesomeIcon className={cx("icon", "letter-icon")} icon={faEnvelope} />
                                <input className={cx("inputEmail")} placeholder="Email" />
                            </div>
                            <div className={cx("information", "username")}>
                                <FontAwesomeIcon className={cx("icon", "lock-icon")} icon={faUser} />
                                <input className={cx("inputUsername")} placeholder="Username" />
                            </div>
                            <div className={cx("information", "password")}>
                                <FontAwesomeIcon className={cx("icon", "lock-icon")} icon={faUnlock} />
                                <input type="password" className={cx("inputPassword")} placeholder="Password" />
                            </div>
                            <div className={cx("information", "confimationPassowrd")}>
                                <FontAwesomeIcon className={cx("icon", "lock-icon")} icon={faLock} />
                                <input
                                    className={cx("inputConfirmationPassword")}
                                    placeholder="Password confirmation"
                                    type="password"
                                    onChange={handleSignUp}
                                />
                            </div>
                            <p ref={warningFillInforRefSignup} className={cx("danger-infor")}>
                                Please fill all information.
                            </p>
                            <p ref={warningUnvalidPassword} className={cx("danger-infor")}>
                                The confirm password does not match.
                            </p>
                            <p ref={warningFailedSignupRef} className={cx("danger-infor-login")}>
                                Sign up unsuccessfully.
                            </p>
                            <button className={cx("btn_signup")} onClick={signUp}>
                                Sign up
                            </button>
                        </div>
                        <span className={cx("footer")}>
                            Already have an account?{" "}
                            <div onClick={changeForm} className={cx("change-modal")}>
                                Log in
                            </div>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
