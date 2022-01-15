import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { unjoin } from "../../../store/members";
import { useState } from 'react';

const UnjoinButton = ({serverId}) => {
    const dispatch = useDispatch()
    const currUser = useSelector((state) => state.session.user);
    const memberships = useSelector((state) => state.members)
    const memberArr = Object.values(memberships)
    // const [symbol, setSymbol] = useState('X')

    return (
        <div>
            <button onClick={() => {
                dispatch(unjoin(serverId, currUser.id))
                // setSymbol('+')
            }}>X</button>
        </div>
    )
}

export default UnjoinButton