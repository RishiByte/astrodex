/**
 * AstroDex REST API Wrapper
 * 
 * Provides a standardized wrapper around the browser's native `fetch` API.
 * Automatically handles common headers, JSON serialization/deserialization,
 * and robust error throwing for non-2xx status codes.
 */

/**
 * Standard configuration options for API requests.
 */
interface RequestConfig extends RequestInit {
  /** Optional params object to serialize into the URL query string */
  params?: Record<string, string>;
}

/**
 * Core API wrapper function.
 * 
 * @template T The expected return type of the JSON response payload.
 * @param {string} endpoint - The API endpoint to fetch (relative or absolute URL).
 * @param {RequestConfig} [config] - Additional fetch configuration and query parameters.
 * @returns {Promise<T>} A promise that resolves to the typed response data.
 * @throws {Error} Throws an error if the network request fails or if the response status is not OK (2xx).
 * 
 * @example
 * // Fetch a list of neo objects
 * const data = await api<NeoData[]>("/api/neos", { method: "GET" })
 */
export async function api<T>(endpoint: string, config?: RequestConfig): Promise<T> {
  let url = endpoint;
  
  if (config?.params) {
    const searchParams = new URLSearchParams(config.params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
