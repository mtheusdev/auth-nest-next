export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  async post<T>(
    url: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
    });
  }

  async put<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
    });
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      credentials: "include", // Para enviar e receber cookies
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Verificar se o corpo está vazio
    const text = await response.text();
    return text ? JSON.parse(text) : undefined;
  }
}

// Cliente HTTP configurado para seu backend
export const apiClient = new HttpClient(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
);
