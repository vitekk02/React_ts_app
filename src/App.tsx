import React, {useState, useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import IUser from './types/userType';


import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Header from './Components/Header';
import LoginPage from './Pages/LoginPage';
import { getCurrentUser } from './services/auth';
import Body from './Components/Body';

function App() {


  const [currentUser, setUser] = useState<IUser>(getCurrentUser())




  return (

    <div className="App">
      
    <Router>
          <Header user={currentUser}/>
          <Body user={currentUser}/>
    </Router>
      </div>

    );
}

export default App;
