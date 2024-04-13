import classNames from "classnames/bind";
import styles from "./AnimalCard.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles);

function AnimalCard({ animalPost }) {
    const [tempTime, setTempTime] = useState(animalPost.date);
    const [avaUser, setAvaUser] = useState("");
    useEffect(() => {
        let temp = animalPost.date;
        temp = String(temp).split("T", String(temp).length);
        setTempTime(temp[0]);
        axios
            .get("http://localhost:8080/api/v1/users/" + animalPost.iDUser)
            .then((res) => {
                if (res.data !== null) {
                    setAvaUser(res.data.data.avatarUser);
                }
            })
            .catch((err) => console.error(err));
    }, [animalPost.date, animalPost.iDUser]);
    return (
        <Link to={"/detailAnimal/" + animalPost.iDUserAnimal} className={cx("card")}>
            <img className={cx("img-animal")} src={animalPost.animal.animalAva} alt="" />
            <span className={cx("name-animal")}>{animalPost.animal.animalName}</span>
            <span className={cx("scientific-name")}>{animalPost.animal.animalScientificName}</span>
            <span className={cx("time-upload")}>{tempTime}</span>
            <img src={avaUser !== "" ? avaUser : "/img/no-user-img.jpg"} alt="" className={cx("img-user")} />
        </Link>
    );
}

export default AnimalCard;
