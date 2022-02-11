import React, { useEffect, useState } from "react";
import { BackEndErrorMessages } from "./backendErrorMessages";


const ArticleForm = ({ onSubmit, error, initialValues }) => {

    const [title, setTite] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [tagList, setTagList] = useState('')
    console.log(initialValues)

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit({
            title,
            description,
            body,
            tagList
        })
    }
    useEffect(() => {
        if (!initialValues) {
            return
        }
        setTite(initialValues.title)
        setDescription(initialValues.description)
        setBody(initialValues.body)
        setTagList(initialValues.tagList.join(' '))

    }, [initialValues])


    return (<div>
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        {error && <BackEndErrorMessages backEndErrors={error} />}
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className=" form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        placeholder="Artile Titile"
                                        type="text"
                                        value={title}
                                        onChange={({ target: { value } }) => setTite(value)}
                                    />

                                </fieldset>
                                <fieldset className=" form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        placeholder="What is article about?"
                                        type="text"
                                        value={description}
                                        onChange={({ target: { value } }) => setDescription(value)}
                                    />
                                </fieldset>
                                <fieldset className=" form-group">
                                    <textarea
                                        rows='8'
                                        className="form-control"
                                        placeholder="Write you article (in markdown)"
                                        type="text"
                                        value={body}
                                        onChange={({ target: { value } }) => setBody(value)} />
                                </fieldset>
                                <fieldset className=" form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        placeholder="Enter tags"
                                        type="text"
                                        value={tagList}
                                        onChange={({ target: { value } }) => setTagList(value)}
                                    />
                                </fieldset>
                            </fieldset>
                            <fieldset className=" form-group">
                                <button className="btn btn-primary btn-lg pull-xs-right">Publish Article</button>
                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    </div>)
}
export default ArticleForm