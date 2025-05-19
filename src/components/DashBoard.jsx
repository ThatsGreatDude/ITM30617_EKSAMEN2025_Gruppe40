import React, { useState } from 'react';
import '../Styling/DashBoard.css';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Ikke krav til reell innlogging.
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert('Vennligst fyll ut begge feltene');
    }
  };

  return (
    <div className="dashboard-container">
      {isLoggedIn ? (
        <div>
          <h1>Velkommen, {username}!</h1>
          <p>Du er nå logget inn.</p>
        </div>
      ) : (
        <div>
          <h1>Logg Inn</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Brukernavn:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Skriv inn brukernavn"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Passord:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Skriv inn passord"
                required
              />
            </div>
            <button type="submit">Logg Inn</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;