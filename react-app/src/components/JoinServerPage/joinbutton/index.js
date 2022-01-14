import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { join } from "../../../store/members";

const JoinButton = ({serverId}) => {
    const dispatch = useDispatch()
    const currUser = useSelector((state) => state.session.user);
    const memberships = useSelector((state) => state.members)
    const memberArr = Object.values(memberships)

    const payload = {
        serverId,
        userId: currUser.id
    }
    return (
        <div>
            <button onClick={() => dispatch(join(payload))}>+</button>
        </div>
    )
}

export default JoinButton
