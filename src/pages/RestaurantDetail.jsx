import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DishList from "../components/DishList"
import FavoriteButton from "../components/FavoriteButton"
import { useAuth } from "../context/AuthContext"


function RestaurantDetail() {
    const { id } =useParams()
    const { user, token } = useAuth()

    const [restaurant, setRestaurant] = useState(null)
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [onlyGlutenFree, setOnlyGlutenFree] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const canUseFavorites = user && user.role === "user"

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const restaurantResponse = await fetch(`http://localhost:4000/api/restaurants/${id}`)
                const restaurantData = await restaurantResponse.json()

                if (!restaurantResponse.ok) {
                    setError(restaurantData.message || "Error loading restaurant")
                    setLoading(false)
                    return
                }

                const dishesResponse = await fetch(`http://localhost:4000/api/dishes/restaurant/${id}`)
                const dishesData = await dishesResponse.json()

                if (!dishesResponse.ok) {
                    setError(dishesData.message || "Error loading dishes")
                    setLoading(false)
                    return
                }

                setRestaurant(restaurantData)
                setDishes(dishesData)

                if (token && user && user.role === "user") {
                    const favoritesResponse = await fetch('http://localhost:4000/api/favorites', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })

                    const favoritesData = await favoritesResponse.json()

                    if (favoritesResponse.ok) {
                        const exists = favoritesData.some(
                            (favorite) => favorite.restaurantId && String(favorite.restaurantId._id) === String(id)
                        )
                        setIsFavorite(exists)
                    }
                }
            } catch (error) {
                setError('Server error')
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurantData()
    }, [id, token, user])

    const handleAddFavorite = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ restaurantId: id })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Error adding favorite')
                return
            }
            
            setIsFavorite(true)
        } catch (error) {
            setError('Server Error')
        }
    }

    const handleRemoveFavorite = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/favorites/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Error removing favorite')
                return
            }

            setIsFavorite(false)
        } catch (error) {
            setError('Server error')
        }
    }

    const filteredDishes = onlyGlutenFree
        ? dishes.filter((dish) => dish.isGlutenFree)
        : dishes
    
        if (loading) {
            return <p>Cargando restaurante...</p>
        }

        if (error) {
            return <p>{error}</p>
        }

        if (!restaurant) {
            return <p>Restaurante no encontrado</p>
        }

    return (
        <>
            <div className="page-container">
                <div className="detail-header">
                    {restaurant.image && (
                        <img src={restaurant.image} alt={restaurant.name} className="detail-image" />
                    )}
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.description}</p>
                    <p>{restaurant.address}</p>
                </div>

                <FavoriteButton
                    isFavorite={isFavorite}
                    onAdd={handleAddFavorite}
                    onRemove={handleRemoveFavorite}
                    canUseFavorites={canUseFavorites}
                />

                <label>
                    <input
                        type="checkbox"
                        checked={onlyGlutenFree}
                        onChange={() => setOnlyGlutenFree(!onlyGlutenFree)}
                    />
                    Mostrar solo platos sin gluten
                </label>

                <h3>Menú</h3>
                <DishList dishes={filteredDishes} />
            </div>
        </>
    )
}

export default RestaurantDetail