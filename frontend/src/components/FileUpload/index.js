import React, { useRef } from "react";
import style from "./FileUpload.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const inputUploadFileStyle = {
    display: "none",
};

const buttonUploadFileStyle = {
    margin: 8,
    cursor: "pointer", // Ensure the cursor changes to a pointer on hover
};

const UploadFileComponent = () => {
    const fileInputRef = useRef(null);

    const getFileFromInput = (file) => {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
        });
    };

    const manageUploadedFile = async (binary, file) => {
        console.log(`The file size is ${binary.length}`);
        console.log(`The file name is ${file.name}`);
        // try {
        //     const url = 'http://localhost:8080/api/v1/fileUpload';
    
        //     const formData = new FormData();
        //     formData.append('file', file);
    
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         body: formData
        //     });
    
        //     const data = await response.json();
        //     console.log('File uploaded successfully:', data);
        //     if(data.status === "ok") {
        //         window.location.href = "/profile";
        //     }
        // } catch (error) {
        //     console.error('Error uploading file:', error);
        // }
    };

    const handleFileChange = (event) => {
        event.persist();
    
        const files = event.target.files;
    
        if (files && fileInputRef.current) {
            Array.from(files).forEach((file) => {
                getFileFromInput(file)
                    .then( (binary) => {
                        manageUploadedFile(binary, file);
                    })
                    .catch(function (reason) {
                        console.log(`Error during upload ${reason}`);
                        fileInputRef.current.value = ""; // to allow upload of the same file if an error occurs
                    });
            });
        }
    };
    
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                accept="image/*"
                style={inputUploadFileStyle}
                id="file"
                multiple={true}
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="file">
                <button className={cx("btn_upload")} style={buttonUploadFileStyle} onClick={handleButtonClick}>
                    <span>Upload</span>
                </button>
            </label>
        </>
    );
};

export default UploadFileComponent;
