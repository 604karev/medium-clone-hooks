import React from "react";
import {Link, NavLink} from 'react-router-dom'

const TopBar = () => {
    return (
        <nav className={`navbar navbar-light `}>
            <div className="container">
                <div className="nav-item">
                    <Link className={`navbar-brand`} to={`/`} >Medium</Link>
                </div>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <NavLink className={`nav-link`} to={`/`} exact>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={`nav-link`} to={`/login`}>Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={`nav-link`} to={`register`}>Sign Up</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
};
export default TopBar