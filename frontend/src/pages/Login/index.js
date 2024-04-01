import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles);

function Login({ setLoginStatus }) {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const warningFillInforRef = useRef(null);
    const warningFailedLoginRef = useRef(null);
    const wrapperRef = useRef(null);
    const loginModal = useRef(null);
    const registerModal = useRef(null);
    const changeForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    useEffect(() => {
        if (showLoginForm === true) {
            wrapperRef.current.style.backgroundImage = "url(/img/background_login.png)";
        } else {
            wrapperRef.current.style.backgroundImage = "url(/img/background_register.png)";
        }
    }, [showLoginForm]);
    const checkLogin = () => {
        if (username?.trim() !== "" && password?.trim() !== "") {
            if (warningFillInforRef.current !== null) {
                warningFillInforRef.current.style.display = "none";
            }
            const requestData = {
                userName: username,
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
            console.log(username, password);
            warningFillInforRef.current.style.display = "block";
            warningFailedLoginRef.current.style.display = "none";
        }
    };
    return (
        <div ref={wrapperRef} className={cx("wrapper")}>
            {showLoginForm === true ? (
                <div ref={loginModal} className={cx("login-modal")}>
                    <div className={cx("content")}>
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
                                Hãy điền đầy đủ thông tin.
                            </p>

                            <p ref={warningFailedLoginRef} className={cx("danger-infor-login")}>
                                Rất tiếc, tài khoản của bạn không đúng. Vui lòng kiểm tra lại tài khoản.
                            </p>
                            <Link className={cx("link-forgetPassword")}>Forget your password?</Link>
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
                    </div>
                </div>
            ) : (
                <div ref={registerModal} className={cx("register-modal")}>
                    <div className={cx("content")}>
                        <div className={cx("tittle")}>Join with us</div>
                        <div className={cx("login-form")}>
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
                                />
                            </div>
                            <button className={cx("btn_signup")}>Sign up</button>
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
