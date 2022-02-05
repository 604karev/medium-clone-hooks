import { useState, useEffect } from "react"
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";

export const useFetch = (url) => {
    const baseUrl = 'https://conduit.productionready.io/api';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});
    const [token] = useLocalStorage('token');

    

    const doFetch = (options = {}) => {
        setOptions(prevSate => ({ ...prevSate, ...options }));
        setIsSubmitting(true);
    }

    useEffect(() => {
        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : ''

                }
            }
        }
        console.log(requestOptions)
        if (!isSubmitting) {
            return
        }
        axios(baseUrl + url, requestOptions)
            .then(res => {
                console.log(res)
                setIsSubmitting(false)
                setResponse(res.data)
            })
            .catch(error => {
                console.log(error)
                setIsSubmitting(false)
                setError(error.response.data)
            })
    }, [isSubmitting, url, options])

    return [{ isSubmitting, response, error }, doFetch]

}
