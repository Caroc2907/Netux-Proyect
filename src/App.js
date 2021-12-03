import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Sidebar from '../src/components/Sidebar'
import './App.scss';
import COVIDSummary from './components/pages/CovidInformation';
import CountryInformation from './components/pages/CountryInformation';


function App() {
  return (
    <Router>
      <Navbar />
      <section className='flex'>
        <Sidebar />
        <menu className="Menu" >
        
        <Routes>
            <Route path="/" exact={true} element={<COVIDSummary/>} />
            <Route path="/Country-Information" exact={true} element={<CountryInformation/>} />
           
        </Routes>
        </menu>
      </section>
    </Router>
  );
}

export default App;
