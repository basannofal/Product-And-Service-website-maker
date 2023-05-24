import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Root/Home';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import Login from '../Middleware/Login';
import Register from '../Middleware/Register';
import '../Assets/css/Style.css'
import '../Assets/css/Sidebar.css'
import AdminDashboard from '../Pages/Root/AdminDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
      </Routes>


      <Routes>
        <Route exact path='/dashboard/:id' element={
          <>
            <AdminDashboard />
          </>
        } />
      </Routes>

      <Routes>
        <Route path='/adminlogin' element={
          <>
            <Login />
          </>
        } />
      </Routes>


      {/* <Routes>
        <Route path='/adminregister' element={
          <>
            <Navbar />
            <Register />
            <Footer />
          </>
        } />
      </Routes> */}

    </>
  );
}

export default App;
