import classNames from "classnames/bind";
import styles from "./RecognizeAnimalHistory.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import DetailAnimal from "../../components/DetailAnimal";
import axios from "axios";
import WarningBox from "../../components/WarningBox";

const cx = classNames.bind(styles);

function RecognizeAnimalHistory() {
    const [animalScientificName, setAnimalScientificName] = useState("");
    const [showDetailAnimal, setShowDetailAnimal] = useState(false);
    const [recognizationResult, setRecognizationResult] = useState([]);
    const [idDeleteResult, setIdDeleteResult] = useState();
    const [locationAnimal, setLocationAnimal] = useState("");
    const [nameAnimal, setNameAnimal] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [contentWarning, setContentWarning] = useState("");
    const idUser = sessionStorage.getItem("userID");
    const changeStatusBox = () => {
        setShowWarning(false);
    };
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/users/result/" + idUser)
            .then((response) => {
                if (response.data !== null) {
                    setRecognizationResult(response.data);
                    setAnimalScientificName(response.data[0].animalScientificName);
                    console.log(response.data[0].animalScientificName);
                    axios
                        .get("http://localhost:8080/api/v1/animals/" + response.data[0].animalScientificName)
                        .then((responseDetail) => {
                            if (responseDetail.data.status === "ok") {
                                console.log(responseDetail.data);
                                setNameAnimal(responseDetail.data.data.animalName);
                            }
                        })
                        .catch((error) => console.log(error));
                    axios
                        .get(
                            "http://localhost:8080/api/v1/animals/detailbyanimalscientificname/" +
                                response.data[0].animalScientificName
                        )
                        .then((responseDetail) => {
                            if (responseDetail.data !== null) {
                                setLocationAnimal(responseDetail.data.countries);
                            }
                        })
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error));
    }, [idUser]);
    const showWarningBox = (iDResult) => {
        setIdDeleteResult(iDResult);
        setContentWarning("Bạn có chắc chắn muốn xoá ?");
        setShowWarning(true);
    };
    const deleteRecognizationResult = () => {
        axios
            .delete("http://localhost:8080/api/v1/users/deleteResult/" + idDeleteResult)
            .then((response) => {
                if (response.data !== null) {
                    window.location.reload();
                    setShowWarning(false);
                }
            })
            .catch((error) => {
                console.error("Error deleting result:", error);
                setShowWarning(false);
                setContentWarning("Bạn có chắc chắn muốn xoá ?");
                setShowWarning(true);
            });
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("head")}>
                <span>Lịch Sử Quan Sát</span>
                <div className={cx("right-items")}>
                    <div className={cx("wrapper-find-animal")}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                        <input className={cx("name-animal")} placeholder="Animal" />
                    </div>
                    <button className={cx("btn_find")}>Tìm</button>
                </div>
            </div>
            <div className={cx("statistic")}></div>
            <div className={cx("body")}>
                <div className={cx("wrapper-detail-animal")}>
                    {recognizationResult.length > 0 ? (
                        recognizationResult.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cx("form-detail")}
                                    onClick={(event) => {
                                        if (!event.target.classList.contains(cx("delete_but"))) {
                                            setShowDetailAnimal(true);
                                        }
                                    }}
                                >
                                    <div className={cx("wrapper-image")}>
                                        <div className={cx("slide-images")}>
                                            <img
                                                className={cx("animal-image")}
                                                src={item.imageLink ?? item.imageLink}
                                                alt="Don't get animal"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className={cx("information")}>
                                            <span className={cx("species-name")}>
                                                <b>{nameAnimal}</b>
                                            </span>
                                        </div>
                                        <div className={cx("information")}>
                                            <span className={cx("species-name")}>{item.animalScientificName}</span>
                                        </div>
                                        <div className={cx("information")}>
                                            <span className={cx("date")}>
                                                {String(item.date).split("T", String(item.date).length)[0]}
                                            </span>
                                        </div>
                                        <div className={cx("information")}>
                                            <span className={cx("location")}>{locationAnimal}</span>
                                        </div>
                                        <div className={cx("information")}>
                                            <button
                                                className={cx("delete_but")}
                                                onClick={() => {
                                                    showWarningBox(item.iDResult);
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>Chưa có kết quả nhận dạng nào</div>
                    )}
                    {showDetailAnimal === true ? (
                        <div className={cx("show-detail-animal")}>
                            <div className={cx("detail-animal")}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={cx("close-icon")}
                                    onClick={() => {
                                        setShowDetailAnimal(false);
                                    }}
                                />
                                <DetailAnimal animalScientificName={animalScientificName} />
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            {showWarning === true ? (
                <div className={cx("wrapper-warningBox")}>
                    <WarningBox
                        content={contentWarning}
                        handleSubmitButton={deleteRecognizationResult}
                        handleCancelButton={changeStatusBox}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default RecognizeAnimalHistory;
