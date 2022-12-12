import React from "react";

const LiveScoreWidget = () => {
  return (
    <div>
      <iframe
        title="WC Live Results"
        src="https://www.scorebat.com/embed/livescore/?token=MjgwODNfMTY2NjIxMTEzMl85MWJjODhhOTFmM2ZhOWNjYWZkNzU2Y2JiYjMyZjBmODhmMWE4Yjcx"
        width="100%"
        height="1100px"
        frameborder="0"
        overflow="hidden"
      ></iframe>
    </div>
  );
};

export default LiveScoreWidget;


