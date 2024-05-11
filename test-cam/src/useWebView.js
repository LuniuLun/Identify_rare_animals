import { useState } from 'react';

const useWebView = () => {
  const [url, setUrl] = useState('');

  const openWebView = (webUrl) => {
    setUrl(webUrl);
  };

  const closeWebView = () => {
    setUrl('');
  };

  return { url, openWebView, closeWebView };
};

export default useWebView;