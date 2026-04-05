import DishCard from "./DishCard";

function DishList({ dishes }) {
    if (dishes.length === 0) {
        return <p>No hay platos disponibles.</p>
    }
    return (
        <div className="dish-list">
            {dishes.map((dish) => (
                <DishCard key={dish._id} dish={dish}/>
            ))}
        </div>
    )
}

export default DishList