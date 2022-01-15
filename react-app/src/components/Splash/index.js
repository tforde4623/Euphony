import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateServer, showServers, DeleteServer } from "../../store/servers";
import "./Splash.css";

const Splash = () => {
  const dispatch = useDispatch();

  const servers = useSelector((state) => state.servers);
  const fourStaticServers = Object.values(servers).slice(0, 4);
  console.log(fourStaticServers);

  useEffect(() => {
    dispatch(showServers());
  }, [dispatch]);

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
        {fourStaticServers.map((server) => {
          return (
            <div className="card">
              {/* FAV CHANNEL FIX */}
              <a href={`/servers/${server?.id}/channels`} id="card_link">
                <div className="card_img_container">
                  <img src={server?.icon_url} alt={server?.name}></img>
                </div>
                <div className="card_content">
                  <h2 className="card_title light_large">{server?.name}</h2>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Splash;
