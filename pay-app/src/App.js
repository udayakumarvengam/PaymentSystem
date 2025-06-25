import './App.css';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Account';
import Login from './pages/Login';
import Payments from './pages/Payments';
import { Routes, Route } from 'react-router-dom';
import AddPayment from './pages/AddPayment';
import EditAccount from './pages/EditAccount';

function App() {
  return (
    <div className="App">
     <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/payment" element={<Payments/>}/>
       <Route path="/accounts" element={<Accounts/>}/>
       <Route path="/addpayment" element={<AddPayment/>}/>
       <Route path="/editaccount" element={<EditAccount/>}/>
     </Routes>
    </div>
  );
}

export default App;
