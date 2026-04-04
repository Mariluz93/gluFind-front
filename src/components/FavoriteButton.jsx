function FavoriteButton({ isFavorite, onAdd, onRemove, canUseFavorites }) {
    if (!canUseFavorites) {
        return null
    }

    return (
        <>
            {isFavorite ? (
                <button onClick={onRemove}>Quitar de favoritos</button>
            ) : (
                <button onClick={onAdd}>Añadir a favoritos</button>
            )}
        </>
    )
}

export default FavoriteButton