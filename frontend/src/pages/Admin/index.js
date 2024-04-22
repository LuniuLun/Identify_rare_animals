import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import AnimalCard from "../../components/AnimalCard";
import AnimalLabel from "../../components/AnimalLabel";
const cx = classNames.bind(styles);

function Admin() {
    return ( 
    <div className={cx("wrapper")}>
        <div className={cx("header")}>
            <div className={cx("right-item")}>
                <Link to={"/"} className={cx("logo")}>
                    <p>R</p>aniland
                </Link>
                <button className={cx("wrapper-find-icon")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                </button>
            </div>
            <div className={cx("left-item")}>
                <div className={cx("link")}>
                    <span>Admin</span>
                </div>
            </div>
        </div>
        <div className={cx("body")}>
            <div className={cx("left-body")} hidden>
                <div className={cx("edit-profile")}>
                    <div className={cx("items")}>
                        <h2>Edit Detail</h2>
                        <button className={cx("btn_save")}>Save</button>
                    </div>
                    <div className={cx("items")}>
                        <img src="/img/con_rua.png" alt="" className={cx("ava-animal")}></img>
                    </div>
                    <div className={cx("add-space")}></div>
                    <div className={cx("items")}>
                        <label>Species name:</label>
                        <input type="text" value="hehe" className={cx("name")} placeholder="Species name" ></input>
                    </div>
                    <div className={cx("items")}>
                        <label>Scientific name:</label>
                        <input className={cx("name")} placeholder="Scientific name"></input>
                    </div>
                    <div className={cx("items")}>
                        <label>Level of danger:</label>
                        <div className={cx("status")}>                            
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
                    </div>
                    <div className={cx("items")}>
                        <label>Remaining amount:</label>
                        <input value="" className={cx("name")} placeholder="E.g.: about 10000..."></input>
                    </div>
                    <div className={cx("add-space")}>
                        <p>Description</p>
                    </div>
                    <div className={cx("items")}>
                        <label>Appearance:</label>
                        <textarea className={cx("content")}></textarea>
                    </div>
                    <div className={cx("items")}>
                        <label>Habits and Lifestyle:</label>
                        <textarea className={cx("habits")}></textarea>
                    </div>
                    <div className={cx("add-space")}>
                        <p>Distribution</p>
                    </div>
                    <div className={cx("items")}>
                        <label>WWF biomes:</label>
                        <textarea className={cx("content")}></textarea>
                    </div>
                    <div className={cx("items")}>
                        <label>Continents:</label>
                        <textarea className={cx("location")}></textarea>
                    </div>
                    <div className={cx("items")}>
                        <label>Countries:</label>
                        <textarea className={cx("location")}></textarea>
                    </div>
                    <div className={cx("add-space")}>
                        <p>Status</p>
                    </div>
                    <div className={cx("items")}>
                        <textarea className={cx("more")}></textarea>
                    </div>
                </div>
            </div>
            <div className={cx("right-body")}>
                <div className={cx("search")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("find-icon")} />
                    <input className={cx("name-animal")} placeholder="Animal Name" />
                    <button className={cx("btn_find")}>Go</button>
                </div>
                <div className={cx("animal-list")}>
                    {[1, 2, 3, 4, 5, 6].map((item, index) => {
                        return <AnimalLabel key={index}/>;
                    })}
                </div>  
            </div>
        </div>
    </div>
       
    
    );
}

export default Admin;