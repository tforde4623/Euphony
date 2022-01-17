import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateServer, showServers } from "../../store/servers";
import RemoveServer from "../DeleteServer";

const EditServer = () => {
  let { serverId } = useParams();
  serverId = Number(serverId);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user?.id);
  const server = useSelector((state) => state.servers[serverId]);

  const [name, setName] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(showServers());
    setName(server?.name);
    setIconURL(server?.icon_url);
  }, [dispatch, serverId, server?.name]);

  useEffect(() => {
    const errors = [];
    if (!name?.length) errors.push("Server name cannot be empty.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedServer = {
      name,
      serverId,
      userId,
    };

    dispatch(updateServer(updatedServer));
    history.push(`/servers/${serverId}`);
  };

  return (
    <div className="new_server_div">
      <h1 className="dark_large">Edit Your Server</h1>
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

        <div>
          <button type="submit" disabled={errors.length} className="add_btn">
            <i className="fas fa-plus"></i>
          </button>
          <RemoveServer serverId={serverId} userId={userId} />
        </div>

        
      </form>
      <h2 className="dark_large" id="preview_text">
        Live Preview Your Server Card
      </h2>
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

export default EditServer;
