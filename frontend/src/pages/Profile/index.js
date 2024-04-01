import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import UploadFileComponent from "../../components/FileUpload";
const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("navigation")}>
                <div className={cx("title")}>Settings</div>
                <div className={cx("list-options")}>
                    <span className={cx("option", "active")}>Profile</span>
                    <span className={cx("option")}>Account</span>
                    <span className={cx("option")}>Notifications</span>
                    <span className={cx("option")}>Content & Display</span>
                    <span className={cx("option")}>Application</span>
                </div>
            </div>
            <div className={cx("content")}>
                <div className={cx("left-items")}>
                    <p>Profile</p>
                    <div className={cx("item")}>
                        <label>Profile Picture</label>
                        <div className={cx("wrapper-ava")}>
                            <img src="/img/no-user-img.jpg" alt="" className={cx("ava-user")} />
                            <UploadFileComponent />
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <label>Username</label>
                        <div className={cx("discription")}>
                            This is the username you will use to log in, and other users can use to identify you on
                            iNaturalist
                        </div>
                        <input value="" />
                    </div>
                    <div className={cx("item")}>
                        <label>Email</label>
                        <div className={cx("discription")}>
                            Your email is not shared with other users on iNaturalist
                        </div>
                        <input value="nguyenducvan260903@gmail.com" />
                    </div>
                    {/* <div className={('item')}>
                        <label>Change password</label>
                        <div className={cx("discription")}>Your email is not shared with other users on iNaturalist</div>
                        <input value="nguyenducvan260903@gmail.com"/>
                    </div> */}
                </div>
                <div className={cx("right-item")}>
                    <div className={cx("item")}>
                        <label>Display Name</label>
                        <div className={cx("discription")}>
                            This is the name that will be displayed on your profile as well as for copyright attribution
                        </div>
                        <input value="Đức Vấn" />
                    </div>
                    <div className={cx("item")}>
                        <label>Bio</label>
                        <div className={cx("discription")}>Tell other users on iNaturalist about yourself!</div>
                        <textarea></textarea>
                    </div>
                </div>
                <button className={cx("btn_saveSetting")}>SAVE SETTING</button>
            </div>
        </div>
    );
}

export default Profile;
