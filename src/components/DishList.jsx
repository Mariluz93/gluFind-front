import DishCard from "./DishCard";

function DishList({ dishes }) {
    if (dishes.length === 0) {
        return <p>No hay platos dispon</p>
    }
    return (
        <>
            {dishes.map((dish) => (
                <DishCard key={dish._id} dish={dish}/>
            ))}
        </>
    )
}

export default DishList