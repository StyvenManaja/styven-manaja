import React, { useEffect, useState } from 'react';
import { logoutUser, getProtectedData } from '../components/api';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProtectedData();
        setUserData(data);
      } catch (err) {
        setError('Accès refusé. Redirection...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      {error && <p className="error">{error}</p>}
      {userData ? (
        <div>
    <div className="dashboard-container">
      <header className="dashboard-header">
        <a href="/" className="back-link">← Retour au site</a>
        <h1>Bienvenue, {userData.username || 'utilisateur'} !</h1>
        <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
      </header>

      <main className="admin-actions">
        <div className="action-card">
          <h2>Créer un post</h2>
          <button className="action-btn">+</button>
        </div>
        <div className="action-card">
          <h2>Modifier un post</h2>
          <button className="action-btn">+</button>
        </div>
        <div className="action-card">
          <h2>Supprimer un post</h2>
          <button className="action-btn">+</button>
        </div>
      </main>

      <footer>
        <p>© 2025 Admin Dashboard</p>
      </footer>
    </div>
        </div>
      ) : (
        !error && <p>Chargement des données...</p>
      )}
    </div>
  );
}

export default Dashboard;
