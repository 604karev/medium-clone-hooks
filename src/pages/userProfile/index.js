import React, { useEffect } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import { Loading } from "components/loading";
import UserArticles from "components/userArticles";

const UserProfile = () => {
    const { slug } = useParams();
    const { pathname, search } = useLocation();
    const isFavorites = pathname.includes('/favorites');
    const apiUrl = `/profiles/${slug}`;
    const [{ response, isLoading }, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch()
    }, [doFetch, slug])

    return (
        isLoading ? <div className="text-xs-center"> <Loading /></div> : response && (
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
                            <UserArticles
                                username={response.profile.username}
                                search={search}
                                isFavorites={isFavorites}
                                pathname={pathname}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
export default UserProfile