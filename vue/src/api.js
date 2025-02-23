const API = "http://localhost:5184/api";

export async function getBooksByHouseId(houseId) {
  try {
    const response = await fetch(`${API}/books/house/${houseId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

export async function getBook(houseAddress, year, month, day) {
  try {
    const params = new URLSearchParams({ houseAddress, year, month, day });
    const response = await fetch(`${API}/books?${params}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch communication book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching communication book:', error);
    throw error;
  }
}

export async function getEntriesByBookId(bookId) {
  try {
    const response = await fetch(`${API}/entries/book/${bookId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch entries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw error;
  }
}

export async function getHouses() {
  try {
    const response = await fetch(`${API}/Houses`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch houses');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching houses:', error);
    throw error;
  }
}

export async function signUp(username, password, email) {
  try {
    const response = await fetch(`${API}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username,
        password,
        email,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error
  }
};

export async function login(username, password) {
  try {
    const response = await fetch(`${API}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username,
        password,
      })
    });
    // console.debug(response)


    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function validateToken() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API}/users/validate-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Token validation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Token validation error:', error);
    throw error;
  }
}

