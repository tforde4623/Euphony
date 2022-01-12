import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateServer, showServers, DeleteServer } from "../../store/servers";

const EditServer = () => {
    let { serverId } = useParams();
    serverId = Number(serverId);
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user?.id);
    const server = useSelector(state => state.servers[serverId]);

    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(showServers());
        setName(server.name);
    }, [dispatch, serverId, server.name]);

    useEffect(() => {
        const errors = [];
        if (!name?.length) errors.push('Server name cannot be empty.');
        setErrors(errors);
    }, [name]);

    const handleSubmit = e => {
        e.preventDefault();
        const updatedServer = {
            name,
            serverId,
            userId
        };

        dispatch(updateServer(updatedServer));
        history.push(`/servers/${serverId}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <ul className="errors">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}

                <input
                    placeholder="Server Name"
                    name='server_name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type='text'
                ></input>

                <button type='submit' disabled={errors.length > 0} className="add_btn">
                    <i className="fas fa-plus"></i>
                </button>

                <DeleteServer serverId={serverId} userId={userId} />
            </form>
        </div>
    )
}

export default EditServer;