import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav>
            <Link to='/'>Home</Link>

            {!user && (
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            )}

            {user && user.role === 'user' && (
                <>
                    <Link to='/favorites'>Favorites</Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}
            {user && user.role === 'restaurant' && (
                <>
                    <Link to='/dashboard'>Dashboard</Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}            
        </nav>
    )
}

export default Navbar;