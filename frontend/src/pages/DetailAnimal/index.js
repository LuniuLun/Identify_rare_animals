import classNames from "classnames/bind";
import styles from "./DetailAnimal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBinoculars } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function DetailAnimal() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>Pavo cristatus</div>
            <div className={cx("top-items")}>
                <img className={cx("image-animal")} alt="" src="/img/con_cong.jpg" />
                <div className={cx("bio")}>
                    <div className={cx("user")}>
                        <img src="/img/no-user-img.jpg" alt="" className={cx("ava-user")} />
                        <div>
                            <p className={cx("username")}>ariellopezpics</p>
                            <p className={cx("quantity-observation")}>
                                <FontAwesomeIcon icon={faBinoculars} className={cx("scope-icon")} />
                                3.191 observations
                            </p>
                        </div>
                    </div>
                    <div className={cx("location")}>
                        <div className={cx("time-observation")}>
                            <label>Observed:</label>
                            <input value={"Thg 02 26, 2024 · 06:56 IST"} />
                        </div>
                        <div className={cx("time-submit")}>
                            <label>Submitted:</label>
                            <input value={"Thg 03 6, 2024 · 10:04 +07:00"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("title")}>Detail</div>
            <div className={cx("buttom-items")}>
                <div className={cx("information")}>
                    <span>Description </span>
                    <div className={cx("detail-information")}>
                        <label>Appearance: </label>
                        <input
                            className={cx("apearance")}
                            value="The sexes of Green peafowl are quite similar in appearance, especially in the wild. Both males and females have long upper-tail coverts (which cover the tail itself, underneath). In the male, this extends up to 2 m (6.6 ft) and is decorated with eyespots; in the female, the coverts are green and much shorter, just covering the tail...."
                        />
                    </div>
                    <div className={cx("detail-information")}>
                        <label>Habits and Lifestyle: </label>
                        <input
                            className={cx("habits")}
                            value="Green peafowl are forest birds that usually spend time on or near the ground in tall grasses and sedges. At night family units roost in trees at a height of 10-15 m (33-49 ft)...."
                        />
                    </div>
                </div>
                <div className={cx("information")}>
                    <span>Distribution </span>
                    <div className={cx("detail-information")}>
                        <label>Continents: </label>
                        <input className={cx("continents")} value="ASIA" />
                    </div>
                    <div className={cx("detail-information")}>
                        <label>Coutries: </label>
                        <input
                            className={cx("coutries")}
                            value="Cambodia, China, Indonesia, Laos, Myanmar, Thailand, Viet Nam"
                        />
                    </div>
                    <div className={cx("detail-information")}>
                        <label>WWF Biomes: </label>
                        <input
                            className={cx("wwf-biomes")}
                            value="Tropical dry forest, Tropical moist forests, Tropical savanna"
                        />
                    </div>
                </div>
                <div className={cx("wrapper-two-infomation")}>
                    <div className={cx("information")}>
                        <span>Status </span>
                        <div className={cx("detail-information")}>
                            <input
                                className={cx("Status")}
                                value="Due to hunting; especially poaching, and a reduction in extent and quality of habitat, the green peafowl is evaluated as endangered on the IUCN Red List of Threatened Species. It is listed on Appendix II of CITES. The world population has declined rapidly and the species no longer occurs in many areas of its past distribution. The last strongholds for the species are in protected areas such as Huai Kha Khaeng Wildlife Sanctuary in Thailand, Cat Tien National Park in Vietnam and Baluran National Park, Ujung Kulon National Park in Java, Indonesia. The population in the wild was estimated to be about 5,000 to 10,000 individuals around 1995.[3] In Cambodia, Keo Seima Wildlife Sanctuary was shown to hold a significant and increasing population of around 745 individuals in 2020."
                            />
                        </div>
                    </div>
                    <div className={cx("information")}>
                        <span>Conservation status </span>
                        <div className={cx("detail-information")}>
                            <ul className={cx("list-label")}>
                                <li>Extinct</li>
                                <li>Threatened</li>
                                <li>Least Concern</li>
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
                            <input value={"123123"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailAnimal;
