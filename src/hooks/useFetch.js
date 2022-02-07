import { useState, useEffect, useCallback, useContext } from "react"
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import { CurrentUserContext } from 'contexts/currentUser';

export const useFetch = (url) => {
    const baseUrl = 'https://conduit.productionready.io/api';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});
    const [token] = useLocalStorage('token');
    const [, setUserContext] = useContext(CurrentUserContext)


    const doFetch = useCallback((options = {}) => {
        setUserContext(state => ({
            ...state,
            isLoading: true
        }))
        setOptions(prevSate => ({ ...prevSate, ...options }));
        setIsSubmitting(true);
    }, [setUserContext])

    useEffect(() => {
        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : ''

                }
            }
        }
        if (!isSubmitting) {
            return
        }
        axios(baseUrl + url, requestOptions)
            .then(res => {
                setIsSubmitting(false)
                setResponse(res.data)
                setUserContext(state => ({
                    ...state,
                    isLoading: false
                }))
            })
            .catch(error => {
                setIsSubmitting(false)
                setError(error.response.data)
                setUserContext(state => ({
                    ...state,
                    isLoading: false
                }))
            })
    }, [isSubmitting, url, options, token, setUserContext])

    return [{ isSubmitting, response, error }, doFetch]

}
