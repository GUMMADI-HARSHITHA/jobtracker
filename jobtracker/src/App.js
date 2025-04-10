import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import './App.css';
import Addapplication from './Components/Addapplication';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    // Redirect happens in Home component
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <div className="app">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        userEmail={userEmail} 
        onLogout={handleLogout} 
      />
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                isLoggedIn={isLoggedIn} 
                onLogin={handleLogin} 
                userEmail={userEmail}
              />
            } 
          />
          <Route path="/applications" element={<Addapplication />} />
           {/*<Route path="/add-application" element={<Jobapplication />} />*/}
        </Routes>
      </main>
    </div>
  );
}

export default App;