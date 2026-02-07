import React from "react";
import "./css/VideoShow.css";

const VideoShow = () => {
  return (
    <div className="rounded-4xl w-[80%] flex m-auto h-[650px] bg-[linear-gradient(to_bottom,#4E2C6E,#8B6FA0)] ">
   <div className="w-20">
       <iframe
        src="https://www.youtube.com/embed/SXJ_p6xvF0U?mute=1&autoplay=1&loop=1&playlist=SXJ_p6xvF0U"
        title="Responsive Video"
        allow="autoplay; encrypted-media"
        frameBorder="0"
        className="video-iframe"
        allowFullScreen
      />
   </div>
    </div>
  );
};

export default VideoShow;
