import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const [userContext, setUserContext] = useState({
        isLoading: false,
        isLoggedIn: null,
        currentUser: null

    })
    return (
        <CurrentUserContext.Provider value={[userContext, setUserContext]} >
            {children}
        </CurrentUserContext.Provider >

    )
}

