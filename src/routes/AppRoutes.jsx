import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'
import RoleProtectedRoute from '../components/RoleProtectedRoute'
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
                            <RoleProtectedRoute allowedRole='user'>
                                <Favorites />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute allowedRole='restaurant'>
                                <RestaurantDashboard />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path='/create-restaurant'
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute allowedRole='restaurant'>
                                <CreateRestaurant />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path='/edit-restaurant/:id'
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute allowedRole='restaurant'>
                                <EditRestaurant />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path='/create-dish'
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute allowedRole='restaurant'>
                                <CreateDish />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path='/edit-dish/:id'
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute allowedRole='restaurant'>                       
                                <EditDish />
                            </RoleProtectedRoute>
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