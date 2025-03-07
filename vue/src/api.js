const API = "https://api.shkf-ks.org/api";

const getToken = () => localStorage.getItem('authToken');

const createHeaders = () => {
  const token = getToken();
  if (token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }
  return {
    'Content-Type': 'application/json'
  };
};

const fetchData = async (url, options = {}) => {
  const headers = createHeaders();
  const mergedOptions = { ...options, headers };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Failed to fetch ${url}`);
  }
  return await response.json();
};

export async function getHouses() {
  try {
    return await fetchData(`${API}/Houses`);
  } catch (error) {
    console.error('Error fetching houses:', error);
    throw error;
  }
}

export async function getHouseById(id) {
  try {
    return await fetchData(`${API}/Houses/${id}`);
  } catch (error) {
    console.error('Error fetching house:', error);
    throw error;
  }
}

export async function getEntries(houseId, year, month, day, type) {
  const params = new URLSearchParams();

  if (houseId) params.append('houseId', houseId);
  if (year) params.append('year', year);
  if (month) params.append('month', month);
  if (day) params.append('day', day);
  if (type) params.append('type', type);

  try {
    return await fetchData(`${API}/Entries?${params}`);
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw error;
  }
}

export async function updateEntries(entries) {
  try {
    return await fetchData(`${API}/Entries/UpdateEntries`, {
      method: 'POST',
      body: JSON.stringify(entries),
    });
  } catch (error) {
    console.error('Error updating entries:', error);
    throw error;
  }
}

export async function deleteEntries(ids) {
    try {
        console.log(ids)
        const params = new URLSearchParams();
        ids.forEach(id => params.append('ids', id));
        console.log(params)

        await fetchData(`${API}/Entries?${params}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Error deleting entries:', error);
        // throw error;
    }
}

export async function signUp(username, password, email, houseId, todayOnly) {
  try {
    return await fetchData(`${API}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        password,
        email,
        houseId,
        todayOnly
      })
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function validateToken() {
  try {
    return await fetchData(`${API}/users/validate-token`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Token validation error:', error);
    throw error;
  }
}
