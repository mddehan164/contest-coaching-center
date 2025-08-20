// src/services/authService.js
import api, { getCsrfToken } from "../../api/axiosInstance";
import Cookies from "js-cookie";

export const authService = {
  // Login user
  async login(credentials) {
    try {
      // Get CSRF token first
      await getCsrfToken();
      
      const response = await api.post('/auth/login', credentials);
      
      if (response.status === 200 || response.status === 201) {
        const { user, access_token, refresh_token } = response.data.data;
        
        // Store tokens in cookies (more secure than localStorage)
        if (access_token) {
          Cookies.set('access_token', access_token, { 
            expires: 1, // 1 day
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
        
        if (refresh_token) {
          Cookies.set('refresh_token', refresh_token, { 
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
        
        return {
          success: true,
          data: { user, access_token, refresh_token },
          message: response.data.message || "Login successful"
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again."
      };
    }
  },

  // Logout user
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {

    } finally {
      // Clear all tokens regardless of API response
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      // Clear any Laravel session cookies
      Cookies.remove('laravel_session');
      Cookies.remove('XSRF-TOKEN');
    }
  },

// register user
  async register(credentials) {
    try {
      const response = await api.post('/auth/register', credentials);
      if (response.status === 201) {
        return {
          success: true,
          message: response.data.message || "Registration successful"
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again."
      };
    }
  },

  // Check if user is authenticated
  async checkAuth() {
    try {
      await getCsrfToken();
      const response = await api.get("/auth/me");
      
      if (response.status === 200) {
        return {
          success: true,
          user: response.data.data.user
        };
      }
    } catch (error) {
      // If auth check fails, clear any stale tokens
      this.clearTokens();
      return {
        success: false,
        error: error.response?.data?.message || "Authentication failed"
      };
    }
  },

  // Refresh access token
  async refreshToken() {
    try {
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', {
        refresh_token: refreshToken
      });

      if (response.status === 200) {
        const { access_token } = response.data.data;
        
        Cookies.set('access_token', access_token, { 
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        return { success: true, access_token };
      }
    } catch (error) {
      this.clearTokens();
      return { success: false };
    }
  },

  // Clear all tokens
  clearTokens() {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('laravel_session');
    Cookies.remove('XSRF-TOKEN');
  },

  // Get access token
  getAccessToken() {
    return Cookies.get('access_token');
  },

  // Check if user has valid token
  isAuthenticated() {
    return !!this.getAccessToken();
  }
};
