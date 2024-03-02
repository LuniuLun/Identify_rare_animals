import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleRight } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("search")}>
                <span>Observations</span>
                <div className={cx("right-items")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                    <input className={cx("species")} placeholder="Species" />
                    <input className={cx("name-animal")} placeholder="Animal" />
                    <buton className={cx("btn_find")}>Go</buton>
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
                <div className={cx("card")}>
                    <img className={cx("img-animal")} src="/img/con_cong.jpg" alt="" />
                    <span className={cx("name-animal")}>Pavo muticus imperator</span>
                    <span className={cx("time-upload")}>Mar 24</span>
                </div>
                <div className={cx("card")}>
                    <img className={cx("img-animal")} src="/img/con_cong.jpg" alt="" />
                    <span className={cx("name-animal")}>Pavo muticus imperator</span>
                    <span className={cx("time-upload")}>Mar 24</span>
                </div>
                <div className={cx("card")}>
                    <img className={cx("img-animal")} src="/img/con_cong.jpg" alt="" />
                    <span className={cx("name-animal")}>Pavo muticus imperator</span>
                    <span className={cx("time-upload")}>Mar 24</span>
                </div>
                <div className={cx("card")}>
                    <img className={cx("img-animal")} src="/img/con_cong.jpg" alt="" />
                    <span className={cx("name-animal")}>Pavo muticus imperator</span>
                    <span className={cx("time-upload")}>Mar 24</span>
                </div>
                <div className={cx("card")}>
                    <img className={cx("img-animal")} src="/img/con_cong.jpg" alt="" />
                    <span className={cx("name-animal")}>Pavo muticus imperator</span>
                    <span className={cx("time-upload")}>Mar 24</span>
                </div>
                <div className={cx("card")}>
                    <img className={cx("img-animal")} src="/img/con_cong.jpg" alt="" />
                    <span className={cx("name-animal")}>Pavo muticus imperator</span>
                    <span className={cx("time-upload")}>Mar 24</span>
                </div>
            </div>
        </div>
    );
}

export default Home;
