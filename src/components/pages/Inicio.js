import { Link } from 'react-router-dom'

const Inicio = () => {
    return(
        <div>
            <p>Inicio</p>
            <table className="table table-striped table-hove">
                <thead>
                    <tr>
                        <th>País</th>
                        <th>ISO</th>
                    </tr>
                </thead>
            <tbody>
                <tr >
                
                    <td><Link to="/Paises">Colombia</Link></td>
                    <td>COL</td>
                </tr>
                <tr>
                <td><Link to="/Paises">Estado Unidos</Link></td>
                    <td>USA</td>
                </tr>
                <tr>
                <td><Link to="/Paises">Japón</Link></td>
                    <td>JPN</td>
                </tr>
            </tbody>
            </table>
        </div>
    )

}

export default Inicio