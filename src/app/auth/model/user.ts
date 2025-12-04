export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  phone?: string;
  address?: string;
}


export interface LoginResponse {
  access_token: string;
  user: User;
}


export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}
