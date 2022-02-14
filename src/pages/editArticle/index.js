import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "contexts/currentUser";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import ArticleForm from "components/articleForm";

const EditArticle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const apiUrl = `/articles/${slug}`;
    const [CurrentUserState] = useContext(CurrentUserContext)
    const [{
        response: fetchArticleResponse }
        , doFetchArticle] = useFetch(apiUrl)
    const [{
        response: updateArticleResponse,
        error: updateArticleError },
        doUpdateArticle] = useFetch(apiUrl);
    const [initialState, setInitialState] = useState(null)

    const handleSubmit = article => {
        doUpdateArticle({
            method: 'put',
            data: { article }
        })

    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) {
            return
        }
        setInitialState({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        })


    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse) {
            return
        }
        return navigate(`/article/${updateArticleResponse.article.slug}`);
    }, [updateArticleResponse, navigate])

    useEffect(() => {
        if (CurrentUserState.isLoggedIn === false) {
            return navigate('/')
        }

    }, [CurrentUserState, navigate])

    return (
        <ArticleForm
            onSubmit={handleSubmit}
            error={(updateArticleError && { Error: [updateArticleError.message] }) || {}}
            initialState={initialState}
        />
    )
}
export default EditArticle