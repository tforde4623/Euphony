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
  const [nameErrs, setNameErrs] = useState([]);

  useEffect(() => {
    dispatch(showServers());
    setName(server?.name);
    setIconURL(server?.icon_url);
  }, [dispatch, serverId, server?.name, server?.icon_url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedServer = {
      name,
      serverId,
      userId,
      iconURL,
    };

    dispatch(updateServer(updatedServer))
      .then(res => {
        if (res.errors) {
          if (res.errors.name) {
            setNameErrs(res.errors.name);
          } else {
            // this would be an error not related to user input
            res.errors.general && setErrors(res.errors.general);
          }
        } else {
          history.push(`/servers`);
        }
      })
  };

  return (
    <div className="new_server_div">
      <h1 className="dark_large">Edit Your Server</h1>
      <form onSubmit={handleSubmit}>

        {errors.length ? 
          <div className='err-visibility-container'>
            {errors.map(err => (
              <div className='input-err-msg' key={err}>{err}</div>
            ))}
          </div>
        : null }

        <input
          className={nameErrs.length ? 'input-err' : null}
          placeholder="Server Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>

        {nameErrs.length ? 
          <div className='err-visibility-container'>
            {nameErrs.map(err => (
              <div className='input-err-msg' key={err}>{err}</div>
            ))}
          </div>
        : null }

        <input
          placeholder="Icon URL (optional)"
          name="iconURL"
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
