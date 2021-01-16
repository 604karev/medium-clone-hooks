import {useState} from "react";

export default url => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const doFetch = () => {
        return 'hello world'
    };
    return (
        [{isLoading, response, error}, doFetch()]
    )
}