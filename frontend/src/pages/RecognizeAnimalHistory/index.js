import classNames from "classnames/bind";
import styles from "./RecognizeAnimalHistory.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    faCalendarDays,
    faLocationDot,
    faXmark,
    faObjectGroup,
    faMagnifyingGlassLocation,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const cx = classNames.bind(styles);

function RecognizeAnimalHistory() {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("head")}>
                <span>Observation History</span>
                <div className={cx("right-items")}>
                    <div className={cx("wrapper-find-animal")}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                        <input className={cx("name-animal")} placeholder="Animal" />
                    </div>
                    <button className={cx("btn_find")}>Go</button>
                </div>
            </div>
            <div className={cx("statistic")}></div>
            <div className={cx("body")}>
                <div className={cx("wrapper-detail-animal")}>
                    <button className={cx("form-detail")}>
                        <div className={cx("wrapper-image")}>
                            <div className={cx("slide-images")}>
                                <img className={cx("animal-image")} src="/img/con_rua.png"/>
                            </div>
                        </div>
                        <div>
                            <div className={cx("information")}>
                                <span className={cx("species-name")}><b>CÚ LỢN RỪNG PHƯƠNG ĐÔNG</b></span>
                            </div>
                            <div className={cx("information")}>
                                <span className={cx("species-name")}>Phodilus badius</span>
                            </div>
                            <div className={cx("information")}>
                                <span className={cx("date")}>4-25-2023</span>
                            </div>
                            <div className={cx("information")}>                        
                                <span className={cx("location")}>Asia</span>
                            </div>
                            <div className={cx("information")}>                        
                                <button className={cx("delete_but")}>Delete</button>
                            </div>
                        </div>
                    </button>

                    <button className={cx("form-detail")}>
                        <div className={cx("wrapper-image")}>
                            <div className={cx("slide-images")}>
                                <img className={cx("animal-image")} src="/img/con_cong.jpg"/>
                            </div>
                        </div>
                        <div>
                            <div className={cx("information")}>
                                <span className={cx("species-name")}><b>CÚ LỢN RỪNG PHƯƠNG ĐÔNG</b></span>
                            </div>
                            <div className={cx("information")}>
                                <span className={cx("species-name")}>Phodilus badius</span>
                            </div>
                            <div className={cx("information")}>
                                <span className={cx("date")}>4-25-2023</span>
                            </div>
                            <div className={cx("information")}>                        
                                <span className={cx("location")}>Asia</span>
                            </div>
                            <div className={cx("information")}>                        
                                <button className={cx("delete_but")}>Delete</button>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div> 
    );
}

export default RecognizeAnimalHistory;