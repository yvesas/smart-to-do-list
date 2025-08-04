import axios, { AxiosError } from "axios";

export class ApiService {
  private api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor() {
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const message = (error.response?.data as { message: string })?.message || error.message;
        return Promise.reject(new Error(message));
      }
    );
  }

  public get = async <T>(url: string): Promise<T> => {
    const response = await this.api.get<T>(url);
    return response.data;
  };

  public post = async <T>(url: string, data: unknown): Promise<T> => {
    const response = await this.api.post<T>(url, data);
    return response.data;
  };

  public patch = async <T>(url: string, data: unknown): Promise<T> => {
    const response = await this.api.patch<T>(url, data);
    return response.data;
  };

  public delete = async <T>(url: string): Promise<T> => {
    const response = await this.api.delete<T>(url);
    return response.data;
  };
}
