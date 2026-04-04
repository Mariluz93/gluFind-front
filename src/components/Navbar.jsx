import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png'

function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav>
            <Link to="/" className='logo-link'>
                <img src={logo} alt="Logo de gluFind para acceder a inicio" className='logo'/>
            </Link>
            <Link to='/'>Inicio</Link>

            {!user && (
                <>
                    <Link to='/login'>Iniciar sesión</Link>
                    <Link to='/register'>¡Regístrate!</Link>
                </>
            )}

            {user && user.role === 'user' && (
                <>
                    <Link to='/favorites'>Favoritos</Link>
                    <button onClick={logout}>Cerrar sesión</button>
                </>
            )}
            {user && user.role === 'restaurant' && (
                <>
                    <Link to='/dashboard'>Dashboard</Link>
                    <button onClick={logout}>Cerrar sesión</button>
                </>
            )}            
        </nav>
    )
}

export default Navbar;