import classNames from "classnames/bind";
import styles from "./WarningBox.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function WarningBox({content, handleSubmitButton, handleCancelButton}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-warning")}>
                <FontAwesomeIcon icon={faCircleExclamation} className={cx("warning-icon")}/>
                <span className={cx("content")}>{content}</span>
            </div>
            <div className={cx("list-btn")}>
                <button className={cx("accept-btn")} onClick={handleSubmitButton}>
                    OK
                </button>
                <button className={cx("close-btn")} onClick={handleCancelButton}>
                    CANCEL
                </button>
            </div>
        </div>
    );
}

export default WarningBox;
