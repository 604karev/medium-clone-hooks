import { CurrentUserContext } from 'contexts/currentUser';
import { useFetch } from 'hooks/useFetch'
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useContext, useEffect } from 'react'


export const CurrentUserChecker = ({ children }) => {
    const [{ response }, doFetch] = useFetch('/user');
    const [, setContextState] = useContext(CurrentUserContext)
    const [token] = useLocalStorage('token')


    useEffect(() => {
        if (!token) {
            setContextState(state => ({
                ...state,
                isLoggedIn: false
            }))
            return
        }
        doFetch()
        setContextState(state => ({
            ...state,
            isLoading: true
        }))
    }, [])

    useEffect(() => {
        if (!response) {
            return
        }
        setContextState(state => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response.user
        }))

    }, [response])



    return children

}
