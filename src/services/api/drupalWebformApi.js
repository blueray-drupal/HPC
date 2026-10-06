import { getApiBaseUrl } from '@/lib/env.js';
import { drupalApi } from './axios.config.js';

export async function fetchWebformElements(webformId, lang) {
  const { data } = await drupalApi.get(`${getApiBaseUrl(lang)}/webform_rest/${webformId}/elements`);
  return data;
}

export async function submitWebform(webformId, payload, lang) {
  const { data } = await drupalApi.post(`${getApiBaseUrl(lang)}/webform_rest/submit`, {
    webform_id: webformId,
    ...payload,
  });
  return data;
}

export async function submitWebformWithFile(webformId, payload, fileData, lang) {
  const formData = new FormData();
  formData.append('webform_id', webformId);

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (fileData?.field && fileData?.file) {
    formData.append(fileData.field, fileData.file);
  }

  const { data } = await drupalApi.post(`${getApiBaseUrl(lang)}/webform_rest/submit`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
}
