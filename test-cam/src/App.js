import { useRef } from "react";
import useWebView from "./useWebView";
import { useScreenshot } from "use-react-screenshot";

function App() {
    const { url, openWebView, closeWebView } = useWebView();
    const ref = useRef(null);
    const [image, takeScreenshot] = useScreenshot();

    const getImage = () => takeScreenshot(ref.current);

    return (
        <div>
            <h1>ESP32 Cam</h1>
            <button onClick={() => openWebView("http://192.168.0.107:81/stream")}>Open Web View</button>
            <button onClick={closeWebView}>Close Web View</button>
            {url && <iframe src={url} ref={ref} title="Web View" width="100%" height="500"></iframe>}

            <div>
                <button style={{ marginBottom: "10px" }} onClick={getImage}>
                    Take screenshot
                </button>
            </div>
            <img width={500} src={image} alt={"Screenshot"} />
        </div>
    );
}
export default App;


// import React, { useRef, useState } from "react";
// import html2canvas from "html2canvas";

// const App = () => {
//     const ToCaptureRef = useRef(null);
//     const [capturedImage, setCapturedImage] = useState(null);

//     const captureScreenshot = () => {
//         html2canvas(ToCaptureRef.current, {
//             useCORS: true,
//         }).then((canvas) => {
//             const dataURL = canvas.toDataURL("image/png");
//             setCapturedImage(dataURL);
//         });
//     };

//     return (
//         <>
//             <div>
//                 <h1>Hello hello</h1>
//                 <img
//                     ref={ToCaptureRef}
//                     alt="temp"
//                     style={{ width: "500px" }}
//                     src="https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//                 />
//                 <button onClick={captureScreenshot}>ScreenShot</button>
//             </div>
//             <img src={capturedImage} alt="Captured" />
//         </>
//     );
// };

// export default App;
