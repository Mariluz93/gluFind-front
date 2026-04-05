function DishCard({ dish }) {
    return(
        <div className="dish-card">
            {dish.image && (
                <img src={dish.image} alt={dish.name} className="card-image" />
            )}
            <h4>{dish.name}</h4>
            <p>{dish.description}</p>
            <p>Precio: {dish.price} €</p>
            <p>{dish.isGlutenFree ? "Sin gluten" : "Contiene gluten"}</p>
        </div>
    )
}

export default DishCard