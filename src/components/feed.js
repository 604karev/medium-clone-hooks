import React from "react";
import { Link } from "react-router-dom";
import TagList from "./tagList";

const Feed = ({ articles }) => {

    return (
        <div>
            {articles.map((
                { author: { username, image },
                    createdAt,
                    slug,
                    title,
                    description,
                    tagList },
                index) => (
                <div className="article-preview" key={index}>
                    <div className="article-meta">
                        <Link to={`/profiles/${username}`}>
                            <img
                                src={image}
                                alt={username} />
                        </Link>
                        <div className="info">
                            <Link
                                className="author"
                                to={`/profiles/${username}`}>
                                {username}
                            </Link>
                            <span className="date">{createdAt}</span>
                        </div>
                    </div>
                    <Link className="preview-link" to={`/article/${slug}`} >
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <span>Read more...</span>
                        <TagList tags={tagList} />
                    </Link>
                </div>
            ))}
        </div>
    )

}
export default Feed