import classNames from "classnames/bind";
import styles from "./YourObservation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import AnimalCard from "../../components/AnimalCard";
const cx = classNames.bind(styles);

function YourObservation() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("search")}>
                <span>Observations</span>
                <div className={cx("right-items")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                    <input className={cx("species")} placeholder="Species" />
                    <input className={cx("name-animal")} placeholder="Animal" />
                    <button className={cx("btn_find")}>Go</button>
                </div>
            </div>
            <div className={cx("statistic")}>
                <span className={cx("title")}>The World</span>
                <div className={cx("parameter")}>
                    <button className={cx("nav", "active")}>
                        <span className={cx("number")}>173.426.821</span>
                        <div className={cx("description")}>
                            <span>OBSERVATIONS</span>
                            <FontAwesomeIcon icon={faCircleRight} className={cx("arrow-right-icon")} />
                        </div>
                    </button>
                    <button className={cx("nav")}>
                        <span className={cx("number")}>464.157</span>
                        <div className={cx("description")}>
                            <span>SPECIES</span>
                            <FontAwesomeIcon icon={faCircleRight} className={cx("arrow-right-icon")} />
                        </div>
                    </button>
                    <button className={cx("nav")}>
                        <span className={cx("number")}>347.101</span>
                        <div className={cx("description")}>
                            <span>IDENTIFIERS </span>
                            <FontAwesomeIcon icon={faCircleRight} className={cx("arrow-right-icon")} />
                        </div>
                    </button>
                    <button className={cx("nav")}>
                        <span className={cx("number")}>2.958.760</span>
                        <div className={cx("description")}>
                            <span>OBSERVERS</span>{" "}
                            <FontAwesomeIcon icon={faCircleRight} className={cx("arrow-right-icon")} />
                        </div>
                    </button>
                </div>
            </div>
            <div className={cx("content")}>
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                    return <AnimalCard key={index}/>;
                })}
            </div>
        </div>
    );
}

export default YourObservation;
