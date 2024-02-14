import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import  MainPage from './Pages/mainPage';
import  SinglePage from './Pages/singlePage';
import EditPage from './Pages/editPage';
import Popup from 'reactjs-popup';
import valtozo from './valtozo';
import { useState } from 'react';
import CreatePage from './Pages/createPage';
import { Link } from 'react-router-dom';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginButton = () => {
    if (username === 'admin' && password === 'admin') {
      valtozo.admin = true;
    }
  }

  return (
    <Router>
      <div>
          <nav className="navbar px-3 navbar-expand-lg navbar-dark bg-dark">
              <Link className="navbar-brand" to="/">Hotel</Link>

              {
                valtozo.admin ? 
                <Link className="navbar-brand" to="/create">Create</Link> 
                : 
                null
              }

              <Popup trigger={<button className="btn btn-primary ml-auto">Login</button>} position="left top">
                <div className="login-popup">      
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={loginButton}>Login</button>
                </div>
              </Popup>
          </nav>

          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/:id" element={<SinglePage />} />
              <Route path="/edit/:id" element={<EditPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="*" element={<MainPage />} />
          </Routes>
      </div>
  </Router>
  );
}

export default App;
