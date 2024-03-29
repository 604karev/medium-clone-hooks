import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFetch } from 'hooks/useFetch'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { BackEndErrorMessages } from "components/backendErrorMessages";
import { CurrentUserContext } from "contexts/currentUser";
import { stateSetter } from "utils";


const Authentication = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const isLogin = pathname === '/login'
    const urlApi = isLogin ? '/users/login' : '/users';
    const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
    const descriptionLink = isLogin ? '/register' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const [{ response, isLoading, error }, doFetch] = useFetch(urlApi);
    const [, setToken] = useLocalStorage('token');
    const [{ isLoggedIn }, dispatch] = useContext(CurrentUserContext);

    const handleSubmit = e => {
        e.preventDefault();
        const user = isLogin ? { email, password } : { username, email, password }
        doFetch({
            method: 'post',
            data: {
                user
            }
        })
    }

    useEffect(() => {
        if (!response) {
            return
        }
        setToken(response.user.token)
        dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
    }, [response, setToken, dispatch])

    useEffect(() => {
        if (isLoggedIn) {
            return navigate("/");
        }
    }, [isLoggedIn, navigate])

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="text-sm-center">{pageTitle}</h1>
                        <p className="text-sm-center">
                            <Link className="register" to={descriptionLink}>{descriptionText}</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            {error && <BackEndErrorMessages backEndErrors={error.errors} />}
                            <fieldset>
                                {(!isLogin && <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="username"
                                        placeholder="Username"
                                        value={username}
                                        onChange={stateSetter(setUsername)}
                                    />
                                </fieldset>)}
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={stateSetter(setEmail)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        autoComplete="on"
                                        onChange={stateSetter(setPassword)}
                                    />
                                </fieldset>
                                <button disabled={isLoading} className=" btn btn-primary btn-lg pull-xs-right offset-lg-4">{pageTitle}</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Authentication