import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function EditDish() {
    const { id } = useParams()
    const { token } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        isGlutenFree: false,
        image: ''
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchDish = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/dishes/${id}`)
                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Error loading dish')
                    return
                }

                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    isGlutenFree: data.isGlutenFree,
                    image: data.image || ''
                })
            } catch (error) {
                setError('Server error')
            } finally {
                setLoading(false)
            }
        }

        fetchDish()
    }, [id])

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
            const response = await fetch(`http://localhost:4000/api/dishes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price)
                })
            })

            const data = await response.json()

            if(!response.ok) {
                setError(data.message || 'Error updating dish')
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
                <h3>Editar plato</h3>

                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />

                <label>
                    Sin gluten
                    <input
                        type="checkbox"
                        name="isGlutenFree"
                        checked={formData.isGlutenFree}
                        onChange={handleChange}
                    />
                </label>
                <div className='form-actions'>
                    <button type="submit">Guardar cambios</button>
                </div>
            </form>
        </>
    )
}

export default EditDish