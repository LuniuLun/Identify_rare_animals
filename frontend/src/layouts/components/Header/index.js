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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        onDrop: async (acceptedFiles) => {
            setImage(
                acceptedFiles.map((upFile) =>
                    Object.assign(upFile, {
                        preview: URL.createObjectURL(upFile),
                    })
                )
            );
            if (acceptedFiles.length === 0) {
                console.error("Không có tập tin nào được thả hoặc các tập tin không phải là hình ảnh hợp lệ.");
                return;
            }

            // const file = acceptedFiles[acceptedFiles.length - 1]; // Lấy tập tin đầu tiên
            // const requestData = new FormData();
            // requestData.append("file", file);
            // axios
            //     .post("http://127.0.0.1:5000/upload_image", requestData, {
            //         headers: {
            //             Accept: "application/json",
            //             "Content-Type": "multipart/form-data",
            //         },
            //     })
            //     .then((res) => {
            //         console.log(res);
            //         if (res.status === 200) {
            //             console.log(res.data.predicted_label.predicted_label);
            //             setSpeciesName(res.data.predicted_label.predicted_label);
            //         }
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     });

            setIsHavingImage(true);
        },
    });

    const closeModal = () => {
        setShowModal(false);
    };
    const openModal = () => {
        setShowModal(true);
    };

    // const connectCam = async () => {
    //     try {
    //         const response = await axios.get("http://172.20.10.3", {
    //             responseType: "arraybuffer", // Để Axios biết cần nhận dữ liệu dưới dạng arraybuffer
    //         });

    //         const imageBlob = new Blob([response.data], { type: "image/jpeg" });
    //         const imageUrl = URL.createObjectURL(imageBlob);
    //         //   setImageSrc(imageUrl)
    //         console.log(imageUrl);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const setOpenOptions = () => {
        setShowListOptionsUser((preivous) => !preivous);
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
                        <Link to="http://172.20.10.3" className={cx("btn_addAnimal")} >
                            Recognize
                        </Link>
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

                        {isHavingImage ? <div className={cx("title")}>Editing observation:</div> : <></>}
                        {isHavingImage ? (
                            <div className={cx("wrapper-detail-animal")}>
                                {yourImage.map((image, index) => {
                                    return (
                                        <div index={index} className={cx("form-detail")}>
                                            <div className={cx("wrapper-image")}>
                                                <img
                                                    // src="/img/con_cong.jpg"
                                                    src={image.preview}
                                                    alt=""
                                                    className={cx("animal-image")}
                                                />
                                            </div>
                                            <div className={cx("information")}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("icon")} />
                                                <input
                                                    value={speciesName}
                                                    className={cx("species-name")}
                                                    placeholder="Species name"
                                                    readOnly
                                                />
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
                                    );
                                })}
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
                        {isHavingImage ? (
                            <div className={cx("wrapper-btn-submit")}>
                                <button className={cx("combine")}>Combine</button>
                                <button className={cx("submit")}>Submit</button>
                            </div>
                        ) : (
                            <></>
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
