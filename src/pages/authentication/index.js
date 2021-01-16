import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import useFetch from "../../hooks/useFetch";

const Authentication = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [{response, isLoading, error}, doFetch] = useFetch('someurl');

    console.log(response, isLoading, error, doFetch);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true)
    };

    useEffect(
        () => {
            if (!isSubmitted) {
                return
            }
            axios(
                'https://conduit.productionready.io/api/users/login',
                {
                    method: 'post',
                    data: {
                        user: {
                            email: 'ematil@mail.com',
                            password: '1234'
                        }
                    }
                }
            )
                .then(res => {
                        console.log(`dsadsda`, res);
                        setIsSubmitted(false)
                    }
                )
                .catch(error => {
                    console.log(`some`, error);
                    setIsSubmitted(false)
                })
        }
    );

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Login</h1>
                        <p className="text-xs-center">
                            <Link to={`/register`}>Need an account?</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        type="email"
                                        className='form-control form-control-lg'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        type="password"
                                        className='form-control form-control-lg'
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}/>
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" type='submit'
                                        disabled={isSubmitted}>Sign in
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
};
export default Authentication