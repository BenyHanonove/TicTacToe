import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://cd30-2001-4df7-3-538b-fb59-aba7-10af-263.ngrok-free.app'
});
