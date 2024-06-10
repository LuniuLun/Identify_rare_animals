import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import DetailAnimal from "../../../components/DetailAnimal";
import Loading from "../../../components/Loading";

const cx = classNames.bind(styles);

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [showListOptionsUser, setShowListOptionsUser] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [completedRecognization, setCompletedRecognization] = useState(false);
    const [detailAnimal, setDetailAnimal] = useState(null);
    const [showDetailAnimal, setShowDetailAnimal] = useState(false);
    const [relativeAnimalImage, setRelativeAnimalImage] = useState([]);
    const [animalName, setAnimalName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [accurary, setAccurary] = useState("");
    const [userAva, setUserAva] = useState("");
    const [animalImage, setAnimalImage] = useState("");
    const [idAnimal, setIdAnimal] = useState("");
    const [imageUrl, setImageUrl] = useState("http://192.168.0.107/cam-lo.jpg");

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

    useEffect(() => {
        if (imageUrl !== "") {
            const interval = setInterval(() => {
                // Cập nhật URL của hình ảnh bằng cách thêm một timestamp mới
                setImageUrl((prevUrl) => prevUrl.split("?")[0] + "?" + new Date().getTime());
            }, 50); // 5000 milliseconds = 1 seconds

            // Xóa interval khi component unmount để tránh memory leak
            return () => clearInterval(interval);
        }
    }, [imageUrl]);
    const openModal = async () => {
        setShowModal(true);
        function recognizeAnimal() {
            axios
                .post("http://127.0.0.1:5000/recognize_animal", { image_url: imageUrl })
                .then(async (resRecognize) => {
                    // Xử lý phản hồi từ server
                    if (resRecognize.status === 200) {
                        console.log(resRecognize.data);
                        const confidenceWithPercentage = resRecognize.data.confidence; // "74.77%"
                        const confidenceWithoutPercentage = parseInt(confidenceWithPercentage.replace(/%/g, "")); // 74
                        if (confidenceWithoutPercentage < 80) {
                            recognizeAnimal(); // Gọi lại hàm đệ quy nếu độ chính xác thấp hơn 70%
                        } else {
                            setCompletedRecognization(true);
                            setScientificName(resRecognize.data.predicted_label);
                            setAnimalImage(resRecognize.data.url_image);
                            setAccurary(resRecognize.data.confidence);
                            console.log(resRecognize.data.predicted_label);
                            const [resAnimal, resDetail] = await Promise.all([
                                axios.get("http://localhost:8080/api/v1/animals/" + resRecognize.data.predicted_label),
                                axios.get(
                                    "http://localhost:8080/api/v1/animals/detailbyanimalscientificname/" +
                                        resRecognize.data.predicted_label
                                ),
                            ]);
                            console.log(resAnimal);
                            const resRelativeAblum = await axios.get(
                                "http://localhost:8080/api/v1/animals/album/" + resAnimal.data.data.iDAnimal
                            );
                            console.log(resRelativeAblum);
                            setRelativeAnimalImage(resRelativeAblum.data);
                            setAnimalName(resAnimal.data.data.animalName);
                            setIdAnimal(resAnimal.data.data.iDAnimal);
                            setDetailAnimal(resDetail.data);
                            console.log(resAnimal.data.data.animalName);
                            console.log(resDetail.data);
                            setImageUrl("");
                        }
                    } else {
                        throw new Error("Failed to recognize animal.");
                    }
                })
                .catch((error) => {
                    console.error("Error recognizing animal:", error);
                });
        }

        // Gọi hàm đệ quy để bắt đầu quá trình nhận dạng
        recognizeAnimal();
    };

    const closeModal = () => {
        setShowModal(false);
        setCompletedRecognization(false);
    };

    const setOpenOptions = () => {
        setShowListOptionsUser((previous) => !previous);
    };

    const saveRecognitionResult = async () => {
        const requestData = {
            iDUser: sessionStorage.getItem("userID"),
            imageLink: animalImage,
            predictedAnimal: idAnimal,
            predictedAccuracy: parseInt(accurary.replace("%", "")),
            animalScientificName: scientificName,
        };
        console.log(requestData);
        const saveRecognition = await axios.post("http://localhost:8080/api/v1/users/newResult", requestData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (saveRecognition.status === 200) {
            setShowModal(false);
            setCompletedRecognization(false);
            window.location.href = "http://localhost:3000/recognize_animal_history";
        }
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
                    {/* <Link className={cx("link")} to={"/"}>
                        <span>Cộng đồng</span>
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} />
                    </Link>
                    <Link className={cx("link")} to={"/"}>
                        <span>Thêm</span>
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} />
                    </Link> */}
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
                                    to={"http://localhost:3000/recognize_animal_history"}
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
                        {imageUrl !== "" ? (
                            <div className={cx("wrapper-cam-esp32")}>
                                <h2>Recognize</h2>
                                <img src={imageUrl} alt="animal-img" />
                            </div>
                        ) : (
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
                                                {relativeAnimalImage.slice(0, 4).map((item, index) => {
                                                    return (
                                                        <img
                                                            key={index}
                                                            className={cx("regular-image-animal")}
                                                            alt=""
                                                            src={item.imageLink}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            {/* <button className={cx("btn-more")}>XEM THÊM</button> */}
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
                                {isLogin === true ? (
                                    <div className={cx("wrapper-btn_save-result")}>
                                        <button
                                            className={cx("save-recognization-result")}
                                            onClick={saveRecognitionResult}
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </>
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

// {/* <>
// {completedRecognization === true ? (

// ) : (
//     <div className={cx("wrapper-loading")}>
//         <Loading messsage={"Đang chờ kết quả nhận dạng..."} />
//     </div>
// )}
// </> */}
