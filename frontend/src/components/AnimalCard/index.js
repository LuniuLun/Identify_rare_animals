import classNames from "classnames/bind";
import styles from "./AnimalCard.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const cx = classNames.bind(styles);

function AnimalCard({animalPost}) {
    useEffect(() => {

    }, [])
    return (
        <Link to={"/detailAnimal/" + animalPost.iDUserAnimal} className={cx("card")}>
            <img className={cx("img-animal")} src={animalPost.animal.animalAva} alt="" />
            <span className={cx("name-animal")}>{animalPost.animal.animalName}</span>
            <span className={cx("time-upload")}>{animalPost.date}</span>
            <img src="/img/no-user-img.jpg" alt="" className={cx("img-user")} />
        </Link>
    );
}

export default AnimalCard;
