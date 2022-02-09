import { useFetch } from "hooks/useFetch";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMsg from "./error";
import { Loading } from "./loading";

const PopularTags = () => {
    const [{ response, isLoading, error }, doFetch] = useFetch('/tags');
    const { tags } = response ? response : []


    useEffect(() => {
        doFetch()
    }, [doFetch])

    if (isLoading || !response) {
        return <Loading />
    }
    if (error) {
        return <ErrorMsg />
    }

    return (
        <div className="sidebar">
            <h3>Popolar tags</h3>
            <ul className=" tag-list">
                {tags.map(tag => {
                    return <li className="tag-item" key={tag}>
                        <Link to={`tags/${tag}`} className='tag-default tag-pill'>{tag}</Link>
                    </li>
                })}
            </ul>
        </div>
    )
}
export default PopularTags