import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginForm() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Login failed')
                return
            }

            login(data.user, data.token)

            if (data.user.role === 'restaurant') {
                navigate('/dashboard')
            } else {
                navigate('/')
            }

        } catch (error) {
            setError('Error server')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>

            <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
            />

            <button type='submit'>Login</button>

            { error && <p>{error}</p> }
        </form>
    )
}

export default LoginForm