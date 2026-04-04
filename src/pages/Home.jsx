import { useEffect, useState } from "react"
import RestaurantList from "../components/RestaurantList"

function Home() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/restaurants')
                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || "Error loading restaurants")
                    setLoading(false)
                    return
                }

                setRestaurants(data)

            } catch (error) {
                setError('Server error')
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurants()
    }, [])

    if (loading) {
        return <p>Loading restaurants...</p>
    }

    if(error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <h2>Restaurants</h2>
            <RestaurantList restaurants={restaurants}/>
        </div>
    )
}

export default Home