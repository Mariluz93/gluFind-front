import RestaurantCard from './RestaurantCard'

function RestaurantList({ restaurants }) {
    if (restaurants.length === 0) {
        return <p>No hay restaurantes disponibles</p>
    }
    return (
        <div>
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
        </div>
    )
}

export default RestaurantList