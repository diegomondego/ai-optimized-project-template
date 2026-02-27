/**
 * api-client.ts
 *
 * Typed HTTP client for calling external APIs.
 * Shared across all features — extract here only when 2+ features need it.
 *
 * Features should not call fetch() directly. They use this client,
 * which handles base URL, auth headers, and error parsing consistently.
 */

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiClientOptions {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

interface RequestOptions {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

/**
 * Generic API error with status code and parsed body.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
    message?: string
  ) {
    super(message ?? `API error: ${status}`);
    this.name = "ApiError";
  }
}

/**
 * Create a typed API client bound to a base URL.
 *
 * @example
 * const client = createApiClient({ baseUrl: "https://api.example.com" });
 * const user = await client.get<User>("/users/123");
 */
export function createApiClient(options: ApiClientOptions) {
  const { baseUrl, defaultHeaders = {} } = options;

  async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {}, signal } = opts;

    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new ApiError(res.status, errorBody);
    }

    // Handle 204 No Content
    if (res.status === 204) return undefined as T;

    return res.json() as Promise<T>;
  }

  return {
    get: <T>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
      request<T>(path, { ...opts, method: "GET" }),
    post: <T>(path: string, body: unknown, opts?: Omit<RequestOptions, "method">) =>
      request<T>(path, { ...opts, method: "POST", body }),
    put: <T>(path: string, body: unknown, opts?: Omit<RequestOptions, "method">) =>
      request<T>(path, { ...opts, method: "PUT", body }),
    patch: <T>(path: string, body: unknown, opts?: Omit<RequestOptions, "method">) =>
      request<T>(path, { ...opts, method: "PATCH", body }),
    delete: <T>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
      request<T>(path, { ...opts, method: "DELETE" }),
  };
}
