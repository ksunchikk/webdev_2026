export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const BASE_URL = "https://dummyjson.com";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, init);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Ошибка ${response.status} по запросу ${path}`
    );
  }

  return (await response.json()) as T;
}
