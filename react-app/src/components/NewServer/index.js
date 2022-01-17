import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createServer } from "../../store/servers";
import "./NewServer.css"

const NewServer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [errors, setErrors] = useState([]);
  const owner_id = useSelector((state) => state.session.user?.id);

  useEffect(() => {
    const errors = [];
    if (!name.length) errors.push("Server name must not be empty.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newServer = { name, owner_id, iconURL };

    dispatch(createServer(newServer));
    history.push(`/servers`);
  };

  return (
    <div className="new_server_div">
      <h1 className="dark_large">Create a New Server</h1>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <input
          placeholder="Server Name"
          name="server_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>

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
      <h2 className="dark_large" id="preview_text">Live Preview Your Server Card</h2>
      <div className="card" id="preview_card">
        <div className="splash_card_img_container">
          <img src={iconURL} alt={name}></img>
        </div>
        <div className="splash_card_content">
          <h2 className="splash_card_title light_large">{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default NewServer;
