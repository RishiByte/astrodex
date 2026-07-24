export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

export async function api<T>(endpoint: string, config?: RequestConfig): Promise<T> {
  let url = endpoint;
  
  if (config?.params) {
    const searchParams = new URLSearchParams(config.params);
    url += `?${searchParams.toString()}`;
  }

  // Sandbox the REST API wrapper (#446)
  try {
    const response = await fetch(url, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("[REST API Wrapper] Sandboxed Error:", error);
    throw error;
  }
}
