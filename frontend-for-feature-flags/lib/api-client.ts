const API_BASE_URL = 'http://localhost:8080';

export interface FeatureFlag {
  key: string;
  description: string;
  enabled: boolean;
  updatedAt: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const flagsApi = {
  // Get all flags
  getFlags: async (): Promise<FeatureFlag[]> => {
    const response = await fetch(`${API_BASE_URL}/api/flags`);
    const data = await handleResponse<FeatureFlag[]>(response);
    return Array.isArray(data) ? data : [];
  },

  // Create a new flag
  createFlag: async (flag: Omit<FeatureFlag, 'createdAt' | 'updatedAt'>): Promise<FeatureFlag> => {
    const response = await fetch(`${API_BASE_URL}/api/flags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flag),
    });
    return handleResponse<FeatureFlag>(response);
  },

  // Update a flag
  updateFlag: async (key: string, flag: Partial<FeatureFlag>): Promise<FeatureFlag> => {
    const response = await fetch(`${API_BASE_URL}/api/flags/${key}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flag),
    });
    return handleResponse<FeatureFlag>(response);
  },

  // Toggle a flag
  toggleFlag: async (key: string, enabled: boolean): Promise<FeatureFlag> => {
    const response = await fetch(`${API_BASE_URL}/api/flags/${key}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    });
    return handleResponse<FeatureFlag>(response);
  },

  // Check health
  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/health`);
      return response.ok;
    } catch {
      return false;
    }
  },
};
