import { Link } from "react-router-dom"

function Unauthorized() {
    return (
        <div className="page-container status-page">
            <h2>Acceso denegado</h2>
            <p>No tienes permisos para acceder a esta página</p>
            <p>Vuelve a inicio o inicia sesión con una cuenta que tenga acceso</p>

            <Link to="/">
                <button>Volver a Inicio</button>
            </Link>
        </div>
    )
}

export default Unauthorized