import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AnimalLabel from "../../components/AnimalLabel";
import { useEffect, useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles);

function Admin() {
    const [findAnimaInput, setFindAnimalInput] = useState("");
    const [currentIdAnimal, setCurrentIdAnimal] = useState();
    const [animal, setAnimal] = useState([]);
    const [avaAnimal, setAvaAnimal] = useState("");
    const [speciesName, setSpeciesName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [levelOfDanger, setDangerLevel] = useState("");
    const [remainingAmount, setRemainingAmount] = useState("");
    const [appearance, setAppearance] = useState("");
    const [habits, setHabits] = useState("");
    const [wwfBiomes, setWwfBiomes] = useState("");
    const [continents, setContinents] = useState("");
    const [countries, setCountries] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const roleAcc = sessionStorage.getItem("roleAcc");
        if (roleAcc && roleAcc === "0") {
            setLoading(true);
        } else {
            window.location.href = "http://localhost:3000";
        }
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/animals")
            .then((res) => {
                if (res.data !== null) {
                    setAnimal(res.data);
                    setCurrentIdAnimal(res.data[0].iDAnimal);
                    console.log(res.data);
                    setAvaAnimal(res.data[0].animalAva);
                    setSpeciesName(res.data[0].animalName);
                    setScientificName(res.data[0].animalScientificName);
                    axios
                        .get("http://localhost:8080/api/v1/animals/detailbyidanimal/" + res.data[0].iDAnimal)
                        .then((res) => {
                            setDangerLevel(res.data.levelOfDanger);
                            setRemainingAmount(res.data.theRemainAmount);
                            setAppearance(res.data.appearance);
                            setHabits(res.data.habits);
                            setWwfBiomes(res.data.wwfBiomes);
                            setContinents(res.data.continents);
                            setCountries(res.data.countries);
                            setStatus(res.data.status);
                        })
                        .catch((e) => console.log(e));
                }
            })
            .catch((e) => console.log(e));
    }, []);

    const getDetailAnimal = (iDAnimal) => {
        setCurrentIdAnimal(iDAnimal);
        setAvaAnimal(animal[iDAnimal - 1].animalAva);
        setSpeciesName(animal[iDAnimal - 1].animalName);
        setScientificName(animal[iDAnimal - 1].animalScientificName);
        axios
            .get("http://localhost:8080/api/v1/animals/detailbyidanimal/" + iDAnimal)
            .then((res) => {
                setDangerLevel(res.data.levelOfDanger);
                setRemainingAmount(res.data.theRemainAmount);
                setAppearance(res.data.appearance);
                setHabits(res.data.habits);
                setWwfBiomes(res.data.wwfBiomes);
                setContinents(res.data.continents);
                setCountries(res.data.countries);
                setStatus(res.data.status);
            })
            .catch((e) => console.log(e));
    };

    const handleFindAnimal = () => {
        if (findAnimaInput !== "") {
            axios
                .get("http://localhost:8080/api/v1/animals/search/" + findAnimaInput)
                .then((res) => {
                    if (res.data !== null) {
                        setAnimal(res.data);
                        setAvaAnimal(res.data[0].animalAva);
                        setSpeciesName(res.data[0].animalName);
                        setScientificName(res.data[0].animalScientificName);
                        axios
                            .get("http://localhost:8080/api/v1/animals/detailbyidanimal/" + res.data[0].iDAnimal)
                            .then((res) => {
                                setDangerLevel(res.data.levelOfDanger);
                                setRemainingAmount(res.data.theRemainAmount);
                                setAppearance(res.data.appearance);
                                setHabits(res.data.habits);
                                setWwfBiomes(res.data.wwfBiomes);
                                setContinents(res.data.continents);
                                setCountries(res.data.countries);
                                setStatus(res.data.status);
                            })
                            .catch((e) => console.log(e));
                    }
                })
                .catch((e) => console.log(e));
        }
    };

    const handleSaveDetailAnimal = () => {
        axios
            .put("http://localhost:8080/api/v1/animals/editdetail/" + currentIdAnimal, {
                appearance: appearance,
                habits: habits,
                continents: continents,
                countries: countries,
                wwfBiomes: wwfBiomes,
                levelOfDanger: levelOfDanger,
                theRemainAmount: remainingAmount,
                status: status,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === "ok") {
                    window.location.reload();
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className={cx("wrapper")}>
            {loading === true ? (
                <>
                    {" "}
                    <div className={cx("header")}>
                        <div className={cx("right-item")}>
                            <Link to={"/"} className={cx("logo")}>
                                <p>R</p>aniland
                            </Link>
                            <button className={cx("wrapper-find-icon")}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                            </button>
                        </div>
                        <div className={cx("left-item")}>
                            <div className={cx("link")}>
                                <span>Admin</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("body")}>
                        <div className={cx("left-body")}>
                            <div className={cx("edit-profile")}>
                                <div className={cx("items")}>
                                    <h2>Chi tiết</h2>
                                    <button className={cx("btn_save")} onClick={handleSaveDetailAnimal}>
                                        Lưu
                                    </button>
                                </div>
                                <div className={cx("items")}>
                                    <img src={avaAnimal} alt="" className={cx("ava-animal")} />
                                </div>
                                <div className={cx("add-space")}></div>
                                <div className={cx("items")}>
                                    <label>Loài</label>
                                    <input
                                        type="text"
                                        value={speciesName}
                                        className={cx("name")}
                                        placeholder="Species name"
                                        readOnly
                                    />
                                </div>
                                <div className={cx("items")}>
                                    <label>Tên khoa học:</label>
                                    <input
                                        className={cx("name")}
                                        placeholder="Scientific name"
                                        value={scientificName}
                                        readOnly
                                    />
                                </div>
                                <div className={cx("items")}>
                                    <label>Tình trạng bảo tồn:</label>
                                    <div className={cx("status")}>
                                        <ul className={cx("list-status")}>
                                            <li
                                                data-value="Extinct"
                                                className={cx(levelOfDanger.trim() === "Extinct" ? "level-danger" : "")}
                                                onClick={(e) => {
                                                    setDangerLevel(e.currentTarget.getAttribute("data-value"));
                                                    console.log(e.currentTarget.getAttribute("data-value"));
                                                }}
                                            >
                                                EX
                                            </li>
                                            <li
                                                data-value="Extinct in the Wild"
                                                className={cx(
                                                    levelOfDanger.trim() === "Extinct in the Wild" ? "level-danger" : ""
                                                )}
                                                onClick={(e) => {
                                                    setDangerLevel(e.currentTarget.getAttribute("data-value"));
                                                    console.log(e.currentTarget.getAttribute("data-value"));
                                                }}
                                            >
                                                EW
                                            </li>
                                            <li
                                                data-value="Critically Endangered"
                                                className={cx(
                                                    levelOfDanger.trim() === "Critically Endangered"
                                                        ? "level-danger"
                                                        : ""
                                                )}
                                                onClick={(e) => {
                                                    setDangerLevel(e.currentTarget.getAttribute("data-value"));
                                                    console.log(e.currentTarget.getAttribute("data-value"));
                                                }}
                                            >
                                                CR
                                            </li>
                                            <li
                                                data-value="Endangered"
                                                className={cx(
                                                    levelOfDanger.trim() === "Endangered" ? "level-danger" : ""
                                                )}
                                                onClick={(e) => {
                                                    setDangerLevel(e.currentTarget.getAttribute("data-value"));
                                                    console.log(e.currentTarget.getAttribute("data-value"));
                                                }}
                                            >
                                                EN
                                            </li>
                                            <li
                                                data-value="Vulnerable"
                                                className={cx(
                                                    levelOfDanger.trim() === "Vulnerable" ? "level-danger" : ""
                                                )}
                                                onClick={(e) => {
                                                    setDangerLevel(e.currentTarget.getAttribute("data-value"));
                                                    console.log(e.currentTarget.getAttribute("data-value"));
                                                }}
                                            >
                                                VU
                                            </li>
                                            <li
                                                data-value="Near Threatened"
                                                className={cx(
                                                    levelOfDanger.trim() === "Near Threatened" ? "level-danger" : ""
                                                )}
                                                onClick={(e) => {
                                                    setDangerLevel(e.currentTarget.getAttribute("data-value"));
                                                    console.log(e.currentTarget.getAttribute("data-value"));
                                                }}
                                            >
                                                NT
                                            </li>
                                            <li
                                                data-value="Least Concern"
                                                className={cx(
                                                    levelOfDanger.trim() === "Least Concern" ? "level-danger" : ""
                                                )}
                                                onClick={(e) => {
                                                    setDangerLevel(e.currentTarget.getAttribute("data-value"));
                                                    console.log(e.currentTarget.getAttribute("data-value"));
                                                }}
                                            >
                                                LC
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={cx("items")}>
                                    <label>Số lương còn lại:</label>
                                    <input
                                        className={cx("name", "remain-amount")}
                                        onChange={(e) => setRemainingAmount(e.target.value)}
                                        value={remainingAmount}
                                    />
                                </div>
                                <div className={cx("add-space")}>
                                    <p>Mô tả</p>
                                </div>
                                <div className={cx("items")}>
                                    <label>Diện mạo:</label>
                                    <textarea
                                        className={cx("content")}
                                        value={appearance}
                                        onChange={(e) => setAppearance(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={cx("items")}>
                                    <label>Thói quen và Lối sống:</label>
                                    <textarea
                                        className={cx("habits")}
                                        value={habits}
                                        onChange={(e) => setHabits(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={cx("add-space")}>
                                    <p>Phân bố</p>
                                </div>
                                <div className={cx("items")}>
                                    <label>Các môi trường sống WWF:</label>
                                    <textarea
                                        className={cx("content")}
                                        value={wwfBiomes}
                                        onChange={(e) => setWwfBiomes(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={cx("items")}>
                                    <label>Châu lục:</label>
                                    <textarea
                                        className={cx("continents")}
                                        value={continents}
                                        onChange={(e) => setContinents(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={cx("items")}>
                                    <label>Quốc gia:</label>
                                    <textarea
                                        className={cx("location")}
                                        value={countries}
                                        onChange={(e) => setCountries(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={cx("add-space")}>
                                    <p>Tình trạng</p>
                                </div>
                                <div className={cx("items")}>
                                    <textarea
                                        className={cx("more")}
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={status}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={cx("right-body")}>
                            <div className={cx("search")}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                                <input
                                    className={cx("name-animal")}
                                    placeholder="Tên động vật"
                                    onChange={(e) => {
                                        setFindAnimalInput(e.target.value);
                                    }}
                                />
                                <button className={cx("btn_find")} onClick={handleFindAnimal}>
                                    Go
                                </button>
                            </div>
                            <div className={cx("animal-list")}>
                                {animal.map((item, index) => {
                                    return (
                                        <AnimalLabel
                                            animal={item}
                                            key={index}
                                            iDDetail={item.iDDetail}
                                            handleOnClick={getDetailAnimal}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Admin;
