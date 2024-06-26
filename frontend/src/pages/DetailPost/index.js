import classNames from "classnames/bind";
import styles from "./DetailPost.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBinoculars, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailAnimal from "../../components/DetailAnimal";

const cx = classNames.bind(styles);

function DetailPost() {
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [note, setNote] = useState("");
    const [animalName, setAnimalName] = useState("");
    const [animalScientificName, setAnimalScientificName] = useState("");
    const [animalAva, setAnimalAva] = useState();

    const [isYourObservation, setIdYourObservation] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [bioUser, setBioUser] = useState("");
    const [avatarUser, setAvatarUser] = useState();

    const [showDetailAnimal, setShowDetailAnimal] = useState(false);

    const [listImage, setListImage] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/users/detailPost/" + id)
            .then((response) => {
                if (response.data !== null) {
                    const infoPost = response.data;
                    setDate(String(infoPost.date).split("T", String(infoPost.date).length)[0]);
                    setLocation(infoPost.location);
                    setNote(infoPost.note);
                    setAnimalName(infoPost.animal.animalName);
                    setAnimalScientificName(infoPost.animal.animalScientificName);
                    setAnimalAva(infoPost.animal.animalAva);
                    setIdYourObservation(parseInt(sessionStorage.getItem("userID")) === infoPost.iDUser);
                }
                axios
                    .get("http://localhost:8080/api/v1/users/" + response.data.iDUser)
                    .then((response) => {
                        if (response.data != null) {
                            const infoUser = response.data.data;
                            setUserEmail(infoUser.userEmail);
                            setDisplayName(infoUser.displayName);
                            setBioUser(infoUser.bioUser);
                            setAvatarUser(infoUser.avatarUser);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching animal data:", error);
                    });
            })
            .catch((error) => {
                console.log("Error fetching animal data:", error);
            });
    }, [id, isYourObservation]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/users/animal_album/" + id);
                if (response.data != null) {
                    const arrObject = response.data;
                    const updatedList = arrObject.map((element) => element.imageLink);
                    setListImage(updatedList);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const deletePost = () => {
        axios
            .delete("http://localhost:8080/api/v1/users/deletepost/" + id)
            .then((response) => {
                if (response.data) {
                    window.location.href = "http://localhost:3000/your_observation/" + sessionStorage.getItem("userID");
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const editPost = () => {
        axios
            .put("http://localhost:8080/api/v1/users/editpost/" + id, {
                location: location,
                note: note,
                date: date,
            })
            .then((response) => {
                if (response.data) {
                    window.location.href = "http://localhost:3000/detailPost/" + id;
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const showPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex === 0) {
                return listImage.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>
                {animalName}
                <span className={cx("scientific-name")}>({animalScientificName})</span>
            </div>
            <div className={cx("top-items")}>
                <div className={cx("wrapper-image-animal")}>
                    {listImage.length > 1 && (
                        <FontAwesomeIcon icon={faChevronLeft} className={cx("icon")} onClick={showPreviousImage} />
                    )}
                    <img className={cx("image-animal")} alt="" src={listImage[currentImageIndex]} />
                    {listImage.length > 1 && (
                        <FontAwesomeIcon icon={faChevronRight} className={cx("icon")} onClick={showPreviousImage} />
                    )}
                </div>
                <div className={cx("bio")}>
                    <div className={cx("user")}>
                        <img
                            src={avatarUser !== "" ? avatarUser : "/img/no-user-img.jpg"}
                            alt=""
                            className={cx("ava-user")}
                        />
                        <div>
                            <p className={cx("username")}>{displayName}</p>
                            <p className={cx("quantity-observation")}>
                                <FontAwesomeIcon icon={faBinoculars} className={cx("scope-icon")} />
                                3.191 quan sát
                            </p>
                        </div>
                    </div>
                    <div className={cx("time-observations")}>
                        <div className={cx("time-observation")}>
                            <label>Quan sát:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                readOnly={!isYourObservation}
                            />
                        </div>
                        <div className={cx("time-submit")}>
                            <label>Đã gửi:</label>
                            <input value={date} readOnly type="date" />
                        </div>
                    </div>
                    <div className={cx("location")}>
                        <label>Địa điểm:</label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            autoComplete="off"
                            readOnly={!isYourObservation}
                        />
                    </div>
                    <div className={cx("note")}>
                        <label>Ghi chú:</label>
                        <textarea
                            onChange={(e) => setNote(e.target.value)}
                            autoComplete="off"
                            value={note}
                            readOnly={!isYourObservation}
                        ></textarea>
                    </div>
                </div>
            </div>

            {showDetailAnimal === true ? (
                <div className={cx("detail-animal")}>
                    <DetailAnimal animalScientificName={animalScientificName} />
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
            {isYourObservation === true ? (
                <div className={cx("change-post")}>
                    <button className={cx("edit_btn")} onClick={editPost}>
                        Lưu
                    </button>
                    <button className={cx("delete_btn")} onClick={deletePost}>
                        Xóa
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default DetailPost;
