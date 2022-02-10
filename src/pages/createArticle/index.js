import ArticleForm from "components/articleForm";
import React from "react";

const CreateArticle = () => {
    const errors = {}
    const initialValues = {}
    const handleSubmit = (data) => {
        console.log(data)
    }
    return (
        <ArticleForm errors={errors} initialValues={initialValues} onSubmit={handleSubmit} />
    )
}

export default CreateArticle