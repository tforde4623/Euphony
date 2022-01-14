import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { unjoin } from "../../../store/members";

const UnjoinButton = ({serverId}) => {
    const dispatch = useDispatch()
    const currUser = useSelector((state) => state.session.user);
    const memberships = useSelector((state) => state.members)
    const memberArr = Object.values(memberships)


    return (
        <div>
            <button onClick={() => dispatch(unjoin(serverId, currUser.id))}>x</button>
        </div>
    )
}

export default UnjoinButton
