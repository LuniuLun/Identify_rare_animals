import classNames from "classnames/bind";
import styles from "./DetailAnimal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBinoculars, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

function DetailAnimal() {
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

    const [appearance, setAppearance] = useState();
    const [habits, setHabits] = useState();
    const [continents, setContinents] = useState("");
    const [countries, setCountries] = useState("");
    const [wwfBiomes, setWWFBiomes] = useState();
    const [levelOfDanger, setLevelOfDanger] = useState("");
    const [theRemainAmount, setTheRemainAmount] = useState("");
    const [status, setStatus] = useState(null);

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
                    // setAnimalAva(infoPost.animal.animalAva);
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
                axios
                    .get("http://localhost:8080/api/v1/animals/details/" + response.data.animal.iDDetail)
                    .then((response) => {
                        if (response.data != null) {
                            const infoDetailAnimal = response.data;
                            setAppearance(infoDetailAnimal.appearance);
                            setHabits(infoDetailAnimal.habits);
                            setContinents(infoDetailAnimal.continents);
                            setCountries(infoDetailAnimal.countries);
                            setWWFBiomes(infoDetailAnimal.wwfBiomes);
                            setLevelOfDanger(infoDetailAnimal.levelOfDanger);
                            setTheRemainAmount(infoDetailAnimal.theRemainAmount);
                            setStatus(infoDetailAnimal.status);
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
                    window.location.href = "http://localhost:3000/detailAnimal/" + id;
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const showNextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex === listImage.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
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
                                3.191 observations
                            </p>
                        </div>
                    </div>
                    <div className={cx("time-observations")}>
                        <div className={cx("time-observation")}>
                            <label>Observed:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                readOnly={!isYourObservation}
                            />
                        </div>
                        <div className={cx("time-submit")}>
                            <label>Submitted:</label>
                            <input value={date} readOnly type="date" />
                        </div>
                    </div>
                    <div className={cx("location")}>
                        <label>Location:</label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            autoComplete="off"
                            readOnly={!isYourObservation}
                        />
                    </div>
                    <div className={cx("note")}>
                        <label>Note:</label>
                        <textarea
                            onChange={(e) => setNote(e.target.value)}
                            autoComplete="off"
                            value={note}
                            readOnly={!isYourObservation}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className={cx("title")}>Detail</div>
            <div className={cx("bottom-items")}>
                <div className={cx("information")}>
                    <span>Description</span>
                    <div className={cx("detail-information")}>
                        <label>Appearance: </label>
                        <span className={cx("apearance")}>{appearance}</span>
                    </div>
                    <div className={cx("detail-information")}>
                        <label>Habits and Lifestyle: </label>
                        <span className={cx("habits")}>{habits}</span>
                    </div>
                </div>
                <div className={cx("information")}>
                    <span>Distribution </span>
                    <div className={cx("short-detail-information")}>
                        <label>Continents: </label>
                        <span className={cx("continents")}>{continents}</span>
                    </div>
                    <div className={cx("short-detail-information")}>
                        <label>Coutries: </label>
                        <span className={cx("coutries")}>{countries}</span>
                    </div>
                    <div className={cx("short-detail-information")}>
                        <label>WWF Biomes: </label>
                        <span className={cx("wwf-biomes")}>{wwfBiomes}</span>
                    </div>
                </div>
                <div className={cx("wrapper-two-infomation")}>
                    <div className={cx("information", "information-status")}>
                        <span>Status </span>
                        <div className={cx("detail-information")}>
                            <span className={cx("Status")}>{status}</span>
                        </div>
                    </div>
                    <div className={cx("conservation")}>
                        <span>Conservation status </span>
                        <div className={cx("detail-information")}>
                            <ul className={cx("list-label")}>
                                <li>Extinct</li>
                                <p></p>
                                <li>Threatened</li>
                                <p></p>
                                <li>
                                    <p>Least</p>
                                    <p>Concern</p>
                                </li>
                            </ul>
                            <ul className={cx("list-status")}>
                                <li className={cx(levelOfDanger.trim() === "Extinct" ? "level-danger" : "")}>EX</li>
                                <li
                                    className={cx(levelOfDanger.trim() === "Extinct in the Wild" ? "level-danger" : "")}
                                >
                                    EW
                                </li>
                                <li className={cx(levelOfDanger.trim() === "Highly threatend" ? "level-danger" : "")}>
                                    CR
                                </li>
                                <li className={cx(levelOfDanger.trim() === "Endangered" ? "level-danger" : "")}>EN</li>
                                <li className={cx(levelOfDanger.trim() === "Vulnerable" ? "level-danger" : "")}>VU</li>
                                <li className={cx(levelOfDanger.trim() === "Near Threatened" ? "level-danger" : "")}>
                                    NT
                                </li>
                                <li className={cx(levelOfDanger.trim() === "Least Concern" ? "level-danger" : "")}>
                                    LC
                                </li>
                            </ul>
                        </div>
                        <div className={cx("left-quantity")}>
                            <label>The remaining amount: </label>
                            <span>{theRemainAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
            {isYourObservation === true ? (
                <div className={cx("change-post")}>
                    <button className={cx("edit_btn")} onClick={editPost}>
                        Save
                    </button>
                    <button className={cx("delete_btn")} onClick={deletePost}>
                        Delete
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default DetailAnimal;
