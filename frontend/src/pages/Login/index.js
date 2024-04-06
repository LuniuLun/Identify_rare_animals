import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
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
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [usernameoremail, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showForgetPassword, setShowForgetPassword] = useState(false);
    const warningFillInforRef = useRef(null);
    const warningFillInforRefSignup = useRef(null);
    const warningUnvalidPassword = useRef(null);
    const warningFailedLoginRef = useRef(null);
    const warningFailedSignupRef = useRef(null);
    const wrapperRef = useRef(null);
    const loginModal = useRef(null);
    const registerModal = useRef(null);
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
                                    <div className={cx("information", "email")}>
                                        <FontAwesomeIcon className={cx("icon", "letter-icon")} icon={faEnvelope} />
                                        <input className={cx("inputEmailForgotPassword")} placeholder="Email" />
                                    </div>
                                    <button className={cx("btn_sendOTP")} onClick={handleSendOTP}>
                                        Send OTP
                                    </button>
                                    <button className={cx("btn_back")} onClick={() => setShowForgetPassword(false)}>
                                        Back
                                    </button>
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
                                    <Link className={cx("link-forgetPassword")} onClick={() => setShowForgetPassword(true)}>Forget your password?</Link>
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
                                Hãy điền đầy đủ thông tin.
                            </p>
                            <p ref={warningUnvalidPassword} className={cx("danger-infor")}>
                                Mật khẩu chưa khớp.
                            </p>
                            <p ref={warningFailedSignupRef} className={cx("danger-infor-login")}>
                                Đăng kí không thành công.
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
