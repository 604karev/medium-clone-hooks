import React, { useEffect, useState } from "react";
import { BackEndErrorMessages } from "./backendErrorMessages";
import { stateSetter } from "utils";


const ArticleForm = ({ onSubmit, error, initialState }) => {
    const [title, setTite] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [tagList, setTagList] = useState('')

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
        if (!initialState) {
            return
        }
        setTite(initialState.title)
        setDescription(initialState.description)
        setBody(initialState.body)
        setTagList(initialState.tagList.join(' '))

    }, [initialState])

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
                                        onChange={stateSetter(setTite)}
                                    />
                                </fieldset>
                                <fieldset className=" form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        placeholder="What is article about?"
                                        type="text"
                                        value={description}
                                        onChange={stateSetter(setDescription)}
                                    />
                                </fieldset>
                                <fieldset className=" form-group">
                                    <textarea
                                        rows='8'
                                        className="form-control"
                                        placeholder="Write you article (in markdown)"
                                        type="text"
                                        value={body}
                                        onChange={stateSetter(setBody)}
                                    />
                                </fieldset>
                                <fieldset className=" form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        placeholder="Enter tags"
                                        type="text"
                                        value={tagList}
                                        onChange={stateSetter(setTagList)}
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