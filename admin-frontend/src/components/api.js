const BASE_URL = 'http://localhost:8080/api';

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error((await response.json()).message);
  return await response.json();
}

export async function getProtectedData() {
    const response = await fetchWithRefresh('/user');

    if (!response.ok) {
      throw new Error('Non autorisé');
    }
  
    return await response.json();
}

export async function logoutUser() {
  await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function fetchWithRefresh(url, options = {}) {
    let response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      credentials: 'include',
    });
  
    // Si token expiré
    if (response.status === 401) {
      // Tente refresh
      const refreshResponse = await fetch(`${BASE_URL}/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
  
      if (refreshResponse.ok) {
        // Rejoue la requête d'origine après refresh
        response = await fetch(`${BASE_URL}${url}`, {
          ...options,
          credentials: 'include',
        });
      } else {
        throw new Error('Session expirée');
      }
    }
  
    return response;
  }
  