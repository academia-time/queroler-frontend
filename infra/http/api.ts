import axios from 'axios';
import { cookies } from 'next/headers';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('jwt')?.value;

  if (jwt) {
    config.headers.set?.('Authorization', `Bearer ${jwt}`);
  }

  return config;
});

export default api;
