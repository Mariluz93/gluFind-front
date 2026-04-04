import { Link } from "react-router-dom"

function RestaurantCard({ restaurant }) {
    return (
        <div>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <p>{restaurant.address}</p>

            <Link to={`/restaurants/${restaurant._id}`} >View details</Link>
        </div>
    )
}

export default RestaurantCard