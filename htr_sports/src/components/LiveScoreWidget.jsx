import React from "react";

const LiveScoreWidget = () => {
  return (
    <div>
      <iframe
        title="Widget"
        src="https://www.scorebat.com/embed/livescore/?token=MjgwODNfMTY2NjIxMTEzMl85MWJjODhhOTFmM2ZhOWNjYWZkNzU2Y2JiYjMyZjBmODhmMWE4Yjcx"
        frameBorder={0}
        width={900}
        height={900}
        allowFullScreen
        allow="autoplay; fullscreen"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "block",
        }}
        className="_scorebatEmbeddedPlayer_"
      />
    </div>
  );
};

export default LiveScoreWidget;
