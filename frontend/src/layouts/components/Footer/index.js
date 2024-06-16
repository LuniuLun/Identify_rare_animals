import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("top-items")}>
                <div className={cx("right-items")}>
                    <div className={cx("left-link-lists")}>
                        <Link to={"/"} className={cx("link")}>
                            Introducion
                        </Link>
                        <Link to={"/"} className={cx("link")}>
                            Help
                        </Link>
                        <Link to={"/"} className={cx("link")}>
                            Forum
                        </Link>
                        <Link to={"/"} className={cx("link")}>
                            Press
                        </Link>
                        <Link to={"/"} className={cx("link")}>
                            Jobs
                        </Link>
                    </div>
                    <div className={cx("right-link-lists")}>
                        <Link to={"/"} className={cx("link")}>
                            Our Blog
                        </Link>
                        <Link to={"/"} className={cx("link")}>
                            Community Guidelines
                        </Link>
                        <Link to={"/"} className={cx("link")}>
                            Terms of Use
                        </Link>
                        <Link to={"/"} className={cx("link")}>
                            Privacy
                        </Link>
                    </div>
                </div>
                <div className={cx("middle-items")}>
                    <div className={cx("interaction")}>
                        <button className={cx("btn", "btn_donate")}>Donate</button>
                        <button className={cx("btn", "btn_store")}>Store</button>
                    </div>
                    <div className={cx("contact")}>
                        <Link className={cx("link")}>
                            <FontAwesomeIcon className={cx("icon", "facebook_icon")} icon={faFacebook} />
                        </Link>
                        <Link className={cx("link")}>
                            <FontAwesomeIcon className={cx("icon", "instagram_icon")} icon={faInstagram} />
                        </Link>
                        <Link className={cx("link")}>
                            <FontAwesomeIcon className={cx("icon", "twitter_icon")} icon={faTwitter} />
                        </Link>
                    </div>
                </div>
                <div className={cx("app-items")}>
                    <Link to={"/"}>
                        <img className={cx("google_play")} src="/img/Google_Play.png" alt="" />
                    </Link>
                    <Link to={"/"}>
                        <img className={cx("app_store")} src="/img/App_Store.png" alt="" />
                    </Link>
                </div>
            </div>
            <div className={cx("bottom-item")}>
                <span>
                    Member of the <Link className={cx("link")}>Raniland Network</Link> | Powered by{" "}
                    <Link className={cx("link")}>Raniland open source software</Link> | Documentation for{" "}
                    <Link className={cx("link")}>developers</Link>
                </span>
            </div>
        </div>
    );
}

export default Footer;
