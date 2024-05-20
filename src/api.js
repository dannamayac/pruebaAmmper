const apiBaseUrl = 'https://sandbox.belvo.com';
const authBaseUrl = 'https://c5ba-3-23-206-17.ngrok-free.app/api';
const secretId = '1fd2b43b-4253-41ac-be8b-4f28f0e5c2ba';
const secretPassword = 'b6lSF8WK1vIdba*#r0xWjiPhYCGTsj0jXMs_HVdvi8ePOJTnud*3u47cKS7Yvpoy';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${btoa(`${secretId}:${secretPassword}`)}`,
};

const handleResponse = async (response) => {
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  } catch (error) {
    console.error("Error parsing JSON:", text);
    throw error;
  }
};

// Función para el login
export const login = async (email, password) => {
  try {
    const response = await fetch(`${authBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);
    const { token } = data;

    // Guardar el token en localStorage
    localStorage.setItem('authToken', token);

    return token;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Función para el registro
export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${authBaseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const getBanks = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/institutions/`, { headers });
    const data = await handleResponse(response);
    return data.results;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getBankDetails = async (bankId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/institutions/${bankId}/`, { headers });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const createLink = async (institution, username, password, resources) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/links/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        institution,
        username,
        password,
        external_id: "security-testing",
        access_mode: "single",
        credentials_storage: "5d",
        stale_in: "30d",
        fetch_resources: resources,
      }),
    });
    const data = await handleResponse(response);
    return data.id;
  } catch (error) {
    console.error("Error creating link:", error);
    throw error;
  }
};

export const fetchAccounts = async (linkResponseId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/accounts/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: linkResponseId,
        save_data: true,
      }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const getAccounts = async (linkId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/accounts/?link=${linkId}`, { headers });
    const data = await handleResponse(response);
    return data.results;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getAccountDetails = async (accountId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/accounts/${accountId}/`, { headers });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getTransactions = async (linkId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/transactions/?link=${linkId}`, { headers });
    const data = await handleResponse(response);
    return data.results;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};