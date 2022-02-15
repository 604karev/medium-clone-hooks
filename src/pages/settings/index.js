import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "contexts/currentUser";
import { useFetch } from "hooks/useFetch";
import { BackEndErrorMessages } from "components/backendErrorMessages";
import { useLocalStorage } from "hooks/useLocalStorage";
import { stateSetter } from "utils";

const Settings = () => {
    const navigate = useNavigate();
    const apiUrl = '/user'
    const [{ currentUser, isLoggedIn }, dispatch] = useContext(CurrentUserContext)
    const [{ response, error }, doFetch] = useFetch(apiUrl)
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setToken] = useLocalStorage('token')

    const handleSubmit = (e) => {
        e.preventDefault();
        doFetch(
            {
                method: 'put',
                data: {
                    user: {
                        ...currentUser,
                        image,
                        username,
                        bio,
                        email,
                        password
                    }
                }
            }
        )

    }  

    const logout = () => {
        console.log('logout')
        setToken('')
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        if (!currentUser) {
            return
        }
        setImage(currentUser.image || '')
        setUsername(currentUser.username || '')
        setBio(currentUser.bio || '')
        setEmail(currentUser.email || '')
    }, [currentUser])

    useEffect(() => {
        if (!response) {
            return
        }
        dispatch({ type: 'SET_AUTHORIZED', payload: response.user })

    }, [response, dispatch])

    useEffect(() => {
        if (isLoggedIn===false) {
            return navigate("/");
        }
    }, [isLoggedIn, navigate])

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>
                        {error && <BackEndErrorMessages backEndErrors={{ error: [error] }} />}
                        <form onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="URL of picture profile"
                                    value={image}
                                    onChange={stateSetter(setImage)}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    type="text"
                                    className=" form-control form-control-lg"
                                    placeholder="Username"
                                    value={username}
                                    onChange={stateSetter(setUsername)} />
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea
                                    className="form-control form-control-lg"
                                    rows='8'
                                    placeholder="Short bio"
                                    value={bio}
                                    onChange={stateSetter(setBio)}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Email"
                                    value={email}
                                    onChange={stateSetter(setEmail)}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    value={password}
                                    autoComplete="on"
                                    onChange={stateSetter(setPassword)}
                                />
                            </fieldset>
                            <fieldset className=" form-group">
                                <button className="btn btn-primary btn-lg pull-xs-right">Update Settings</button>
                            </fieldset>
                        </form>
                        <hr />
                        <button className=" btn btn-outline-danger" onClick={logout}>Click here to logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings