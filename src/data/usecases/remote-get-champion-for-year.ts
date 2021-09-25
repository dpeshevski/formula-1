import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { RemoteGetChampionForYearModel } from '@/data/models';

import { UnexpectedError } from '@/domain/errors';
import { GetChampionForYear } from '@/domain/usecases';

export class RemoteGetChampionForYear implements GetChampionForYear {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetChampionForYear.Model>
  ) {}

  async getChampionForYear(): Promise<GetChampionForYear.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
    })

    const remoteChampion = httpResponse.body || {} as GetChampionForYear.Model;
    
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteChampion;
      default:
        throw new UnexpectedError;
    }
  }
}

export namespace RemoteGetChampionForYear {
  export type Model = RemoteGetChampionForYearModel;
}