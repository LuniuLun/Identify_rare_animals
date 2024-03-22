import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
const cx = classNames.bind(styles);

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [showListOptionsUser, setShowListOptionsUser] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isHavingImage, setIsHavingImage] = useState(false);
    const [yourImage, setImage] = useState([]);
    const [speciesName, setSpeciesName] = useState([]);
    const speciesNameRef = useRef();
    useEffect(() => {
        if (sessionStorage.getItem("userID") !== null) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    

    const handleRecognizeClick = async () => {
        try {
            // Mở trang mới chứa camera để chụp ảnh
            window.open("http://172.20.10.3/", "_blank");
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Xử lý khi nhận được ảnh từ trang khác (giả sử là từ trang http://172.20.10.3/)
    window.addEventListener("message", (event) => {
        if (event.origin === "http://172.20.10.3" && event.data.type === "image") {
            setImage(event.data.imageSrc);
            setShowModal(true); // Hiển thị modal khi nhận được ảnh
            console.log(event.data.imageSrc);
        }
    });

    const setOpenOptions = () => {
        setShowListOptionsUser((previous) => !previous);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("right-item")}>
                <Link to={"/"} className={cx("logo")}>
                    <p>R</p>aniland
                </Link>
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
                        <Link to={"#"} className={cx("btn_addAnimal")} onClick={handleRecognizeClick}>
                            Recognize
                        </Link>
                        <Link to={"/post_animal"} className={cx("btn_addAnimal")}>
                            Upload
                        </Link>
                        <img
                            src="/img/no-user-img.jpg"
                            alt=""
                            className={cx("ava-user")}
                            onClick={setOpenOptions}
                        />
                        <FontAwesomeIcon
                            className={cx("down-icon")}
                            icon={faChevronDown}
                            onClick={setOpenOptions}
                        />
                        {showListOptionsUser === true ? (
                            <div className={cx("list-options-user")}>
                                <Link to={"/Profile"} className={cx("option-user")} onClick={setOpenOptions}>
                                    Profile
                                </Link>
                                <Link to={"/"} className={cx("option-user")} onClick={setOpenOptions}>
                                    Your Observations
                                </Link>
                                <Link to={"/post_animal"} className={cx("option-user")}>
                                    Uploads
                                </Link>
                                <Link
                                    to={"/login"}
                                    className={cx("option-user")}
                                    onClick={() => {
                                        sessionStorage.removeItem("userID");
                                        setIsLogin(false);
                                        setOpenOptions();
                                    }}
                                >
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

            {showModal === true ? (
                <div className={cx("modal")}>
                    <div className={cx("modal-content")}>
                        <span className={cx("close")} onClick={closeModal}>
                            &times;
                        </span>
                        {yourImage ? (
                            <img src={yourImage} alt="Captured" className={cx("captured-image")} />
                        ) : (
                            <p>No image captured.</p>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Header;