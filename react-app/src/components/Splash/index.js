import React from "react";
import "./Splash.css";

const Splash = () => {
  let rotatingServerCards;
  const rotateRight = () => {};

  const rotateLeft = () => {};
  return (
    <div className="splash_div">
      <div className="splash_photo_div">
        <div className="splash_text_div">
          <h1 className="dark_large">Imagine a place...</h1>
          <p className="dark_medium">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>
        </div>
      </div>

      <div className="server_rotate_div">
        <button onClick={rotateLeft}>
          <i class="fas fa-chevron-left fa-2x"></i>
        </button>
        <div></div>
        <div></div>
        <div></div>
        {/* <div className="three_servers_div">{rotatingServerCards}</div> */}
        <button onClick={rotateRight}>
          <i class="fas fa-chevron-right fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default Splash;
