import React, { useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from 'contexts/currentUser';
import { Loading } from "./loading";



const TopBar = () => {
    const [{ isLoading, isLoggedIn, currentUser }] = useContext(CurrentUserContext)


    return (
        <nav className={`navbar navbar-light `}>
            <div className="container">
                <div className="nav-item">
                    <Link className={`navbar-brand`} to={`/`} >Medium</Link>
                </div>

                <ul className="nav navbar-nav pull-xs-right">
                    {isLoading ? <Loading /> : <>
                        <li className="nav-item">
                            <NavLink className={`nav-link`} to={`/`}>Home</NavLink>
                        </li>
                        {isLoggedIn === false && (
                            <>
                                <li className="nav-item">
                                    <NavLink className={`nav-link`} to={`/login`}>Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link`} to={`/register`}>Sign Up</NavLink>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <NavLink className={`nav-link`} to={'/article/new'} >
                                        <i className="ion-compose" /> &nbsp; New Post</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link`} to={`/profiles/${currentUser.username}`} >
                                        <img className="user-pic" src={currentUser.image} alt={currentUser.username} />
                                        &nbsp;{currentUser.username}

                                    </NavLink>
                                </li>
                            </>
                        )}
                    </>}
                </ul>
            </div>
        </nav>
    )
};
export default TopBar