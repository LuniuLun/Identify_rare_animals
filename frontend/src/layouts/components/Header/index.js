import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LogoSVG from "../../../assets/logo";
import { Fragment, useState } from "react";
const cx = classNames.bind(styles);

function Header() {
    const [isLogin, setIsLogin] = useState(true);
    const [showListOptionsUser, setShowListOptionsUser] = useState(false);

    const setOpenOptions = () => {
        setShowListOptionsUser((preivous) => !preivous);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("right-item")}>
                <LogoSVG className={cx("logo")} />
                <button className={cx("wrapper-find-icon")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                </button>
                <div className={cx("list-options")}>
                    <Link className={cx("link")} to={"/"}>
                        <span>Explore</span>
                    </Link>
                    {isLogin === true ? (
                        <Link className={cx("link")} to={"/"}>
                            <span>Your Observations</span>
                        </Link>
                    ) : (
                        <></>
                    )}
                    <Link className={cx("link")} to={"/"}>
                        <span>Community</span>
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} />
                    </Link>
                    <Link className={cx("link")} to={"/"}>
                        <span>More</span>
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} />
                    </Link>
                </div>
            </div>
            <div className={cx("left-item")}>
                {isLogin === true ? (
                    <Fragment>
                        <img src="/img/no-user-img.jpg" alt="" className={cx("ava-user")} onClick={setOpenOptions} />
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} onFocus={setOpenOptions} />
                        {showListOptionsUser === true ? (
                            <div className={cx("list-options-user")}>
                                <Link to={"/Profile"} className={cx("option-user")}>
                                    Profile
                                </Link>
                                <Link to={"/"} className={cx("option-user")}>
                                    Your Observations
                                </Link>
                                <Link to={"/upload-animal"} className={cx("option-user")}>
                                    Uploads
                                </Link>
                                <Link to={"/login"} className={cx("option-user")}>
                                    Sign out
                                </Link>
                            </div>
                        ) : (
                            <></>
                        )}
                    </Fragment>
                ) : (
                    <Link className={cx("link")} to={"/login"}>
                        Log In
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
