import { CurrentUserContext } from 'contexts/currentUser';
import { useFetch } from 'hooks/useFetch'
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useContext, useEffect } from 'react'


export const CurrentUserChecker = ({ children }) => {
    const [{ response }, doFetch] = useFetch('/user');
    const [, setUserContext] = useContext(CurrentUserContext)
    const [token] = useLocalStorage('token')


    useEffect(() => {
        if (!token) {
            setUserContext(state => ({
                ...state,
                isLoggedIn: false
            }))
            return
        }
        doFetch()
        setUserContext(state => ({
            ...state,
            isLoading: true
        }))
    }, [setUserContext, token, doFetch])

    useEffect(() => {
        if (!response) {
            return
        }
        setUserContext(state => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response.user
        }))

    }, [response, setUserContext])



    return children

}
