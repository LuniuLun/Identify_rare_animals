import React from "react";
import classNames from "classnames/bind";
import styles from "./loading.module.scss";
const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx("wrapper")}>
            <img src="/loading_animal.svg" alt="Loading Animal" className={cx("loading_image")} />
        </div>
    );
}

export default Loading;
