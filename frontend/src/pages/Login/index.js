import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const cx = classNames.bind(styles);

function Login() {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const changeForm = () => {
        setShowLoginForm(!showLoginForm);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("slide")}></div>
            {showLoginForm === true ? (
                <div className={cx("login-modal")}>
                    <div className={cx("tittle")}>Welcome Back!</div>
                    <div className={cx("login-form")}>
                        <div className={cx("information", "username")}>
                            <FontAwesomeIcon className={cx("icon", "letter-icon")} icon={faEnvelope} />
                            <input className={cx("inputUsername")} placeholder="Username or email" />
                        </div>
                        <div className={cx("information", "password")}>
                            <FontAwesomeIcon className={cx("icon", "lock-icon")} icon={faLock} />
                            <input className={cx("inputPassword")} placeholder="Password" />
                        </div>
                        <Link className={cx("link-forgetPassword")}>Forget your password?</Link>
                        <button className={cx("btn_login")}>Log In</button>
                    </div>
                    <span className={cx("footer")}>
                        Don't have an account?{" "}
                        <div onClick={changeForm} className={cx("change-modal")}>
                            Sign up
                        </div>
                    </span>
                </div>
            ) : (
                <div className={cx("register-modal")}>
                    <div className={cx("tittle")}>Join the largest group of naturalists in the world!</div>
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
                            <input className={cx("inputPassword")} placeholder="Password" />
                        </div>
                        <div className={cx("information", "confimationPassowrd")}>
                            <FontAwesomeIcon className={cx("icon", "lock-icon")} icon={faLock} />
                            <input className={cx("inputConfirmationPassword")} placeholder="Password confirmation" />
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
            )}
        </div>
    );
}

export default Login;
