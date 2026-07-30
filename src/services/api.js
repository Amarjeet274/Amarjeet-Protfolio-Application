const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.error('VITE_API_URL is not defined in environment variables');
}

class APIService {
  /**Make an API call with proper headers and error handling*/
  static async call(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.error || data.message || 'An error occurred',
          details: data.errors || data.details,
        };
      }

      return data;
    } catch (error) {
      if (error.status) {
        throw error; // Re-throw API errors
      }
      throw {
        status: 0,
        message: 'Network error. Please check your connection.',
        originalError: error,
      };
    }
  }

  /**
   * Get authorization headers if token exists
   */
  static getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * GET request
   */
  static get(endpoint) {
    return this.call(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  static post(endpoint, data) {
    return this.call(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  static put(endpoint, data) {
    return this.call(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  static delete(endpoint) {
    return this.call(endpoint, { method: 'DELETE' });
  }
}

export default APIService;
