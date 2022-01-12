import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteServer } from "../../store/servers";

const RemoveServer = ({ serverId, userId }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const deletePayload = { userId, serverId };
        let deletedServer = dispatch(DeleteServer(deletePayload));
        if (deletedServer) history.push(`/servers`);
    };
    return (
        <button onClick={handleSubmit} className="edit_cocktail_button">
            <i className="far fa-trash-alt"></i>
        </button>
    )
}

export default RemoveServer;