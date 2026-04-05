import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


function CreateRestaurant() {
    const { token } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        image: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch('http://localhost:4000/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.message || "Error creating restaurant")
            return
        }

        navigate('/dashboard')

        } catch (error) {
            setError("Server error")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Crear Restaurante</h3>

                <input
                    name="name"
                    placeholder="Nombre"
                    onChange={handleChange}
                    required
                />
                <input
                    name="description"
                    placeholder="Descripción"
                    onChange={handleChange}
                    required
                />
                <input
                    name="address"
                    placeholder="Dirección"
                    onChange={handleChange}
                    required
                />
                <input
                    name="image"
                    placeholder="URL de la imagen" 
                    onChange={handleChange}
                    required
                />
                <div className='form-actions'>
                    <button>Crear restaurante</button>
                </div>

                {error && <p className='error-text'>{error}</p> }
            </form>
        </>
    )
}

export default CreateRestaurant