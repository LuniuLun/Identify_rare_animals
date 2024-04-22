import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Profile() {
    const [user, setUser] = useState({
        avatarUser: "/img/no-user-img.jpg",
        userName: "Chưa cập nhật",
        userEmail: "Chưa cập nhật email",
        displayName: "Chưa cập nhật tên người dùng",
        bioUser: "",
    });
    const [avaUser, setAvaUser] = useState("");
    const [fileAvaUser, setFileAvaUser] = useState("");

    const idUser = sessionStorage.getItem("userID");
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/users/" + idUser)
            .then((res) => {
                setUser(res.data.data);
            })
            .catch(() => {});
    }, [idUser]);

    const uploadFile = async (file) => {
        // Tạo một đối tượng FormData
        let formData = new FormData();
        formData.append("file", file);

        // Gửi yêu cầu POST với FormData
        return axios
            .post("http://127.0.0.1:8080/api/images/upload", formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    if (res.data !== null) {
                        return res.data;
                    } else {
                        console.log("Response data is null");
                        return null;
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                return null;
            });
    };

    const saveSettings = async () => {
        let tempUser;
        if (fileAvaUser !== "") {
            const urlImage = await uploadFile(fileAvaUser);
            console.log(urlImage);
            tempUser = { ...user, avatarUser: urlImage };
        }
        console.log(tempUser);
        axios
            .put("http://localhost:8080/api/v1/users/" + idUser, tempUser, idUser)
            .then((res) => {
                // Update successful, reload the page to reflect changes
                console.log(res.data.data);
                setUser(res.data.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error updating user information:", error);
            });
    };
    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const handleButtonClick = () => {
        document.getElementById("fileInput").click();
    };
    const handleFileChange = async (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileUrl = URL.createObjectURL(file);
            setAvaUser(fileUrl);
            setFileAvaUser(file);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("navigation")}>
                <div className={cx("title")}>Cài đặt</div>
                <div className={cx("list-options")}>
                    <span className={cx("option", "active")}>Hồ sơ</span>
                    <span className={cx("option")}>Tài khoản</span>
                    <span className={cx("option")}>Thông báo</span>
                    <span className={cx("option")}>Nội dung & Hiển thị</span>
                    <span className={cx("option")}>Ứng dụng</span>
                </div>
            </div>
            <div className={cx("content")}>
                <div className={cx("left-items")}>
                    <p>Hồ sơ</p>
                    <div className={cx("item")}>
                        <label>Ảnh đại diện</label>
                        <div className={cx("wrapper-ava")}>
                            <img
                                src={
                                    avaUser !== ""
                                        ? avaUser
                                        : user.avatarUser !== ""
                                        ? user.avatarUser
                                        : "/img/no-user-img.jpg"
                                }
                                alt=""
                                className={cx("ava-user")}
                            />
                            <div className={cx("change-avatar")}>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <button className={cx("more-image")} onClick={handleButtonClick}>
                                    <p>THAY ĐỔI</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <label>Tên đăng nhập</label>
                        <div className={cx("discription")}>
                            Đây là tên đăng nhập mà bạn sẽ sử dụng để đăng nhập, và người dùng khác có thể sử dụng để
                            xác định bạn trên iNaturalist
                        </div>
                        <input type="text" value={user.userName} readOnly />
                    </div>
                    <div className={cx("item")}>
                        <label>Email</label>
                        <div className={cx("discription")}>
                            Email của bạn không được chia sẻ với người dùng khác trên iNaturalist
                        </div>
                        <input type="email" value={user.userEmail} readOnly />
                    </div>
                    {/* <div className={('item')}>
                <label>Đổi mật khẩu</label>
                <div className={cx("discription")}>Your email is not shared with other users on iNaturalist</div>
                <input value="nguyenducvan260903@gmail.com"/>
            </div> */}
                </div>
                <div className={cx("right-item")}>
                    <div className={cx("item")}>
                        <label>Tên hiển thị</label>
                        <div className={cx("discription")}>
                            Đây là tên sẽ được hiển thị trên hồ sơ của bạn cũng như để quyền sở hữu bản quyền
                        </div>
                        <input
                            type="text"
                            value={user.displayName}
                            onChange={(e) => handleInputChange("displayName", e.target.value)}
                        />
                    </div>
                    <div className={cx("item")}>
                        <label>Thông tin</label>
                        <div className={cx("discription")}>
                            Hãy chia sẻ thông tin về bản thân với người dùng khác trên iNaturalist!
                        </div>
                        <textarea
                            value={user.bioUser}
                            onChange={(e) => handleInputChange("bioUser", e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <button className={cx("btn_saveSetting")} onClick={saveSettings}>
                    LƯU CÀI ĐẶT
                </button>
            </div>
        </div>
    );
}

export default Profile;
