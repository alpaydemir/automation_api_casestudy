import { request, APIRequestContext, APIResponse, test } from "@playwright/test";
import { config } from "./config";
import { insertApiLog } from "../db/apiLogRepo";

class ApiClient {
  private contextPromise: Promise<APIRequestContext>;

  constructor() {
    this.contextPromise = request.newContext({
      baseURL: config.baseUrl,
    });
  }

  private async ctx(): Promise<APIRequestContext> {
    return this.contextPromise;
  }

  private async safeResponseBody(res: APIResponse): Promise<any> {
    try {
      return await res.json();
    } catch {
      return { _raw: await res.text() };
    }
  }

  private async logCall(params: {
    method: string;
    url: string;
    requestBody?: any;
    response: APIResponse;
  }): Promise<void> {
    const { method, url, requestBody, response } = params;


    const testName = test.info().title || "unknown_test";

    await insertApiLog({
      testName,
      method,
      url,
      requestBody: requestBody ?? null,
      statusCode: response.status(),
      responseBody: await this.safeResponseBody(response),
    });
  }

  async get(url: string): Promise<APIResponse> {
    const context = await this.ctx();
    const res = await context.get(url);
    await this.logCall({ method: "GET", url, response: res });
    return res;
  }

  async post(url: string, data: any): Promise<APIResponse> {
    const context = await this.ctx();
    const res = await context.post(url, { data });
    await this.logCall({ method: "POST", url, requestBody: data, response: res });
    return res;
  }

  async put(url: string, data: any): Promise<APIResponse> {
    const context = await this.ctx();
    const res = await context.put(url, { data });
    await this.logCall({ method: "PUT", url, requestBody: data, response: res });
    return res;
  }

  async patch(url: string, data: any): Promise<APIResponse> {
    const context = await this.ctx();
    const res = await context.patch(url, { data });
    await this.logCall({ method: "PATCH", url, requestBody: data, response: res });
    return res;
  }

  async delete(url: string): Promise<APIResponse> {
    const context = await this.ctx();
    const res = await context.delete(url);
    await this.logCall({ method: "DELETE", url, response: res });
    return res;
  }
}

export const apiClient = new ApiClient();
