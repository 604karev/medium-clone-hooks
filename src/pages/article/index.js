import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import { Loading } from "components/loading";
import ErrorMsg from "components/error";
import TagList from "components/tagList";


const Article = () => {
    const { slug } = useParams();
    const urlApi = `/articles/${slug}`
    const [{ response, isLoading, error }, doFetch] = useFetch(urlApi)




    useEffect(() => {
        doFetch()
    }, [doFetch]);



    return (
        <div className=" article-page">
            <div className="banner">

                {!isLoading && response && (
                    <div className="container">
                        <h1>{response.article.title}</h1>
                        <div className="article-meta">
                            <Link to={`profiles/${response.article.author.username}`}>
                                <img src={response.article.author.image} alt={response.article.author.username} />
                            </Link>
                            <div className="info">
                                <Link to={`profiles/${response.article.author.username}`}>
                                    {response.article.author.username}
                                </Link>
                                <span className="date">{response.article.createdAt}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="page container">
                {isLoading && error && <ErrorMsg />}
                {isLoading ? <Loading /> : response && (
                    <div>
                        <div className="row article-content">
                            <div className="col-xs-12">
                                <p>{response.article.body}</p>
                                <TagList tags={response.article.tagList} />
                            </div>
                        </div>

                    </div>
                )}
            </div>

        </div>
    )
};
export default Article