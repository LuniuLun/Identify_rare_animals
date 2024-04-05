import classNames from "classnames/bind";
import styles from "./AnimalCard.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

function AnimalCard({animalPost}) {
    const [tempTime, setTempTime] = useState(animalPost.date);
    const [avaUser, setAvaUser] = useState("");
    useEffect(() => {
        let temp = animalPost.date;
        temp = String(temp).split("T", String(temp).length);
        console.log(temp);
        setTempTime(temp[0]);

        
    }, [])
    return (
        <Link to={"/detailAnimal/" + animalPost.iDUserAnimal} className={cx("card")}>
            <img className={cx("img-animal")} src={animalPost.animal.animalAva} alt="" />
            <span className={cx("name-animal")}>{animalPost.animal.animalName}</span>
            <span className={cx("scientific-name")}>{animalPost.animal.animalScientificName}</span>
            <span className={cx("time-upload")}>{tempTime}</span>
            <img src="/img/no-user-img.jpg" alt="" className={cx("img-user")} />
        </Link>
    );
}

export default AnimalCard;
