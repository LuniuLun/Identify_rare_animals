import classNames from "classnames/bind";
import styles from "./YourObservation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import AnimalCard from "../../components/AnimalCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);

function YourObservation() {
    const [animalPost, setAnimalPost] = useState([]);
    const [users, setUsers] = useState([]);
    const [animals, setAnimals] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/users/animal/" + id)
            .then((res) => {
                if (res.data !== null) {
                    setAnimalPost(res.data);
                }
            })
            .catch((err) => console.error(err));
            axios
            .get("http://localhost:8080/api/v1/animals")
            .then((res) => {
                if (res.data !== null) {
                    setAnimals(res.data);
                }
            })
            .catch((err) => console.error(err));
        axios
            .get("http://localhost:8080/api/v1/users")
            .then((res) => {
                if (res.data !== null) {
                    setUsers(res.data);
                }
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("search")}>
                <span>Observations</span>
                <div className={cx("right-items")}>
                    <div className={cx("wrapper-find-animal")}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                        <input className={cx("name-animal")} placeholder="Animal" />
                    </div>
                    <button className={cx("btn_find")}>Go</button>
                </div>
            </div>
            <div className={cx("statistic")}>
                <span className={cx("title")}>The World</span>
                <div className={cx("parameter")}>
                    <button className={cx("nav", "active")}>
                        <span className={cx("number")}>{animalPost.length}</span>
                        <div className={cx("description")}>
                            <span>OBSERVATIONS</span>
                            <FontAwesomeIcon icon={faCircleRight} className={cx("arrow-right-icon")} />
                        </div>
                    </button>
                    <button className={cx("nav")}>
                        <span className={cx("number")}>{animals.length}</span>
                        <div className={cx("description")}>
                            <span>SPECIES</span>
                            <FontAwesomeIcon icon={faCircleRight} className={cx("arrow-right-icon")} />
                        </div>
                    </button>
                    {/* <button className={cx("nav")}>
                        <span className={cx("number")}>347.101</span>
                        <div className={cx("description")}>
                            <span>IDENTIFIERS </span>
                            <FontAwesomeIcon icon={faCircleRight} className={cx("arrow-right-icon")} />
                        </div>
                    </button> */}
                    <button className={cx("nav")}>
                        <span className={cx("number")}>{users.length - 1}</span>
                        <div className={cx("description")}>
                            <span>OBSERVERS</span>{" "}
                            <FontAwesomeIcon icon={faCircleRight} className={cx("arrow-right-icon")} />
                        </div>
                    </button>
                </div>
            </div>
            <div className={cx("content")}>
                {[...animalPost].reverse().map((item, index) => {
                    return <AnimalCard key={index} animalPost={item} />;
                })}
            </div>
        </div>
    );
}

export default YourObservation;
