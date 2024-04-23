import classNames from "classnames/bind";
import styles from "./RecognizeAnimalHistory.module.scss"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import DetailAnimal from "../../components/DetailAnimal";

const cx = classNames.bind(styles);

function RecognizeAnimalHistory() {
    const [animalScientificName, setAnimalScientificName] = useState("");
    const [showDetailAnimal, setShowDetailAnimal] = useState(false);

    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("head")}>
                <span>Lịch Sử Quan Sát</span>
                <div className={cx("right-items")}>
                    <div className={cx("wrapper-find-animal")}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                        <input className={cx("name-animal")} placeholder="Animal" />
                    </div>
                    <button className={cx("btn_find")}>Tìm</button>
                </div>
            </div>
            <div className={cx("statistic")}></div>
            <div className={cx("body")}>
                <div className={cx("wrapper-detail-animal")}>
                <button 
                        className={cx("form-detail")} 
                        onClick={() => {
                            setShowDetailAnimal(true);
                        }}
                    >
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
                                <span className={cx("location")}>Châu Á</span>
                            </div>
                            <div className={cx("information")}>                        
                                <button className={cx("delete_but")}>Xóa</button>
                            </div>
                        </div>
                    </button>
                {showDetailAnimal === true ? (
                    <div className={cx("show-detail-animal")}>
                        <div className={cx("detail-animal")}>
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                className={cx("close-icon")} 
                                onClick={() => {
                                    setShowDetailAnimal(false);
                                }}
                            />
                            <DetailAnimal animalScientificName={animalScientificName} />
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}

                    
                </div>
            </div>
        </div> 
    );
}

export default RecognizeAnimalHistory;