import React, { useEffect } from "react";
import { useFetch } from "hooks/useFetch";
import { Loading } from "components/loading";
import Feed from "components/feed";
import Pagination from "components/pagination";
import { useLocation } from "react-router-dom";
import { getPaginator, limit } from "utils";
import { stringify } from "query-string";



const GlobalFeed = () => {
    const { search, pathname } = useLocation();
    const { currentPage, offset } = getPaginator(search)
    const stringifiedParams = stringify({
        limit,
        offset
    })
    const [{ isLoading, response, error }, doFetch] = useFetch(`/articles?${stringifiedParams}`)
    

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])

    return (
        <div className=" home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium clone</h1>
                    <p>A place to share knoleges</p>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        {error && <div>Something went wrong...</div>}
                        {isLoading ? <Loading /> : response && (
                            <>
                                <Feed articles={response.articles} />
                                <Pagination total={response.articlesCount} url={pathname} limit={limit} currentPage={currentPage} />
                            </>
                        )}
                    </div>
                    <div className="col-md-3">
                        Popular tags
                    </div>
                </div>
            </div>

        </div>
    )
};
export default GlobalFeed