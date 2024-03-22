import classNames from "classnames/bind";
import styles from "./PostAnimal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays, faLocationDot, faXmark, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const cx = classNames.bind(styles);

function PostAnimal() {
    const [isHavingImage, setIsHavingImage] = useState(false);
    const [animalObjects, setAnimalObjects] = useState([]);
    const [focusedIndexes, setFocusedIndexes] = useState([]);

    const handleButtonClick = () => {
        document.getElementById("fileInput").click();
    };
    const handleFileChange = async (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const newAnimalObject = {
                index: animalObjects.length,
                preview: URL.createObjectURL(file),
                focused: false,
                speciesName: "Predicting species name...",
                file: file,
            };
            setAnimalObjects((previous) => [newAnimalObject, ...previous]);
            setIsHavingImage(true);

            const speciesName = await recognize(file);
            newAnimalObject.speciesName = speciesName;
            setAnimalObjects((previous) => [newAnimalObject, ...previous.slice(0, -newAnimalObject.length)]);
        }
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        onDrop: async (acceptedFiles) => {
            const newAnimalObjects = [];
            for (const file of acceptedFiles) {
                const newAnimalObject = {
                    index: animalObjects.length + newAnimalObjects.length,
                    preview: URL.createObjectURL(file),
                    focused: false,
                    speciesName: "Predicting species name...",
                    file: file,
                };
                newAnimalObjects.push(newAnimalObject);
            }
            setAnimalObjects((previous) => [...newAnimalObjects, ...previous]);
            setIsHavingImage(true);

            // Xử lý nhận diện loài cho từng ảnh
            for (const item of newAnimalObjects) {
                try {
                    const speciesName = await recognize(item.file);
                    item.speciesName = speciesName;
                } catch (error) {
                    console.error("Error recognizing image:", error);
                }
            }

            // Cập nhật danh sách animalObjects sau khi nhận diện xong
            setAnimalObjects((previous) => [...newAnimalObjects, ...previous.slice(0, -newAnimalObjects.length)]);
        },
    });

    async function recognize(file) {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post("http://127.0.0.1:5000/predict_animal", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                return response.data.predicted_label.predicted_label;
            } else {
                throw new Error("Failed to recognize image");
            }
        } catch (error) {
            console.error("Error recognizing image:", error);
            return "Not recognized";
        }
    }

    const handleFormDetailClick = (index) => {
        if (focusedIndexes.includes(index)) {
            // Nếu index đã tồn tại trong mảng, loại bỏ nó
            setFocusedIndexes(focusedIndexes.filter((item) => item !== index));
        } else {
            // Nếu index chưa tồn tại trong mảng, thêm vào
            setFocusedIndexes([...focusedIndexes, index]);
        }
        console.log(focusedIndexes);
    };

    const removeImage = () => {
        focusedIndexes.forEach((focusedIndexes) => {
            setAnimalObjects((prevObject) => prevObject.filter((item, i) => i !== focusedIndexes));
        });
        setFocusedIndexes([]);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("navigation")}>
                <div>
                    <div>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
                        <button className={cx("more-image")} onClick={handleButtonClick}>
                            <FontAwesomeIcon icon={faPlus} className={cx("icon-nav")} />
                            <p>ADD</p>
                        </button>
                    </div>
                    <button className={cx("remove-image")} onClick={removeImage}>
                        <FontAwesomeIcon icon={faXmark} className={cx("icon-nav")} />
                        <p>Remove</p>
                    </button>
                    <button className={cx("combine-image")}>
                        <FontAwesomeIcon icon={faObjectGroup} className={cx("icon-combine")} />
                        <p>Combine</p>
                    </button>
                    <button className={cx("select-all")}>
                        <p>Select All</p>
                    </button>
                </div>
                <button className={cx("submit-post")}>
                    <p>Submit</p>
                </button>
            </div>
            <div className={cx("body")} {...getRootProps()} onClick={(e) => e.stopPropagation()}>
                {isHavingImage ? (
                    <div className={cx("wrapper-detail-animal")}>
                        {animalObjects.map((image, index) => {
                            return (
                                <button
                                    onClick={() => handleFormDetailClick(index)}
                                    index={index}
                                    className={cx("form-detail", focusedIndexes.includes(index) ? "focused" : "")}
                                >
                                    <div className={cx("wrapper-image")}>
                                        <img
                                            // src="/img/con_cong.jpg"
                                            src={image.preview}
                                            alt=""
                                            className={cx("animal-image")}
                                        />
                                    </div>
                                    <div>
                                        <div className={cx("information")}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("icon")} />
                                            <input
                                                value={image.speciesName}
                                                className={cx("species-name")}
                                                placeholder="Species name"
                                                readOnly
                                            />
                                        </div>
                                        <div className={cx("information")}>
                                            <FontAwesomeIcon icon={faCalendarDays} className={cx("icon")} />
                                            <input className={cx("date")} placeholder="Date" />
                                        </div>
                                        <div className={cx("information")}>
                                            <FontAwesomeIcon icon={faLocationDot} className={cx("icon")} />
                                            <input className={cx("location")} placeholder="Location" />
                                        </div>
                                        <div className={cx("information")}>
                                            <textarea className={cx("note")} placeholder="Note"></textarea>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className={cx("add-image")}>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
                        <div onClick={handleButtonClick}>
                            {isDragActive ? (
                                <p className={cx("introduction")}>Drop the image here...</p>
                            ) : (
                                <p className={cx("introduction")}>Drag & drop image here or click to select image</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostAnimal;
