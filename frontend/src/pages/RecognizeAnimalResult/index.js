import classNames from "classnames/bind";
import styles from "./RecognizeAnimalResult.mudule.scss"

const cx = classNames.bind(styles);

function RecognizeAnimalResult() {
    return ( <div className={cx("wrapper")}>
        recognize_animal_result
    </div> );
}

export default RecognizeAnimalResult;