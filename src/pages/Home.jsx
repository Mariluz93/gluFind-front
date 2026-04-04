import { useEffect, useState } from "react"
import RestaurantList from "../components/RestaurantList"
import logo from '../assets/logo.png'

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
        return <p>Cargando restaurantes...</p>
    }

    if(error) {
        return <p>{error}</p>
    }

    return (
        <div className="page-container">
            <div className="home-header">
                <img src={logo} alt="Logo de gluFind en cabecera" className='home-logo'/>
                <p>Busca y guarda tus opciones SIN GLUTEN favoritas</p>
            </div>
            <br />
            <h2>Restaurantes</h2>
            <RestaurantList restaurants={restaurants}/>
        </div>
    )
}

export default Home