function DashboardDishCard({ dish, onEdit, onDelete }) {
    return (
        <>
            <div className="dashboard-card">
                {dish.image && (
                    <img src={dish.image} alt={dish.name} className="card-image" />
                )}

                <h4>{dish.name}</h4>
                <p>{dish.description}</p>
                <p>{dish.price} €</p>
                <p>{dish.isGlutenFree ? "Sin gluten" : "Contiene gluten"}</p>

                <div className='card-actions'>
                    <button onClick={() => onEdit(dish._id)}>Editar</button>
                    <button onClick={() => onDelete(dish._id)}>Eliminar</button>
                </div>
            </div>
        </>
    )
}

export default DashboardDishCard