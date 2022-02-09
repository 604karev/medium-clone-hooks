import { CurrentUserContext } from "contexts/currentUser";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const FeedToggler = ({ tagName }) => {
    const [{ isLoggedIn }] = useContext(CurrentUserContext)
    return (
        <ul className="nav nav-pills outlene-active">
            {isLoggedIn &&
                (<li className="nav-item">
                    <NavLink className='nav-link' to='/feed'>
                        Your feed
                    </NavLink>
                </li>)}
            <li className="nav-item">
                <NavLink className='nav-link' to='/'>
                    Global Feed
                </NavLink>
            </li>
            {tagName &&
                (<li className="nav-item">
                    <NavLink className='nav-link' to={`/tags/${tagName}`}>
                        <i className="ion-pound" />&nbsp;
                        {tagName}
                    </NavLink>
                </li>
                )}
        </ul>
    )
}
export default FeedToggler