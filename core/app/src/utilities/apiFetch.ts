const API_BASE_URL = 'http://localhost:3000';

/**
 * Options for making API requests using `apiFetch`.
 */
interface FetchOptions {
    /**
     * HTTP method to use for the request.
     * Defaults to 'GET' if not specified.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';

    /**
     * The request body, which will be stringified as JSON.
     * Should be an object or array that can be converted to JSON.
     * Only applicable for methods like 'POST' and 'PUT'.
     */
    body?: unknown;

    /**
     * Authentication token to be included in the request headers.
     * If provided, it will be set as a Bearer token in the Authorization header.
     */
    token?: string;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { method = 'GET', body, token } = options;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // Auth token
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions: RequestInit = {
        method,
        headers,
    };

    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error ${response.status}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`API Fetch Error: ${(error as Error).message}`);
        throw error;
    }
}