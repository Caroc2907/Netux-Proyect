import { Link } from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
const Sidebar = () => {
    return(
        <section className= "sidebar">
            <ul>
                <li>
                    <Link to="/"><faIcons.FaHome className="me-3"/>COVID Summary</Link>
                </li>
                <li>
                    <Link to="/Country-Information?iso3=COL"><faIcons.FaGlobeAmericas className="me-3"/>Country Information</Link>
                </li>
            </ul>
        </section>
    )
}

export default Sidebar