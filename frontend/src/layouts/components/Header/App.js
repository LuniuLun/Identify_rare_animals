import React from 'react';
import useWebView from './useWebView';

function App() {
  const { url, openWebView, closeWebView } = useWebView();

  return (
    <div>
      <h2>ESP32 Cam</h2>
      <button onClick={() => openWebView('http://192.168.0.108:81/stream')}>Open Camera</button>
      <button onClick={closeWebView}>Close Camera</button>
      {url && <iframe src={url} title="Web View" width="100%" height="500" border="0"></iframe>}
    </div>
  );
}

export default App;