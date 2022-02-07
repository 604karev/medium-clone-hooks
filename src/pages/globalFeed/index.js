import React, { useEffect } from "react";
import { useFetch } from "hooks/useFetch";
import { Loading } from "components/loading";
import Feed from "components/feed";

const GlobalFeed = () => {
    const [{ isLoading, response, error }, doFetch] = useFetch('/articles?limit=10&offset=0')

    useEffect(() => {
        doFetch()
    }, [doFetch])

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
                            <Feed articles={response.articles} />
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