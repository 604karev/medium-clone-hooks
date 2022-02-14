import React, { useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import { Loading } from "components/loading";
import ErrorMsg from "components/error";
import TagList from "components/tagList";
import { CurrentUserContext } from "contexts/currentUser";


const Article = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const urlApi = `/articles/${slug}`;
    const [{
        response: fetchArticleResponse,
        isLoading, error },
        doFetch] = useFetch(urlApi)
    const [{
        response: deleteArticleResponse,
    }, doDeleteArticle] = useFetch(urlApi)
    const [{ isLoggedIn, currentUser }] = useContext(CurrentUserContext)


    const isAuthor = () => {
        if (!fetchArticleResponse || !isLoggedIn) {
            return false
        }
        return fetchArticleResponse.article.author.username === currentUser.username
    }

    const deleteArticle = () => {
        doDeleteArticle({
            method: 'delete',
        })
    }

    useEffect(() => {
        if (deleteArticleResponse === '') {
            return navigate('/');
        }
    }, [deleteArticleResponse, navigate])

    useEffect(() => {
        doFetch()
    }, [doFetch]);

    return (
        <div className=" article-page">
            <div className="banner">
                {!isLoading && fetchArticleResponse && (
                    <div className="container">
                        <h1>{fetchArticleResponse.article.title}</h1>
                        <div className="article-meta">
                            <Link to={`profiles/${fetchArticleResponse.article.author.username}`}>
                                <img src={fetchArticleResponse.article.author.image} alt={fetchArticleResponse.article.author.username} />
                            </Link>
                            <div className="info">
                                <Link to={`profiles/${fetchArticleResponse.article.author.username}`}>
                                    {fetchArticleResponse.article.author.username}
                                </Link>
                                <span className="date">{fetchArticleResponse.article.createdAt}</span>
                            </div>
                            {isAuthor() && (
                                <span>
                                    <Link className="btn btn-outline-secondary btn-sm" to={`/article/${slug}/edit`}>
                                        <i className="ion-edit" />&nbsp;
                                        Edit Article
                                    </Link>
                                    <button onClick={deleteArticle} className="btn btn-outline-danger btn-sm">
                                        <i className="ion-trash-a" />&nbsp;
                                        Delete Article
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="page container">
                {isLoading && error && <ErrorMsg />}
                {isLoading ? <Loading /> : fetchArticleResponse && (
                    <div>
                        <div className="row article-content">
                            <div className="col-xs-12">
                                <p>{fetchArticleResponse.article.body}</p>
                                <TagList tags={fetchArticleResponse.article.tagList ? fetchArticleResponse.article.tagList : []} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};
export default Article