import axios from 'axios';

export const liveStatusdb = axios.create({ baseURL: 'http://localhost:3001/live-status' });

export const tempChannelsdb = axios.create({ baseURL: 'http://localhost:3001/temp-channels' });
