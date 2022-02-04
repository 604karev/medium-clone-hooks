import { useState, useEffect } from "react"
import axios from "axios";

export const useFetch = (url) => {
    const baseUrl = 'https://conduit.productionready.io/api';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});


    const doFetch = (options = {}) => {
        setOptions(prevSate => ({ ...prevSate, ...options }));
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (!isSubmitting) {
            return
        }
        axios(baseUrl + url, options)
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
