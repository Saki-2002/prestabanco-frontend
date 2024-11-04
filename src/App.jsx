import './App.css'
import {BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import NotFound from './components/NotFound';
import MCSimulation from './components/MCSimulation';
//import MCSimulation from './components/MCSimulation';


function App() {
  return (
    <Router>
          <div className="container">
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home/>} /> 
              <Route path="/simulation" element={<MCSimulation/>} />
              

              <Route path="*" element={<NotFound/>} />
              
              {/*}
              <Route path="/employee/list" element={<EmployeeList/>} />
              <Route path="/employee/add" element={<AddEditEmployee/>} />
              <Route path="/employee/edit/:id" element={<AddEditEmployee/>} />
              <Route path="/paycheck/list" element={<PaycheckList/>} />
              <Route path="/paycheck/calculate" element={<PaycheckCalculate/>} />
              <Route path="/reports/AnualReport" element={<AnualReport/>} />
              <Route path="/extraHours/list" element={<ExtraHoursList/>} />
              <Route path="/extraHours/add" element={<AddEditExtraHours/>} />
              <Route path="/extraHours/edit/:id" element={<AddEditExtraHours/>} />
              
              */}
            </Routes>
          </div>
      </Router>
  );
}

export default App;
