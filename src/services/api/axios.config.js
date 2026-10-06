import axios from 'axios';
import { getDrupalBaseUrl, useDrupalApiProxy } from '@/lib/env.js';

export const DRUPAL_BASE_URL = useDrupalApiProxy() ? '/api' : getDrupalBaseUrl();

export const drupalApi = axios.create({
  baseURL: DRUPAL_BASE_URL,
  headers: {
    Accept: 'application/vnd.api+json',
  },
});
