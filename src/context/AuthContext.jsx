import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        const savedToken = localStorage.getItem('token')

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser))
            setToken(savedToken)
        }

        setLoading(false)

    }, [])

    const login = (userData, tokenData) => {
        setUser(userData)
        setToken(tokenData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', tokenData)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }