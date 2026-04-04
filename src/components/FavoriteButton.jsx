function FavoriteButton({ isFavorite, onAdd, onRemove, canUseFavorites }) {
    if (!canUseFavorites) {
        return null
    }

    return (
        <>
            {isFavorite ? (
                <button onClick={onRemove}>Remove from favorites</button>
            ) : (
                <button onClick={onAdd}>Add to favorites</button>
            )}
        </>
    )
}

export default FavoriteButton