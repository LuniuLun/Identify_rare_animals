import classNames from "classnames/bind";
import styles from "./AnimalCard.module.scss";
const cx = classNames.bind(styles);

function AnimalCard() {
    return (
        <div className={cx("card")}>
            <img className={cx("img-animal")} src="/img/con_cong.jpg" alt="" />
            <span className={cx("name-animal")}>Pavo muticus imperator</span>
            <span className={cx("time-upload")}>Mar 24</span>
            <img src="/img/no-user-img.jpg" alt="" className={cx("img-user")} />
        </div>
    );
}

export default AnimalCard;
