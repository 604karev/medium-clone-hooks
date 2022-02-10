import React, { useState } from "react";
import { BackEndErrorMessages } from "./backendErrorMessages";

const ArticleForm = ({ onSubmit, errors, initialValues }) => {

    const [title, setTite] = useState('')
    const [decription, setDecription] = useState('')
    const [body, setBody] = useState('')
    const [tagList, setTagList] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit({
            title,
            decription,
            body,
            tagList
        })
    }

    return (<div>
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        {/* <BackEndErrorMessages backEndErrors={ } /> */}
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
                                        value={decription}
                                        onChange={({ target: { value } }) => setDecription(value)}
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