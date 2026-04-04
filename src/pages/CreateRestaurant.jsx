import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


function CreateRestaurant() {
    const { token } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: ''
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
                <h2>Create Restaurant</h2>

                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="description" placeholder="Description" onChange={handleChange} />
                <input name="address" placeholder="Address" onChange={handleChange} />

                <button>Create</button>

                {error && <p>{error}</p> }
            </form>
        </>
    )
}

export default CreateRestaurant