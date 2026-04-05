import { Link } from "react-router-dom"

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            {restaurant.image && (
                <img src={restaurant.image} alt={restaurant.name} className="card-image" />
            )}
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <p>{restaurant.address}</p>
            <div className="card-actions">
                <Link to={`/restaurants/${restaurant._id}`} ><button>Ver restaurante</button></Link>
            </div>
        </div>
    )
}

export default RestaurantCard