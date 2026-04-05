import { useEffect, useState } from "react"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function CreateDish() {
    const { token, user } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '', 
        price: '',
        isGlutenFree: false,
        image: ''
    })

    const [restaurantId, setRestaurantId] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchMyRestaurant = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/restaurants')
                const data = await response.json()

                if (!response.ok) {
                    setError('Error loading restaurant')
                    setLoading(false)
                    return
                }

                const myRestaurant = data.find((restaurant) => String(restaurant.ownerId) === String(user.id))

                if (!myRestaurant) {
                    setError('Restaurant not found')
                    setLoading(false)
                    return
                }

                setRestaurantId(myRestaurant._id)

            } catch (error) {
                setError('Server error')
            } finally {
                setLoading(false)
            }
        }

        if (user && user.role === "restaurant") {
            fetchMyRestaurant()
        } else {
            setLoading(false)
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch('http://localhost:4000/api/dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    restaurantId
                })
            })

            const data = await response.json()

            if(!response.ok) {
                setError(data.message || 'Error creating dish')
                return
            }

            navigate('/dashboard')

        } catch (error) {
            setError('Server error')
        }
    }

    if (loading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Crear plato</h3>

                <input name="name" placeholder="Nombre" onChange={handleChange} />
                <input name="description" placeholder="Descripción" onChange={handleChange} />
                <input name="price" placeholder="Precio (€)" onChange={handleChange} />
                <input name="image" placeholder="URL de la imagen" onChange={handleChange} />

                <label>
                    Sin gluten
                    <input type="checkbox" name="isGlutenFree" onChange={handleChange} />
                </label>
                
                <div className='form-actions'>
                    <button type="submit">Crear plato</button>
                </div>

                {error && <p>{error}</p> }
            </form>
        </>
    )
}

export default CreateDish