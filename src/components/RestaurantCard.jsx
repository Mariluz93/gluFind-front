import { Link } from "react-router-dom"

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <p>{restaurant.address}</p>

            <Link to={`/restaurants/${restaurant._id}`} ><button>View details</button></Link>
        </div>
    )
}

export default RestaurantCard