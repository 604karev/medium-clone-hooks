import { CurrentUserContext } from 'contexts/currentUser';
import { useFetch } from 'hooks/useFetch'
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useContext, useEffect } from 'react'


export const CurrentUserChecker = ({ children }) => {
    const [{ response }, doFetch] = useFetch('/user');
    const [, dispatch] = useContext(CurrentUserContext)
    const [token] = useLocalStorage('token')


    useEffect(() => {
        if (!token) {
            dispatch({ type: "SET_UNAUTHORIZED" })
            return
        }
        doFetch()
        dispatch({ type: 'LOADING' })
    }, [dispatch, token, doFetch])

    useEffect(() => {
        if (!response) {
            return
        }
        dispatch({ type: 'SET_AUTHORIZED', payload: response.user })

    }, [response, dispatch])

    return children

}
