import React from "react";
export const BackEndErrorMessages = ({ backEndErrors }) => {

    const errorMessages = Object.keys(backEndErrors).map(name => {
        const message = backEndErrors[name].join(' ')
        return `${name} ${message}`
    })

    return (
        <ul className="error-messages">
            {errorMessages.map(error => (
                <li key={error}>{error}</li>
            ))}
        </ul>
    )

}