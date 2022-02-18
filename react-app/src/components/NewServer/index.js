import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createServer } from "../../store/servers";
import "./NewServer.css";
import "../ShowAllMessages/ShowAllMessages.css";

const NewServer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [errors, setErrors] = useState([]);
  const [nameErrs, setNameErrs] = useState([]);
  const owner_id = useSelector((state) => state.session.user?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newServer = { name, owner_id, iconURL };

    dispatch(createServer(newServer)).then((res) => {
      if (res.errors) {
        if (res.errors.name) {
          setNameErrs(res.errors.name);
        } else {
          // this would be an error not related to user input
          res.errors.general && setErrors(res.errors.general);
        }
      } else {
        history.push(`/servers/${res?.id}/channels/${res?.default_channel}`);
      }
    });
  };

  return (
    <div className="new_server_div">
      <h1 className="dark_large">Create a New Server</h1>
      <form onSubmit={handleSubmit}>
        {errors.length ? (
          <div className="err-visibility-container">
            {errors.map((err) => (
              <div className="input-err-msg" key={err}>
                {err}
              </div>
            ))}
          </div>
        ) : null}

        <input
          className={nameErrs.length ? "input-err" : null}
          placeholder="Server Name"
          name="server_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>
        {/* map through errors if present on submission */}
        {nameErrs.length ? (
          <div className="err-visibility-container">
            {nameErrs.map((err) => (
              <div className="input-err-msg" key={err}>
                {err}
              </div>
            ))}
          </div>
        ) : null}

        <input
          placeholder="Icon URL (optional)"
          name="icon_url"
          value={iconURL}
          onChange={(e) => setIconURL(e.target.value)}
          type="text"
        ></input>

        <button type="submit" disabled={errors.length} className="add_btn">
          <i className="fas fa-plus"></i>
        </button>
      </form>

      <h2 className="dark_large" id="preview_text">
        Live Preview Your Server Card
      </h2>
      <div className="card" id="preview_card">
        {/* Either display a placeholder image or the url image the user provides */}
        <div className="card_img_container">
          {iconURL ? (
            <img src={iconURL} alt={name}></img>
          ) : (
            <>
              <img src="https://source.unsplash.com/ctXf1GVyf9A"></img>
              <p className="dark_medium">Your Photo Here</p>
            </>
          )}
        </div>

        <div className="splash_card_content">
          <h2 className="splash_card_title light_large">
            {name ? name : "Server Name"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NewServer;
