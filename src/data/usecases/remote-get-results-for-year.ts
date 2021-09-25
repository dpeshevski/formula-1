import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { RemoteGetResultsForYearModel } from '@/data/models';

import { UnexpectedError } from '@/domain/errors';
import { GetResultsForYear } from '@/domain/usecases';

export class RemoteGetResultsForYear implements GetResultsForYear {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetResultsForYear.Model[]>
  ) {}

  async getResultsForYear(): Promise<RemoteGetResultsForYear.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET'
    })

    const remoteResults = httpResponse.body || [];
    
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteResults;
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError;
    }
  }
}

export namespace RemoteGetResultsForYear {
  export type Model = RemoteGetResultsForYearModel;
}