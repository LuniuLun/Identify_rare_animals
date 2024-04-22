import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import DetailAnimal from "../../../components/DetailAnimal";

const cx = classNames.bind(styles);

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [showListOptionsUser, setShowListOptionsUser] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [animalName, setAnimalName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [accurary, setAccurary] = useState("");
    const [completedRecognization, setCompletedRecognization] = useState(false);
    const [detailAnimal, setDetailAnimal] = useState(null);
    const [userAva, setUserAva] = useState("");
    const [animalImage, setAnimalImage] = useState("");
    const [showDetailAnimal, setShowDetailAnimal] = useState(false);
    useEffect(() => {
        const idUser = sessionStorage.getItem("userID");
        if (idUser !== null) {
            setIsLogin(true);
            axios
                .get("http://localhost:8080/api/v1/users/" + idUser)
                .then((res) => {
                    setUserAva(res.data.data.avatarUser);
                })
                .catch(() => {});
        } else {
            setIsLogin(false);
        }
    }, []);

    const openModal = async () => {
        setShowModal(true);
        const requestData = {
            recognize: "true",
        };
        // axios
        //     .post("http://127.0.0.1:5000/recognize_animal", requestData, {
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //         },
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         if (res.status === 200) {
        //             setCompletedRecognization(true);
        //             setScientificName(res.data.predicted_label.predicted_label);
        //             setAccurary(res.data.predicted_label.confidence);

        //             axios
        //                 .get("http://localhost:8080/api/v1/animals/" + res.data.predicted_label.predicted_label)
        //                 .then((res) => {
        //                     setAnimalName(res.data.data[0].animalName);
        //                     console.log(res.data);
        //                 })
        //                 .catch((error) => {
        //                     console.error(error);
        //                 });

        //             axios
        //                 .get(
        //                     "http://localhost:8080/api/v1/animals/detailbyanimalscientificname/" +
        //                         res.data.predicted_label.predicted_label
        //                 )
        //                 .then((res) => {
        //                     console.log(res.data);
        //                     setDetailAnimal(res.data);
        //                 })
        //                 .catch((error) => {
        //                     console.error(error);
        //                 });
        //         } else {
        //             throw new Error("Failed to recognization animal.");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error recognizing animal:", error);
        //         // Handle the error here, you can set an error message state
        //     });
        try {
            const resRecognize = await axios.post("http://127.0.0.1:5000/recognize_animal", requestData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (resRecognize.status === 200) {
                setCompletedRecognization(true);
                setScientificName(resRecognize.data.predicted_label);
                setAnimalImage(resRecognize.data.url_image);
                console.log(resRecognize.data);
                setAccurary(resRecognize.data.confidence);
                const [resAnimal, resDetail] = await Promise.all([
                    axios.get("http://localhost:8080/api/v1/animals/" + resRecognize.data.predicted_label),
                    axios.get(
                        "http://localhost:8080/api/v1/animals/detailbyanimalscientificname/" +
                            resRecognize.data.predicted_label
                    ),
                ]);

                setAnimalName(resAnimal.data.data.animalName);
                setDetailAnimal(resDetail.data);
                console.log(resAnimal.data.data.animalName);
                console.log(resDetail.data);
            } else {
                throw new Error("Failed to recognize animal.");
            }
        } catch (error) {
            console.error("Error recognizing animal:", error);
            // Xử lý lỗi ở đây, bạn có thể set state cho thông báo lỗi
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setCompletedRecognization(false);
    };

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
                        <span>Khám phá</span>
                    </Link>
                    {isLogin === true ? (
                        <Link className={cx("link")} to={"/your_observation/" + sessionStorage.getItem("userID")}>
                            <span>Quan sát của bạn</span>
                        </Link>
                    ) : (
                        <></>
                    )}
                    <Link className={cx("link")} to={"/"}>
                        <span>Cộng đồng</span>
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} />
                    </Link>
                    <Link className={cx("link")} to={"/"}>
                        <span>Thêm</span>
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} />
                    </Link>
                </div>
            </div>
            <div className={cx("left-item")}>
                <Link to={"#"} className={cx("btn_addAnimal")} onClick={openModal}>
                    Nhận dạng
                </Link>
                {isLogin === true ? (
                    <Fragment>
                        <Link to={"/post_animal"} className={cx("btn_addAnimal")}>
                            Tải lên
                        </Link>
                        <img
                            src={userAva !== "" ? userAva : "/img/no-user-img.jpg"}
                            alt=""
                            className={cx("ava-user")}
                            onClick={setOpenOptions}
                        />
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} onClick={setOpenOptions} />
                        {showListOptionsUser === true ? (
                            <div className={cx("list-options-user")}>
                                <Link to={"/Profile"} className={cx("option-user")} onClick={setOpenOptions}>
                                    Hồ sơ
                                </Link>
                                <Link
                                    to={"http://localhost:3000/your_observation/" + sessionStorage.getItem("userID")}
                                    className={cx("option-user")}
                                    onClick={setOpenOptions}
                                >
                                    Quan sát của bạn
                                </Link>
                                <Link
                                    // to={"http://localhost:3000/your_observation/" + sessionStorage.getItem("userID")}
                                    className={cx("option-user")}
                                    onClick={setOpenOptions}
                                >
                                    Nhận dạng của bạn
                                </Link>
                                <Link to={"/post_animal"} className={cx("option-user")}>
                                    Tải lên
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
                                    Đăng xuất
                                </Link>
                            </div>
                        ) : (
                            <></>
                        )}
                    </Fragment>
                ) : (
                    <Link className={cx("link")} to={"/login"}>
                        Đăng nhập
                    </Link>
                )}
            </div>

            {showModal === true ? (
                <div className={cx("modal")}>
                    <div className={cx("modal-content")}>
                        <FontAwesomeIcon icon={faXmark} className={cx("close-icon")} onClick={closeModal} />
                        {completedRecognization === true ? (
                            <>
                                <div className={cx("title")}>Kết quả Nhận dạng</div>
                                <div className={cx("top-items")}>
                                    <div className={cx("wrapper-image-animal")}>
                                        <img
                                            className={cx("image-animal")}
                                            alt=""
                                            src={animalImage !== "" ? animalImage : ""}
                                        />
                                    </div>
                                    <div className={cx("detail-result")}>
                                        <div className={cx("accurary-result")}>
                                            <label>Độ chính xác:</label>
                                            <input className={cx("accurary")} value={accurary} readOnly />
                                        </div>
                                        <div className={cx("list-names")}>
                                            {/* <div className={cx("name")}>
                                        <label>Tên loài: </label>
                                        <input className={cx("species-name")} value={speciesName} readOnly />
                                    </div> */}
                                            <div className={cx("name")}>
                                                <label>Tên khoa học: </label>
                                                <input
                                                    className={cx("scientific-name")}
                                                    value={scientificName}
                                                    readOnly
                                                />
                                            </div>
                                            <div className={cx("name")}>
                                                <label>Động vật: </label>
                                                <input className={cx("animal")} value={animalName} readOnly />
                                            </div>
                                        </div>
                                        <div className={cx("regular-images")}>
                                            <div className={cx("list-iamges")}>
                                                <img
                                                    className={cx("regular-image-animal")}
                                                    alt=""
                                                    src="/img/con_cong.jpg"
                                                />
                                                <img
                                                    className={cx("regular-image-animal")}
                                                    alt=""
                                                    src="/img/con_cong.jpg"
                                                />
                                                <img
                                                    className={cx("regular-image-animal")}
                                                    alt=""
                                                    src="/img/con_cong.jpg"
                                                />
                                                <img
                                                    className={cx("regular-image-animal")}
                                                    alt=""
                                                    src="/img/con_cong.jpg"
                                                />
                                            </div>
                                            <button className={cx("btn-more")}>XEM THÊM</button>
                                        </div>
                                    </div>
                                </div>
                                {showDetailAnimal === true ? (
                                    <div className={cx("detail-animal")}>
                                        <DetailAnimal animalScientificName={scientificName} />
                                    </div>
                                ) : (
                                    <div className={cx("wrapper-btn_show")}>
                                        <button
                                            className={cx("show-detail-animal")}
                                            onClick={() => {
                                                setShowDetailAnimal(true);
                                            }}
                                        >
                                            Hiển thị chi tiết
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div>ĐANG CHỜ KẾT QUẢ NHẬN DẠNG</div>
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
