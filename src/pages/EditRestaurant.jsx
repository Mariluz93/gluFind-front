import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function EditRestaurant() {
    const { id } = useParams()
    const { token } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        image: ''
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/restaurants/${id}`)
                const data = await response.json()

                if (!response.ok) {
                        setError(data.message || 'Error loading restaurant')
                        return
                }

                setFormData({
                        name: data.name,
                        description: data.description,
                        address: data.address,
                        image: data.image
                })

            } catch (error) {
                setError('Server error')
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurant()
    }, [id])

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
            const response = await fetch(`http://localhost:4000/api/restaurants/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if(!response.ok) {
                setError(data.message || 'Error updating restaurant')
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
                <h3>Editar restaurante</h3>

                <input
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="description"
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    name="address"
                    placeholder="Dirección"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <input
                    name="image"
                    placeholder="URL de la imagen"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                <div className='form-actions'>
                    <button type="submit">Guardar cambios</button>
                </div>
            </form>
        </>
    )
}

export default EditRestaurant