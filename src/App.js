import { BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Sidebar from '../src/components/Sidebar'
import Inicio from '../src/components/pages/Inicio'
import Paises from '../src/components/pages/Paises'
import Comparacion from '../src/components/pages/Comparacion'
import './App.scss';


function App() {
  return (
    <Router>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div className="content" >
        
        <Routes>
            <Route path="/Inicio" exact={true} element={<Inicio/>} />
            <Route path="/Paises" exact={true} element={<Paises/>} />
            <Route path="/Comparacion" exact={true} element={<Comparacion/>} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
