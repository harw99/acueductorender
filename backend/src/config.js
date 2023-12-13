import { config } from 'dotenv';
config();

export const VITE_API_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

export const URI_MONGO = process.env.URI_MONGO;

export const PORT = 3000;
export const HOST = `http://localhost:${PORT}`;

export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;