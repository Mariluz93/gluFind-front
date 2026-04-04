import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RestaurantDetail from '../pages/RestaurantDetail'
import Favorites from '../pages/Favorites'
import RestaurantDashboard from '../pages/RestaurantDashboard'
import CreateRestaurant from '../pages/CreateRestaurant'
import EditRestaurant from '../pages/EditRestaurant'
import CreateDish from '../pages/CreateDish'
import EditDish from '../pages/EditDish'
import Unauthorized from '../pages/Unauthorized'
import NotFound from '../pages/NotFound'

function AppRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/restaurants/:id' element={<RestaurantDetail />} />

                <Route 
                    path='/favorites'
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                            <RestaurantDashboard />
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path='/create-restaurant'
                    element={
                        <ProtectedRoute>
                            <CreateRestaurant />
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path='/edit-restaurant/:id'
                    element={
                        <ProtectedRoute>
                            <EditRestaurant />
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path='/create-dish'
                    element={
                        <ProtectedRoute>
                            <CreateDish />
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path='/edit-dish/:id'
                    element={
                        <ProtectedRoute>
                            <EditDish />
                        </ProtectedRoute>
                    }
                />
                

                <Route path='/unauthorized' element={<Unauthorized />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default AppRoutes