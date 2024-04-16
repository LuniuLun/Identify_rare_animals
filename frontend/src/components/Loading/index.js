import classNames from "classnames/bind";
import styles from "./loading.module.scss";
const cx = classNames.bind(styles);

function Loading() {
    return ( <div className={cx("wrapper")}> loading</div> );
}

export default Loading;