const getYT = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (Object.prototype.hasOwnProperty.call(window, 'YT')) {
      // @ts-ignore
      return resolve(window.YT);
    }

    const youtubeScript = document.querySelector('script#youtube-api');

    if (youtubeScript === null) {
      const script = document.createElement('script');

      script.setAttribute('src', 'https://www.youtube.com/iframe_api');
      script.setAttribute('id', 'youtube-api');

      script.onload = () => {
        // @ts-ignore
        resolve(window.YT);
      };

      script.onerror = reject;

      document.head.appendChild(script);
    }
  });
};

export default getYT;
