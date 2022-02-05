import React from "react";
import { useParams } from "react-router-dom";

const Article = () => {
    const params = useParams()
    console.log(params)
    return (
        <div>
            Article {params.slug}
        </div>
    )
};
export default Article