import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://vodiy-parfum-backend.vercel.app/api/v1/',
  timeout: 10000,
})