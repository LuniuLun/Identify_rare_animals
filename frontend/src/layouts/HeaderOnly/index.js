import Header from "../components/Header";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {

    return (
            <div className={cx("wrapper")}>
                <Header />
                <div className={cx("content")}>
                    <div>{children}</div>
                </div>
            </div>
    );
}

export default HeaderOnly;
