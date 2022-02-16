import React, { useEffect } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import { Loading } from "components/loading";

const UserProfile = () => {
    const { slug } = useParams();
    const { pathname } = useLocation();
    const isFavorites = pathname.includes('/favotites');
    const apiUrl = isFavorites ? `/profiles/${slug}/favotites` : `/profiles/${slug}`;
    const [{ response, isLoading }, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch()
    }, [doFetch, slug])

    return (
        isLoading ? <Loading /> : response && (
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <img className="user-img" src={response.profile.image} alt={response.profile.username} />
                                <h2>{response.profile.username}</h2>
                                {response.profile.bio && <p>{response.profile.bio}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <div className="articles-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to={`/profiles/${response.profile.username}`} end>My Posts</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to={`/profiles/${response.profile.username}/favorites`}>Favorites Posts</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
export default UserProfile