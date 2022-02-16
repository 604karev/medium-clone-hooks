import React from "react";
import { useFetch } from "hooks/useFetch";
import classNames from "classnames";

const AddToFavorite = ({ isFavorited, favoritesCount, slug }) => {
    const apiUrl = `/articles/${slug}/favorite`;
    const [{ response, isLoading }, doFetch] = useFetch(apiUrl)
    const responseFavoritesCount = response ? response.article.favoritesCount : favoritesCount
    const responseIsFavorited = response ? response.article.favorited : isFavorited
    const buttonLike = classNames({
        'btn': true,
        'btn-small': true,
        'btn-outline-primary': true,
        'btn-primary': responseIsFavorited,
    })

    const handleLike = () => {
        doFetch({
            method: responseIsFavorited ? 'delete' : 'post'
        })
    }

    return (
        <button disabled={isLoading} className={buttonLike} onClick={handleLike}>
            <i className=" ion-heart" />
            <span>&nbsp;{responseFavoritesCount}</span>
        </button>
    )
}
export default AddToFavorite