import React from "react";
import { NavLink } from "react-router-dom";

const FeedToggler = ({ tagName }) => {
    return (
        <ul className="nav nav-pills outlene-active">
            <li className="nav-item">
                <NavLink className='nav-link' to='/feed'>
                    Your feed
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className='nav-link' to='/'>
                    Global Feed
                </NavLink>
            </li>
            {tagName && (
                <li className="nav-item">
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