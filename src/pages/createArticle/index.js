import ArticleForm from "components/articleForm";
import { useFetch } from "hooks/useFetch";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "contexts/currentUser";

const CreateArticle = () => {
    const navigate = useNavigate();
    const apiUrl = '/articles';
    const [{ response, error }, doFetch] = useFetch(apiUrl)
    const [currentUser] = useContext(CurrentUserContext)

    const initialState = {
        title: '',
        description: '',
        body: '',
        tagList: []
    }
    const handleSubmit = article => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }
    useEffect(() => {
        if (!response) {
            return
        }
        return navigate(`/article/${response.article.slug}`);
    }, [response, navigate])

    useEffect(() => {
        if (currentUser.isLoggedIn===false) {
            return navigate('/')
        }        

    }, [currentUser, navigate])



    return (
        <ArticleForm
            error={(error && error.errors) || {}}
            initialState={initialState}
            onSubmit={handleSubmit} />
    )
}

export default CreateArticle