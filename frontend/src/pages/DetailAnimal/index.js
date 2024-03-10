import classNames from "classnames/bind";
import styles from "./DetailAnimal.module.scss";

const cx = classNames.bind(styles);

function DetailAnimal() {
    return ( <div className={cx("wrapper")}>
        <div className={cx("left-items")}>
            <img className={cx("image-animal")} alt="" src="/img/con-cong.jpg"/>
        </div>
        <div className={cx("right-items")}>
            <div className={cx("detail-information")}>
                <div className={cx('information')}>
                    <label>Species Animal: </label>
                    <input className={cx("species-animal")}/>
                </div>
                <div className={cx('information')}>
                    <label>Location: </label>
                    <input className={cx("location")}/>
                </div>
                <div className={cx('information')}>
                    <label>Quantity: </label>
                    <input className={cx("quantity")}/>
                </div>
                <div className={cx('information')}>
                    <label>Note: </label>
                    <textarea className={cx("note")}></textarea>
                </div>
            </div>
        </div>
    </div> );
}

export default DetailAnimal;