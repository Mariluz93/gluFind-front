import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="page-container status-page">
            <h2>Página no encontrada</h2>
            <p>La página que busca no existe o no está disponible</p>

            <Link to="/">
                <button>Ir a Inicio</button>
            </Link>
        </div>
    )
}

export default NotFound