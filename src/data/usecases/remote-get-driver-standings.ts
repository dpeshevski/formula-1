import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { RemoteGetDriverStandingsModel } from '@/data/models';

import { UnexpectedError } from '@/domain/errors';
import { GetDriverStandings } from '@/domain/usecases';

export class RemoteGetDriverStandings implements GetDriverStandings {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetDriverStandings.Model>
  ) {}

  async getDriverStandings(): Promise<GetDriverStandings.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
    })

    const remoteDriverStandings = httpResponse.body || {} as GetDriverStandings.Model;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteDriverStandings;
      case HttpStatusCode.noContent:
        return {} as GetDriverStandings.Model;
      default:
        throw new UnexpectedError
    }
  }
}

export namespace RemoteGetDriverStandings {
  export type Model = RemoteGetDriverStandingsModel;
}