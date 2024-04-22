import classNames from "classnames/bind";
import styles from "./DetailAnimal.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

function DetailAnimal({ animalScientificName }) {
    const [appearance, setAppearance] = useState();
    const [habits, setHabits] = useState();
    const [continents, setContinents] = useState("");
    const [countries, setCountries] = useState("");
    const [wwfBiomes, setWWFBiomes] = useState();
    const [levelOfDanger, setLevelOfDanger] = useState("");
    const [theRemainAmount, setTheRemainAmount] = useState("");
    const [status, setStatus] = useState(null);

    const [listImage, setListImage] = useState([]);
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/animals/detailbyanimalscientificname/" + animalScientificName)
            .then((response) => {
                if (response.data !== null) {
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
                console.log("Error fetching animal data:", error);
            });
    }, [animalScientificName]);

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

    return (
        <div className={cx("wrapper")}>
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
                        <label>Countries: </label>
                        <span className={cx("Countries")}>{countries}</span>
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
                    </div>
                </div>
                <div className={cx("information")}>
                    <span>Distribution </span>
                    <div className={cx("left-quantity", "short-detail-information")}>
                        <label>The remaining amount: </label>
                        <span>{theRemainAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailAnimal;