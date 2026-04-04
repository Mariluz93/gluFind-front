import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Favorites() {
    const { token, user } = useAuth()

    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || "Error loading favorites")
                    setLoading(false)
                    return
                }

                setFavorites(data)    

            } catch (error) {
                setError('Error server')

            } finally {
                setLoading(false)
            }
        }

        if (token && user && user.role === "user") {
            fetchFavorites()
        } else {
            setLoading(false)
        }
        
    }, [token, user])

    const handleRemoveFavorite = async (restaurantId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/favorites/${restaurantId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Error removing favorite")
                return
            }

            setFavorites(favorites.filter((favorite) => String(favorite.restaurantId._id) !== String(restaurantId)))
        } catch (error) {
            setError('Error server')
        }
    }

    if (loading) {
        return <p>Cargando favoritos...</p>
    }

    if (error) {
        return <p>{error}</p>
    }


    return (
        <>
            <div className="page-container">
                <h2>Favoritos</h2>

                {favorites.length === 0 ? (
                    <p>Aun no tienes restaurantes favoritos</p>
                ) : (
                    favorites.map((favorite) => (
                        <div key={favorite._id} className="favorite-card">
                            <h3>{favorite.restaurantId.name}</h3>
                            <p>{favorite.restaurantId.description}</p>
                            <p>{favorite.restaurantId.address}</p>

                            <Link to={`/restaurants/${favorite.restaurantId._id}`}><button>Ver restaurante</button></Link>
                            <button onClick={() => handleRemoveFavorite(String(favorite.restaurantId._id))}>Quitar</button>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Favorites