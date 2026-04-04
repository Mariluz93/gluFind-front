import RestaurantCard from './RestaurantCard'

function RestaurantList({ restaurants }) {
    return (
        <div>
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
        </div>
    )
}

export default RestaurantList