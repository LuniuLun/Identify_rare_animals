// import { useState } from 'react';

// const useWebView = () => {
//   const [url, setUrl] = useState('');

//   const openWebView = (webUrl) => {
//     setUrl(webUrl);
//   };

//   const closeWebView = () => {
//     setUrl('');
//   };

//   return { url, openWebView, closeWebView };
// };

// export default useWebView;
import { useState, useRef } from "react";
import axios from "axios";

const useWebView = () => {
    const [url, setUrl] = useState("");
    const webcamRef = useRef(null);

    const openWebView = (webUrl) => {
        setUrl(webUrl);
    };

    const closeWebView = () => {
        setUrl("");
    };

    const captureAndSendImage = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            const imageData = imageSrc.split(",")[1]; // Lấy dữ liệu Base64 từ chuỗi imageSrc

            if (imageData.length > 0) {
                // Chuyển đổi dữ liệu base64 thành ArrayBuffer
                const byteCharacters = atob(imageData);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "image/jpeg" });

                // Tạo URL từ Blob
                const imageUrl = URL.createObjectURL(blob);

                console.log(imageUrl); // URL hình ảnh
            } else {
                console.log("Chụp ảnh thất bại");
            } 

            // try {
            //     const response = await axios.post("YOUR_BACKEND_ENDPOINT", { imageData });
            //     console.log("Image uploaded successfully:", response.data.imageUrl);
            // } catch (error) {
            //     console.error("Error uploading image:", error);
            // }
        }
    };

    return { url, openWebView, closeWebView, captureAndSendImage, webcamRef };
};

export default useWebView;
