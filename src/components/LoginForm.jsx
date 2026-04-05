import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

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
            const response = await fetch('https://glufind-back.onrender.com/api/auth/login', {
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
            setError('Server error')
        }
    }

    return (
        <>
            <img src={logo} alt="Logo de gluFind en cabecera" className='home-logo'/>
            <form onSubmit={handleSubmit}>
                <h3>Iniciar sesión</h3>

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
                    placeholder='Contraseña'
                    value={formData.password}
                    onChange={handleChange}
                />
                <div className='form-actions'>
                    <button type='submit'>Entrar</button>
                </div>

                { error && <p className="error-text">{error}</p> }
            </form>
        </>
    )
}

export default LoginForm