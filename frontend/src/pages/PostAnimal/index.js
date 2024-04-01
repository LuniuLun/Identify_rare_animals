import classNames from "classnames/bind";
import styles from "./PostAnimal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    faCalendarDays,
    faLocationDot,
    faXmark,
    faObjectGroup,
    faMagnifyingGlassLocation,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import WarningBox from "../../components/WarningBox";

const cx = classNames.bind(styles);

function PostAnimal() {
    const [isHavingAnimalPost, setIsHavingAnimalPost] = useState(false);
    const [animalObjects, setAnimalObjects] = useState([]);
    const [focusedIndexes, setFocusedIndexes] = useState([]);
    const [showIcon, setShowIcon] = useState(false);
    // const [imageShowingRef, setImageShowingRef] = useRef();
    const [showWarning, setShowWarning] = useState(false);
    const [contentWarning, setContentWarning] = useState("");
    const [AnimalIndexesWithEmptyAttributes, setAnimalIndexesWithEmptyAttributes] = useState([]);
    const idUser = sessionStorage.getItem("userID");
    useEffect(() => {
        if (animalObjects.length === 0) setIsHavingAnimalPost(false);
    }, [animalObjects]);

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
                idUser: idUser,
                speciesName: "Predicting species name...",
                files: file,
                location: "",
                dateTime: "",
                note: "",
            };
            setAnimalObjects((previous) => [newAnimalObject, ...previous]);
            setIsHavingAnimalPost(true);

            const speciesName = await recognize(file);
            newAnimalObject.speciesName = speciesName;
            setAnimalObjects((previous) => [newAnimalObject, ...previous.slice(1, previous.length)]);
        }
    };

    const {
        getRootProps,
        // getInputProps,
        isDragActive,
    } = useDropzone({
        accept: "image/*",
        onDrop: async (acceptedFiles) => {
            const newAnimalObjects = [];
            for (const file of acceptedFiles) {
                const newAnimalObject = {
                    index: animalObjects.length + newAnimalObjects.length,
                    preview: URL.createObjectURL(file),
                    focused: false,
                    idUser: idUser,
                    speciesName: "Predicting species name...",
                    scientificName: "",
                    files: file,
                    location: "",
                    dateTime: "",
                    note: "",
                };
                newAnimalObjects.push(newAnimalObject);
            }
            setAnimalObjects((previous) => [...newAnimalObjects, ...previous]);
            setIsHavingAnimalPost(true);

            // Xử lý nhận diện loài cho từng ảnh
            for (const item of newAnimalObjects) {
                try {
                    const [speciesName, scientificName] = await recognize(item.files);
                    item.speciesName = speciesName;
                    item.scientificName = scientificName;
                } catch (error) {
                    console.error("Error recognizing image:", error);
                }
            }

            // Cập nhật danh sách animalObjects sau khi nhận diện xong
            setAnimalObjects((previous) => [
                ...newAnimalObjects,
                ...previous.slice(newAnimalObjects.length, previous.length),
            ]);
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
                try {
                    const res = await axios.get("http://localhost:8080/api/v1/animals/" + response.data.predicted_label.predicted_label);
                    return [res.data.data.animalName, response.data.predicted_label.predicted_label];
                } catch (error) {
                    console.error(error);
                    return ["Error fetching animal data", ""];
                }
            } else {
                throw new Error("Failed to recognize image");
            }
        } catch (error) {
            console.error("Error recognizing image:", error);
            return ["Not recognized", ""];
        }
    }

    const handleFormDetailClick = (index, e) => {
        if (AnimalIndexesWithEmptyAttributes.includes(index)) {
            setAnimalIndexesWithEmptyAttributes(AnimalIndexesWithEmptyAttributes.filter((item) => item !== index));
            return;
        }
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.classList.contains("icon")) {
            return; // Do nothing if the click is on an input, textarea, or icon
        }
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
        if (focusedIndexes.length === animalObjects.length) setAnimalObjects([]);
        else {
            focusedIndexes.forEach((focusedIndexes) => {
                setAnimalObjects((prevObject) => prevObject.filter((item, i) => i !== focusedIndexes));
            });
        }
        setFocusedIndexes([]);
    };

    const sellectAll = () => {
        const tempArray = [];
        animalObjects.forEach((item, index) => {
            tempArray.push(item.index);
        });
        setFocusedIndexes(tempArray);
    };

    const handleCombine = () => {
        let tempAnimal = [];
        let listSpeciesName = [];
        for (let i = 0; i < focusedIndexes.length; i++) {
            for (const animal of animalObjects) {
                if (focusedIndexes[i] === animal.index) {
                    tempAnimal = [...tempAnimal, animal];
                    listSpeciesName = [...listSpeciesName, animal.speciesName];
                }
            }
        }
        const allSame = listSpeciesName.every((val, i, arr) => val === arr[0]);

        if (allSame) {
            tempAnimal.forEach((animal) => {
                setAnimalObjects((previous) => previous.filter((item) => item.index !== animal.index));
            });
            // Tìm index bé nhất
            const minIndex = Math.min(...tempAnimal.map((item) => item.index));
            setFocusedIndexes(focusedIndexes.filter((item) => item === minIndex));
            // Lọc ra item có index bé nhất
            const minIndexItem = tempAnimal.find((item) => item.index === minIndex);

            // Tạo mảng các index đã lấy
            // const selectedIndexes = tempAnimal.map((animal) => animal.index);

            // Tạo mảng các file và preview tương ứng với các index đã lấy
            let selectedFiles = [];
            let selectedPreviews = [];

            tempAnimal.forEach((animal) => {
                selectedFiles = [...selectedFiles, ...(Array.isArray(animal.files) ? animal.files : [animal.files])];
                selectedPreviews = [
                    ...selectedPreviews,
                    ...(Array.isArray(animal.preview) ? animal.preview : [animal.preview]),
                ];
            });

            // Tạo đối tượng newAnimalBox
            const newAnimalBox = {
                index: minIndexItem.index, // Sử dụng index bé nhất
                preview: selectedPreviews, // Sử dụng mảng previews đã lấy
                focused: false, // Giữ nguyên giá trị focused
                idUser: minIndexItem.idUser,
                speciesName: minIndexItem.speciesName, // Sử dụng speciesName của item có index bé nhất
                files: selectedFiles, // Sử dụng mảng files đã lấy
                location: minIndexItem.location,
                dateTime: minIndexItem.dateTime,
                note: minIndexItem.note,
            };
            setAnimalObjects((prevObject) => [...prevObject, newAnimalBox]);
        } else {
            setShowWarning(true);
            setContentWarning("Different animals cannot be grouped together!");
        }
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Function to handle clicking the right arrow to show the next image
    const showNextImage = (image) => {
        setCurrentImageIndex((prevIndex) => {
            // If current index is at the end, loop back to the start
            if (prevIndex === image.preview.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
        console.log(currentImageIndex);
    };

    // Function to handle clicking the left arrow to show the previous image
    const showPreviousImage = (image) => {
        setCurrentImageIndex((prevIndex) => {
            // If current index is at the start, loop back to the end
            if (prevIndex === 0) {
                return image.preview.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
        console.log(currentImageIndex);
    };

    //change status box
    const changeStatusBox = () => {
        setShowWarning(false);
    };

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

    const handleSubmitPost = async () => {
        // Lọc ra các đối tượng có tất cả các thuộc tính rỗng trừ note
        const emptyAttributesObj = animalObjects.filter((animalObj) =>
            Object.entries(animalObj).some(([key, value]) => key !== "note" && value === "")
        );
        // Lấy ra mảng animalIndex của các đối tượng có thuộc tính rỗng
        const indexesEmptyAttributesObj = emptyAttributesObj.map((animalObj) => animalObj.index);

        if (indexesEmptyAttributesObj.length === 0) {
            console.log("All fields are not empty");
            const filteredAnimalObjects = animalObjects.map((animalObj) => {
                const { index, preview, focused, ...rest } = animalObj;
                return rest;
            });
            for (let item of filteredAnimalObjects) {
                if (Array.isArray(item.files)) {
                    for (let file of item.files) {
                        const response = await uploadFile(file);
                        if (response) {
                            item.files = response;
                            console.log(response);
                        }
                    }
                } else {
                    const response = await uploadFile(item.files);
                    if (response) {
                        item.files = [response];
                    }
                }
            }

            axios
                .post("http://127.0.0.1:8080/api/v1/users/postAnimal", [...filteredAnimalObjects], {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        window.location.href = "http://localhost:3000/your_observation";
                        if (res.data !== null) {
                            console.log(res.data);
                        } else {
                            console.log("Response data is null");
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

            console.log(filteredAnimalObjects);
        } else {
            setAnimalIndexesWithEmptyAttributes(indexesEmptyAttributesObj);
            setShowWarning(true);
            setContentWarning("Please fill in all information!");
            console.log(indexesEmptyAttributesObj);
        }
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
                    <button className={cx("combine-image")} onClick={handleCombine}>
                        <FontAwesomeIcon icon={faObjectGroup} className={cx("icon-combine")} />
                        <p>Combine</p>
                    </button>
                    <button className={cx("select-all")} onClick={sellectAll}>
                        <p>Select All</p>
                    </button>
                </div>
                <button className={cx("submit-post")} onClick={handleSubmitPost}>
                    <p>Submit</p>
                </button>
            </div>
            <div className={cx("body")} {...getRootProps()} onClick={(e) => e.stopPropagation()}>
                {isHavingAnimalPost ? (
                    <div className={cx("wrapper-detail-animal")}>
                        {animalObjects.map((image, index) => {
                            return (
                                <button
                                    onClick={(e) => handleFormDetailClick(image.index, e)}
                                    index={image.index}
                                    key={image.index}
                                    className={cx(
                                        "form-detail",
                                        focusedIndexes.includes(image.index) ? "focused" : "",
                                        AnimalIndexesWithEmptyAttributes.includes(image.index) ? "lackInfo" : ""
                                    )}
                                >
                                    <div
                                        index={image.index}
                                        className={cx("wrapper-image")}
                                        onMouseEnter={() => {
                                            setShowIcon(true);
                                            console.log(animalObjects);
                                        }}
                                        onMouseLeave={() => setShowIcon(false)}
                                    >
                                        <div className={cx("slide-images")}>
                                            {Array.isArray(image.preview) && image.preview.length > 1 && (
                                                <FontAwesomeIcon
                                                    icon={faAngleLeft}
                                                    className={cx("icon-left")}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent form detail click
                                                        showPreviousImage(image);
                                                    }}
                                                />
                                            )}

                                            <img
                                                src={
                                                    Array.isArray(image.preview)
                                                        ? image.preview[currentImageIndex]
                                                        : image.preview
                                                }
                                                alt=""
                                                className={cx("animal-image")}
                                            />

                                            {Array.isArray(image.preview) && image.preview.length > 1 && (
                                                <FontAwesomeIcon
                                                    icon={faAngleRight}
                                                    className={cx("icon-right")}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent form detail click
                                                        showNextImage(image);
                                                    }}
                                                />
                                            )}
                                        </div>
                                        {/* <div className={cx("icon-container")}>
                                            {showIcon && (
                                                <FontAwesomeIcon
                                                    icon={faMagnifyingGlass}
                                                    index={image.index}
                                                    className={cx("icon-show")}
                                                />
                                            )}
                                        </div> */}
                                        {Array.isArray(image.preview) ? (
                                            <span className={cx("current-image")}>
                                                {currentImageIndex + 1}/{image.preview.length}
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div>
                                        <div className={cx("information")}>
                                            <FontAwesomeIcon icon={faMagnifyingGlassLocation} className={cx("icon")} />
                                            <input
                                                value={image.speciesName}
                                                className={cx("species-name")}
                                                placeholder="Species name"
                                                readOnly
                                            />
                                        </div>
                                        <div className={cx("information")}>
                                            <FontAwesomeIcon icon={faCalendarDays} className={cx("icon")} />
                                            <input
                                                type="date"
                                                className={cx("date")}
                                                onChange={(e) => {
                                                    animalObjects.map((item) => {
                                                        return item.index === image.index ? (
                                                            (item.dateTime = e.target.value)
                                                        ) : (
                                                            <></>
                                                        );
                                                    });
                                                }}
                                                placeholder="Date"
                                            />
                                        </div>
                                        <div className={cx("information")}>
                                            <FontAwesomeIcon icon={faLocationDot} className={cx("icon")} />
                                            <input
                                                className={cx("location")}
                                                placeholder="Location"
                                                onChange={(e) => {
                                                    animalObjects.map((item) => {
                                                        return item.index === image.index ? (
                                                            (item.location = e.target.value)
                                                        ) : (
                                                            <></>
                                                        );
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className={cx("information")}>
                                            <textarea
                                                className={cx("note")}
                                                placeholder="Note"
                                                onChange={(e) => {
                                                    animalObjects.map((item) => {
                                                        return item.index === image.index ? (
                                                            (item.note = e.target.value)
                                                        ) : (
                                                            <></>
                                                        );
                                                    });
                                                }}
                                            ></textarea>
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
            {showWarning === true ? (
                <div className={cx("wrapper-warningBox")}>
                    <WarningBox
                        content={contentWarning}
                        handleSubmitButton={changeStatusBox}
                        handleCancelButton={changeStatusBox}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default PostAnimal;
