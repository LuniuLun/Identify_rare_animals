import classNames from "classnames/bind";
import styles from "./AnimalLabel.module.scss";
const cx = classNames.bind(styles);

function AnimalLabel({ animal, iDDetail, handleOnClick }) {
    return (
        <div className={cx("animal")} onClick={() => {handleOnClick(iDDetail)}}>
            <img src={animal.animalAva} alt="" className={cx("img-animal")} />
            <div className={cx("show-name")}>
                <p>{animal.animalName}</p>
                <p>{animal.animalScientificName}</p>
            </div>
        </div>
    );
}

export default AnimalLabel;
