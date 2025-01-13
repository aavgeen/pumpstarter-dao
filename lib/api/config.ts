export const API_CONFIG = {
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.pumpstarter.dao',
  API_VERSION: 'v1',
}

export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.API_BASE_URL}/${API_CONFIG.API_VERSION}${path}`
} 