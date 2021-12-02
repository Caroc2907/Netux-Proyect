import { Link } from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
const Sidebar = () => {
    return(
        <div className= "sidebar">
            <ul>
                <li>
                    <Link to="/Inicio"><faIcons.FaHome className="me-3"/>Inicio</Link>
                </li>
                <li>
                    <Link to="/Paises"><faIcons.FaGlobeAmericas className="me-3"/>Paises</Link>
                </li>
                <li>
                <Link to="/Comparacion"><faIcons.FaBalanceScaleLeft className="me-3"/>Comparaciones</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar