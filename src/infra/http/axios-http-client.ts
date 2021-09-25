import axios, { AxiosError, AxiosResponse } from 'axios';

import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http';

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      response = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (e: any) {
      response = e.message;
    }

    return {
      statusCode: response.status,
      body: response.data,
    }
  }
}
