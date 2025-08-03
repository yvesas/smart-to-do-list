/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export class ApiService {
  private api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  public get = async (url: string) => {
    const response = await this.api.get(url);
    return response.data;
  };

  public post = async (url: string, data: any) => {
    const response = await this.api.post(url, data);
    return response.data;
  };

  public patch = async (url: string, data: any) => {
    const response = await this.api.patch(url, data);
    return response.data;
  };

  public delete = async (url: string) => {
    await this.api.delete(url);
  };
}
