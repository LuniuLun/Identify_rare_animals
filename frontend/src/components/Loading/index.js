import React from "react";
import classNames from "classnames/bind";
import styles from "./loading.module.scss";
const cx = classNames.bind(styles);

function Loading({messsage}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("loading_bar")}>
                <img src="/loading_animal.svg" alt="Loading Animal" className={cx("loading_image")} />
                <div className={cx("loading_progress")} />
            </div>
            <span className={cx("message")}>{messsage}</span>
        </div>
    );
}

export default Loading;
