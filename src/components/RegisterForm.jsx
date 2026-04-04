import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

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
        setSuccess('')

        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Register failed')
                return
            }

            setSuccess('User registered successfully')

            setTimeout(() => {
                navigate('/login')
            }, 1000)

        } catch (error) {
            setError('Server Error')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            <input 
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />

            <input 
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            
            <input 
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            
            <select
                name='role'
                value={formData.role}
                onChange={handleChange}
            >
                <option value='user'>User</option>
                <option value='restaurant'>Restaurant</option>
            </select>

            <button type="submit">Register</button>
            
            { error && <p>{error}</p> }
            { success && <p>{success}</p> }
        </form>
    )
}

export default RegisterForm