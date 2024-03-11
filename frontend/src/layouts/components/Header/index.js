import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faL, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import LogoSVG from "../../../assets/logo";
import { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const cx = classNames.bind(styles);

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [showListOptionsUser, setShowListOptionsUser] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isHavingImage, setIsHavingImage] = useState(false);
    const [yourImage, setImage] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem("userID") !== null) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setImage(
                acceptedFiles.map((upFile) =>
                    Object.assign(upFile, {
                        preview: URL.createObjectURL(upFile),
                    })
                )
            );
            setIsHavingImage(true);
        },
    });

    const closeModal = () => {
        setShowModal(false);
    };
    const openModal = () => {
        setShowModal(true);
    };

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
                        <button className={cx("btn_addAnimal")} onClick={openModal}>
                            Upload
                        </button>
                        <img src="/img/no-user-img.jpg" alt="" className={cx("ava-user")} onClick={setOpenOptions} />
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} onFocus={setOpenOptions} />
                        {showListOptionsUser === true ? (
                            <div className={cx("list-options-user")}>
                                <Link to={"/Profile"} className={cx("option-user")} onClick={setOpenOptions}>
                                    Profile
                                </Link>
                                <Link to={"/"} className={cx("option-user")} onClick={setOpenOptions}>
                                    Your Observations
                                </Link>
                                <button onClick={openModal} className={cx("option-user")}>
                                    Uploads
                                </button>
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
                <div className={cx("add-animal-modal")}>
                    <div className={cx("body")}>
                        <FontAwesomeIcon icon={faXmark} className={cx("close-icon")} onClick={closeModal} />

                        {isHavingImage ? (
                            <div className={cx("wrapper-detail-animal")}>
                                <div className={cx("form-detail")}>
                                    <div className={cx("title")}>Editing observation:</div>
                                    <div className={cx("information")}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("icon")} />
                                        <input className={cx("species-name")} placeholder="Species name" />
                                    </div>
                                    <div className={cx("information")}>
                                        <FontAwesomeIcon icon={faCalendarDays} className={cx("icon")} />
                                        <input className={cx("date")} placeholder="Date" />
                                    </div>
                                    <div className={cx("information")}>
                                        <FontAwesomeIcon icon={faLocationDot} className={cx("icon")} />
                                        <input className={cx("location")} placeholder="Location" />
                                    </div>
                                    <div className={cx("information")}>
                                        <textarea className={cx("note")} placeholder="Note"></textarea>
                                    </div>
                                </div>
                                <img src={yourImage[0].preview} alt="" className={cx("animal-image")} />
                            </div>
                        ) : (
                            <div className={cx("add-image")}>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p className={cx("introduction")}>Drop the image here...</p>
                                    ) : (
                                        <p className={cx("introduction")}>
                                            Drag & drop image here or click to select image
                                        </p>
                                    )}
                                </div>
                            </div>
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
