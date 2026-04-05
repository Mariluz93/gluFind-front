import { useEffect, useState } from "react"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom" 
import DashboardDishCard from "../components/DashboardDishCard"

function RestaurantDashboard() {
    const { user, token } = useAuth()
    const navigate = useNavigate()

    const [restaurant, setRestaurant] = useState(null)
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://glufind-back.onrender.com/api/restaurants')
                const data = await response.json()

                if (!response.ok) {
                    setError('Error loading restaurants')
                    return
                }

                const myRestaurant = data.find((restaurant) => String(restaurant.ownerId) === String(user.id))

                setRestaurant(myRestaurant || null)

                if (myRestaurant) {
                    const dishesResponse = await fetch(`https://glufind-back.onrender.com/api/dishes/restaurant/${myRestaurant._id}`)
                    const dishesData = await dishesResponse.json()

                    if(dishesResponse.ok) {
                        setDishes(dishesData)
                    }
                }
            } catch (error) {
                setError('Server error')
            } finally {
                setLoading(false)
            }
        }

        if (user && user.role === "restaurant") {
            fetchData()
        } else {
            setLoading(false)
        }
    }, [user])

    const handleDeleteDish = async (dishId) => {
        try {
            const response = await fetch(`https://glufind-back.onrender.com/api/dishes/${dishId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                setError('Error deleting dish')
                return
            }

            setDishes(dishes.filter((dish) => dish._id !== dishId))
        } catch (error) {
            setError('Server error')
        }
    }

    const handleEditDish = (dishId) => {
        navigate(`/edit-dish/${dishId}`)
    }

    if (loading) {
        return <p>Cargando dashboard...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <div className="page-container">
                    <h2>Dashboard</h2>
            
                {!restaurant ? (
                    <>
                        <p>Aun no has creado tu restaurante</p>
                        <Link to="/create-restaurant">Crear restaurante</Link>
                    </>
                ) : (
                    <>
                        {restaurant.image && (
                            <img src={restaurant.image} alt={restaurant.name} className="detail-image" />
                        )}
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.description}</p>
                        <p>{restaurant.address}</p>

                        <div className='dashboard-actions'>
                            <button onClick={() => navigate(`/edit-restaurant/${restaurant._id}`)}>Editar restaurante</button>
                            <Link to="/create-dish"><button>Añadir plato</button></Link>
                        </div>

                        <h3>Tus platos</h3>

                        {dishes.length === 0 ? (
                            <p>Aun no tienes platos</p>
                        ) : (
                            <div className="dashboard-list">
                                {dishes.map((dish) => (
                                    <DashboardDishCard
                                        key={dish._id}
                                        dish={dish}
                                        onEdit={handleEditDish}
                                        onDelete={handleDeleteDish}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default RestaurantDashboard