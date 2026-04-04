function DishCard({ dish }) {
    return(
        <div className="dish-card">
            <h4>{dish.name}</h4>
            <p>{dish.description}</p>
            <p>Price: {dish.price} €</p>
            <p>{dish.isGlutenFree ? "Gluten Free" : "Contains Gluten"}</p>
        </div>
    )
}

export default DishCard