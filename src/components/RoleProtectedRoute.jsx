import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({ children, allowedRole }) {
    const { user, loading } = useAuth()

    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <Navigate to='/login' replace />
    }

    if (user.role !== allowedRole) {
        return <Navigate to='/unauthorized' replace />
    }

    return children
}

export default RoleProtectedRoute