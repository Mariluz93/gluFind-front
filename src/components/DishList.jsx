import DishCard from "./DishCard";

function DishList({ dishes }) {
    return (
        <>
            {dishes.map((dish) => (
                <DishCard key={dish._id} dish={dish}/>
            ))}
        </>
    )
}

export default DishList