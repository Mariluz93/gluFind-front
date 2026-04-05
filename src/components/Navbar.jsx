import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png'

function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav>
            <div className='nav-left'>
                <Link to="/" className='logo-link'>
                    <img src={logo} alt="Logo de gluFind para acceder a inicio" className='logo'/>
                </Link>
            </div>

            <div className='nav-right'>
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
            </div>
        </nav>
    )
}

export default Navbar;