import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createServer } from '../../store/servers';

const NewServer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);
    const owner_id = useSelector((state) => state.session.user?.id);

    useEffect(() => {
        if (!name.length) errors.push('Server name cannot be empty.')
        setErrors(errors);
    }, [name, errors]);

    const handleSubmit = e => {
        e.preventDefault();
        const newServer = { name, owner_id };

        dispatch(createServer(newServer));
        history.push(`/servers`);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <ul className='errors'>
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}

                <input
                    placeholder='Server Name'
                    name='server_name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type='text'
                    ></input>

                <button type='submit' disabled={errors.length > 0} className='add_btn'>
                    <i className='fas fa-plus'></i>
                </button>
            </form>
        </div>
    );
};

export default NewServer;