function DishCard({ dish }) {
    return(
        <>
            <h4>{dish.name}</h4>
            <p>{dish.description}</p>
            <p>Price: {dish.price} €</p>
            <p>{dish.isGlutenFree ? "Gluten Free" : "Contains Gluten"}</p>
        </>
    )
}

export default DishCard