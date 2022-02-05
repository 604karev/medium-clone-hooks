import React from "react";
import { useParams } from "react-router-dom";

const Article = () => {
    const params = useParams()
    return (
        <div>
            Article{params}
        </div>
    )
};
export default Article