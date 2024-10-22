import { useState, useEffect, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './screens/Dashboard/Dashboard';
import LoginPage from './screens/LoginPage/Login';
import CopyJourney from './screens/CopyEventJourney/CopyEventJourney';
import { Route, Routes } from 'react-router-dom';
import { FormContext } from './utils/formContext';
import NoLayout from './components/NoLayout/NoLayout';
import MainLayout from './components/MainLayout/MainLayout';
import SuccessPage from './screens/SuccessPage/SuccessPage';

function App() {
  // const [events, setEvents] = useState([]);

  const { setEvents, setAccounts } = useContext(FormContext);

  console.log({ setEvents });
  async function myFun() {
    const result = await fetch('http://localhost:3001/events');
    const data = await result.json();
    setEvents(data);

    const accresult = await fetch('http://localhost:3001/accounts');
    const accdata = await accresult.json();

    setAccounts(accdata);
  }

  useEffect(() => {
    myFun();
  }, []);

  return (
    <>
      <div className=''>
        <Routes>
          <Route element={<NoLayout />}>
            <Route path='/' element={<LoginPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route element={<Dashboard />} path='/dashboard' />
            <Route element={<CopyJourney />} path='/event/copy' />
            <Route element={<SuccessPage />} path='/success' />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
