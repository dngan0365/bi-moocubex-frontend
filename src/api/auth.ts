import axiosInstance from './auth_axiosInstance'

interface AuthResponse {
  access_token: string;
    user: {
    id: string;
    username: string;
    email: string;
  };
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
    const response = await axiosInstance.post<AuthResponse>('/auth/signin', {
      email: email,
      password: password,
    });
    console.log('response ',response.data)
    console.log('Login response:', response.data.access_token);
    
    // Save token to localStorage for future requests
    localStorage.setItem('auth_token', response.data.access_token);
    
    return response.data;
  } catch (error) {
    // Handle specific error cases or rethrow
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/signup', {
      username: username,
      email: email,
      password: password,
    });
    console.log('Registration response:', response.data.access_token);
    
    // Save token to localStorage for future requests
    localStorage.setItem('auth_token', response.data.access_token);
    
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('auth_token');
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};