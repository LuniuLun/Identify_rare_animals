import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [showListOptionsUser, setShowListOptionsUser] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [speciesName, setSpeciesName] = useState("");
    const [accurary, setAccurary] = useState("");
    const [completedRecognization, setCompletedRecognization] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem("userID") !== null) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    const openModal = () => {
        setShowModal(true);
        const requestData = {
            recognize: "true",
        };
        axios
            .post("http://127.0.0.1:5000/recognize_animal", requestData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setCompletedRecognization(true);
                    setSpeciesName(res.data.predicted_label.predicted_label);
                    setAccurary(res.data.predicted_label.confidence);
                } else {
                    throw new Error("Failed to recognization animal.");
                }
            })
            .catch((error) => {
                console.error("Error recognizing animal:", error);
                // Handle the error here, you can set an error message state
            });
    };

    const closeModal = () => {
        setShowModal(false);
        setCompletedRecognization(false);
    };

    const setOpenOptions = () => {
        setShowListOptionsUser((previous) => !previous);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("right-item")}>
                <Link to={"/"} className={cx("logo")}>
                    <p>R</p>aniland
                </Link>
                <button className={cx("wrapper-find-icon")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                </button>
                <div className={cx("list-options")}>
                    <Link className={cx("link")} to={"/"}>
                        <span>Explore</span>
                    </Link>
                    {isLogin === true ? (
                        <Link className={cx("link")} to={"/your_observation"}>
                            <span>Your Observations</span>
                        </Link>
                    ) : (
                        <></>
                    )}
                    <Link className={cx("link")} to={"/"}>
                        <span>Community</span>
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} />
                    </Link>
                    <Link className={cx("link")} to={"/"}>
                        <span>More</span>
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} />
                    </Link>
                </div>
            </div>
            <div className={cx("left-item")}>
                {isLogin === true ? (
                    <Fragment>
                        <Link to={"#"} className={cx("btn_addAnimal")} onClick={openModal}>
                            Recognization
                        </Link>
                        <Link to={"/post_animal"} className={cx("btn_addAnimal")}>
                            Upload
                        </Link>
                        <img src="/img/no-user-img.jpg" alt="" className={cx("ava-user")} onClick={setOpenOptions} />
                        <FontAwesomeIcon className={cx("down-icon")} icon={faChevronDown} onClick={setOpenOptions} />
                        {showListOptionsUser === true ? (
                            <div className={cx("list-options-user")}>
                                <Link to={"/Profile"} className={cx("option-user")} onClick={setOpenOptions}>
                                    Profile
                                </Link>
                                <Link to={"/"} className={cx("option-user")} onClick={setOpenOptions}>
                                    Your Observations
                                </Link>
                                <Link to={"/post_animal"} className={cx("option-user")}>
                                    Uploads
                                </Link>
                                <Link
                                    to={"/login"}
                                    className={cx("option-user")}
                                    onClick={() => {
                                        sessionStorage.removeItem("userID");
                                        setIsLogin(false);
                                        setOpenOptions();
                                    }}
                                >
                                    Sign out
                                </Link>
                            </div>
                        ) : (
                            <></>
                        )}
                    </Fragment>
                ) : (
                    <Link className={cx("link")} to={"/login"}>
                        Log In
                    </Link>
                )}
            </div>

            {showModal === true ? (
                <div className={cx("modal")}>
                    <div className={cx("modal-content")}>
                        <FontAwesomeIcon icon={faXmark} className={cx("close-icon")} onClick={closeModal} />
                        {completedRecognization === true ? (
                            <>
                                <div className={cx("title")}>Identification Result</div>
                                <div className={cx("top-items")}>
                                    <div className={cx("wrapper-image-animal")}>
                                        <img className={cx("image-animal")} alt="" src="/img/con_cong.jpg" />
                                    </div>
                                    <div className={cx("detail-result")}>
                                        <div className={cx("accurary-result")}>
                                            <label>Accuray:</label>
                                            <input className={cx("accurary")} value={accurary} />
                                        </div>
                                        <div className={cx("list-names")}>
                                            <div className={cx("name")}>
                                                <label>Species Name: </label>
                                                <input className={cx("species-name")} value={speciesName} readOnly />
                                            </div>
                                            <div className={cx("name")}>
                                                <label>Scientific Name: </label>
                                                <input className={cx("scientific-name")} value={speciesName} readOnly />
                                            </div>
                                            <div className={cx("name")}>
                                                <label>Animal: </label>
                                                <input className={cx("animal")} value={speciesName} readOnly />
                                            </div>
                                        </div>
                                        <div className={cx("regular-images")}>
                                            <div className={cx("list-iamges")}>
                                                <img
                                                    className={cx("regular-image-animal")}
                                                    alt=""
                                                    src="/img/con_cong.jpg"
                                                />
                                                <img
                                                    className={cx("regular-image-animal")}
                                                    alt=""
                                                    src="/img/con_cong.jpg"
                                                />
                                                <img
                                                    className={cx("regular-image-animal")}
                                                    alt=""
                                                    src="/img/con_cong.jpg"
                                                />
                                                <img
                                                    className={cx("regular-image-animal")}
                                                    alt=""
                                                    src="/img/con_cong.jpg"
                                                />
                                            </div>
                                            <button className={cx("btn-more")}>MORE</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("title")}>Detail</div>
                                <div className={cx("buttom-items")}>
                                    <div className={cx("information")}>
                                        <span>Description </span>
                                        <div className={cx("detail-information")}>
                                            <label>Appearance: </label>
                                            <span className={cx("apearance")}>
                                                The sexes of Green peafowl are quite similar in appearance, especially
                                                in the wild. Both males and females have long upper-tail coverts (which
                                                cover the tail itself, underneath). In the male, this extends up to 2 m
                                                (6.6 ft) and is decorated with eyespots; in the female, the coverts are
                                                green and much shorter, just covering the tail....
                                            </span>
                                        </div>
                                        <div className={cx("detail-information")}>
                                            <label>Habits and Lifestyle: </label>
                                            <span className={cx("habits")}>
                                                Green peafowl are forest birds that usually spend time on or near the
                                                ground in tall grasses and sedges. At night family units roost in trees
                                                at a height of 10-15 m (33-49 ft)....
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx("information")}>
                                        <span>Distribution </span>
                                        <div className={cx("short-detail-information")}>
                                            <label>Continents: </label>
                                            <span className={cx("continents")}>ASIA</span>
                                        </div>
                                        <div className={cx("short-detail-information")}>
                                            <label>Coutries: </label>
                                            <span className={cx("coutries")}>
                                                Cambodia, China, Indonesia, Laos, Myanmar, Thailand, Viet Nam
                                            </span>
                                        </div>
                                        <div className={cx("short-detail-information")}>
                                            <label>WWF Biomes: </label>
                                            <span className={cx("wwf-biomes")}>
                                                Tropical dry forest, Tropical moist forests, Tropical savanna
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx("wrapper-two-infomation")}>
                                        <div className={cx("information", "information-status")}>
                                            <span>Status </span>
                                            <div className={cx("detail-information")}>
                                                <span className={cx("Status")}>
                                                    Due to hunting; especially poaching, and a reduction in extent and
                                                    quality of habitat, the green peafowl is evaluated as endangered on
                                                    the IUCN Red List of Threatened Species. It is listed on Appendix II
                                                    of CITES. The world population has declined rapidly and the species
                                                    no longer occurs in many areas of its past distribution. The last
                                                    strongholds for the species are in protected areas such as Huai Kha
                                                    Khaeng Wildlife Sanctuary in Thailand, Cat Tien National Park in
                                                    Vietnam and Baluran National Park, Ujung Kulon National Park in
                                                    Java, Indonesia. The population in the wild was estimated to be
                                                    about 5,000 to 10,000 individuals around 1995.[3] In Cambodia, Keo
                                                    Seima Wildlife Sanctuary was shown to hold a significant and
                                                    increasing population of around 745 individuals in 2020.
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx("conservation")}>
                                            <span>Conservation status </span>
                                            <div className={cx("detail-information")}>
                                                <ul className={cx("list-label")}>
                                                    <li>Extinct</li>
                                                    <p></p>
                                                    <li>Threatened</li>
                                                    <p></p>
                                                    <li>
                                                        <p>Least</p>
                                                        <p>Concern</p>
                                                    </li>
                                                </ul>
                                                <ul className={cx("list-status")}>
                                                    <li>EX</li>
                                                    <li>EW</li>
                                                    <li>CR</li>
                                                    <li>EN</li>
                                                    <li>VU</li>
                                                    <li>NT</li>
                                                    <li>LC</li>
                                                </ul>
                                            </div>
                                            <div className={cx("left-quantity")}>
                                                <label>The remaining amount: </label>
                                                <input readOnly value={"123123"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>ĐANG CHỜ KẾT QUẢ NHẬN DẠNG</div>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Header;
