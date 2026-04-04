import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav>
            <Link to='/'>Home</Link> | {' '}

            {!user && (
                <>
                    <Link to='/login'>Login</Link> | {' '}
                    <Link to='/register'>Register</Link>
                </>
            )}

            {user && (
                <>
                    <Link to='/favorites'>Favorites</Link> | {' '}
                    <Link to='/dashboard'>Dashboard</Link> | {' '}
                    <button onClick={logout}>Logout</button>
                </>
            )}            
        </nav>
    )
}

export default Navbar;