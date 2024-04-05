import classNames from "classnames/bind";
import styles from "./AnimalLabel.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function AnimalLabel() {
    return (
        <div className={cx("animal")}>
            <image src="../img/con_rua.png" alt="" className={cx("img-animal")}></image>
            <div className={cx("show-name")}>
                <p>Hawksbill sea turtle</p>
                <p>Eretmochelys imbricata</p>
            </div>                        
        </div>
    );
}

export default AnimalLabel;
