import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'

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
            const response = await fetch('https://glufind-back.onrender.com/api/auth/register', {
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
        <>
            <img src={logo} alt="Logo de gluFind en cabecera" className='home-logo'/>
            <form onSubmit={handleSubmit}>
                <h3>Registro</h3>

                <input 
                    type="text"
                    name="name"
                    placeholder="Nombre"
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
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                />
                
                <select
                    name='role'
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value='user'>Cliente</option>
                    <option value='restaurant'>Restaurante</option>
                </select>
                <div className='form-actions'>
                    <button type="submit">Registrarse</button>
                </div>
                
                { error && <p className="error-text">{error}</p> }
                { success && <p className="success-text">{success}</p> }
            </form>
        </>
    )
}

export default RegisterForm