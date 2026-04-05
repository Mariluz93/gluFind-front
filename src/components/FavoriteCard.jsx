import { Link } from "react-router-dom";

function FavoriteCard( { favorite, onRemove }) {
    const restaurant = favorite.restaurantId;

    return (
        <>
            <div className="favorite-card">
                {restaurant.image && (
                    <img src={restaurant.image} alt={restaurant.name} className="card-image" />
                )}

                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
                <p>{restaurant.address}</p>
                
                <div className='card-actions'>
                    <Link to={`/restaurants/${restaurant._id}`}><button>Ver restaurante</button></Link>
                    <button onClick={() => onRemove(restaurant._id)}>Quitar</button>
                </div>
            </div>
        </>
    )


}export default FavoriteCard