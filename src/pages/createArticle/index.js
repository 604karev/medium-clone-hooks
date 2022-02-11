import ArticleForm from "components/articleForm";
import { useFetch } from "hooks/useFetch";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "contexts/currentUser";

const CreateArticle = () => {
    const navigate = useNavigate();
    const apiUrl = '/articles';
    const [{ response, error }, doFetch] = useFetch(apiUrl)
    const [CurrentUserState] = useContext(CurrentUserContext)
    console.log(CurrentUserState)

    const initialValues = {
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
        if (CurrentUserState.isLoggedIn===false) {
            return navigate('/')
        }        

    }, [CurrentUserState, navigate])



    return (
        <ArticleForm
            error={(error && error.errors) || {}}
            initialValues={initialValues}
            onSubmit={handleSubmit} />
    )
}

export default CreateArticle