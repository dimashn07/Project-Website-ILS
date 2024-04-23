import React, { useEffect } from 'react';

const FacebookWidget = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load Facebook SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=410292058289832&autoLogAppEvents=1`;
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }, []);

  return (
    <div className="fb-page" data-href="https://www.facebook.com/cnn" data-tabs="timeline" data-width="340" data-height="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
      <blockquote cite="https://www.facebook.com/yourpage" className="fb-xfbml-parse-ignore">
        <a href="https://www.facebook.com/yourpage">Your Page Name</a>
      </blockquote>
    </div>
  );
};

export default FacebookWidget;
