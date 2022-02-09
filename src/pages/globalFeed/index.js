import React, { useEffect } from "react";
import { useFetch } from "hooks/useFetch";
import { Loading } from "components/loading";
import Feed from "components/feed";
import Pagination from "components/pagination";
import { useLocation, useParams } from "react-router-dom";
import { getPaginator, limit } from "utils";
import { stringify } from "query-string";
import PopularTags from "components/popularTags";
import ErrorMsg from "components/error";
import FeedToggler from "components/feedToggler";



const GlobalFeed = ({ yourFeed }) => {
    const { search, pathname } = useLocation();
    const { tag } = useParams()
    const { currentPage, offset } = getPaginator(search)
    const feedParams = stringify({
        limit,
        offset,
        tag
    })
    const staticUrl = '/articles'
    const feedUrl = yourFeed ? `${staticUrl}/feed?${feedParams}` : `/${staticUrl}?${feedParams}`;
    const [{ isLoading, response, error }, doFetch] = useFetch(feedUrl);


    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage, tag, yourFeed, error])

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
                        <FeedToggler tagName={tag} />
                        {isLoading && error && <ErrorMsg />}
                        {isLoading ? <Loading /> : response && (
                            <>
                                <Feed articles={response.articles} />
                                <Pagination total={response.articlesCount} url={pathname} limit={limit} currentPage={currentPage} />
                            </>
                        )}
                    </div>
                    <div className="col-md-3">
                        <PopularTags />
                    </div>
                </div>
            </div>

        </div>
    )
};
export default GlobalFeed