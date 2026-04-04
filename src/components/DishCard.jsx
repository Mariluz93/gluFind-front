function DishCard({ dish }) {
    return(
        <div className="dish-card">
            <h4>{dish.name}</h4>
            <p>{dish.description}</p>
            <p>Price: {dish.price} €</p>
            <p>{dish.isGlutenFree ? "Sin gluten" : "Contiene gluten"}</p>
        </div>
    )
}

export default DishCard