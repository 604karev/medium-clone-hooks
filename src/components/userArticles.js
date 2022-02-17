import { stringify } from "query-string";
import React, { useEffect } from "react";
import { getPaginator } from "utils";
import { limit } from "utils";
import { useFetch } from "hooks/useFetch";
import { Loading } from "./loading";
import ErrorMsg from "./error";
import Feed from "./feed";
import Pagination from "./pagination";

const getApiUrl = ({ username, offset, isFavorites }) => {
    const params = isFavorites
        ? { limit, offset, favorited: username }
        : { limit, offset, author: username }

    return `/articles?${stringify(params)}`
}

const UserArticles = ({ username, search, isFavorites, pathname }) => {
    const { currentPage, offset } = getPaginator(search)
    const apiUrl = getApiUrl({ username, offset, isFavorites })
    const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

    useEffect(() => {
        doFetch()
    }, [doFetch, isFavorites, search])

    return (
        <div>
            {isLoading && error && <ErrorMsg />}
            {isLoading ? <Loading /> : response && (
                <>
                    <Feed articles={response.articles} />
                    <Pagination
                        total={response.articlesCount}
                        url={pathname}
                        limit={limit}
                        currentPage={currentPage} />
                </>
            )}
        </div>
    )
}
export default UserArticles