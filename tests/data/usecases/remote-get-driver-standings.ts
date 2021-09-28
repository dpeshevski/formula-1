import faker from 'faker';

import { RemoteGetDriverStandings } from '@/data/usecases';
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { HttpClientSpy, mockRemoteGetDriverStandingsModel } from '@/tests/data/mocks';

type SutTypes = {
  sut: RemoteGetDriverStandings;
  httpClientSpy: HttpClientSpy<RemoteGetDriverStandings.Model>;
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteGetDriverStandings.Model>()
  const sut = new RemoteGetDriverStandings(url, httpClientSpy);

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteGetDriverStandings', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();

    const { sut, httpClientSpy } = makeSut(url);

    await sut.getDriverStandings();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('GET');
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.getDriverStandings();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should return a list of DriverStandingsModel if HttpClient returns 200', async () => {
    const { sut, httpClientSpy} = makeSut();
    const httpResponse = mockRemoteGetDriverStandingsModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponse
    }

    const driverStandings = await sut.getDriverStandings();

    expect(driverStandings).toEqual({
      MRData: {
        xmlns: httpResponse.MRData.xmlns,
        series: httpResponse.MRData.series,
        url: httpResponse.MRData.url,
        limit: httpResponse.MRData.limit,
        offset: httpResponse.MRData.offset,
        total: httpResponse.MRData.total,
        StandingsTable: {
        season: httpResponse.MRData.StandingsTable.season,
        driverStandings: httpResponse.MRData.StandingsTable.driverStandings,
        StandingsLists:
          [{
            season: httpResponse.MRData.StandingsTable.StandingsLists[0].season,
            round: httpResponse.MRData.StandingsTable.StandingsLists[0].round,
            DriverStandings:
              [{
                position: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position,
                positionText: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].positionText,
                points: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points,
                wins: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].wins,
                Driver: {
                  driverId: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId,
                  permanentNumber: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.permanentNumber,
                  code: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.code,
                  url: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.url,
                  givenName: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName,
                  familyName: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName,
                  dateOfBirth: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.dateOfBirth,
                  nationality: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.nationality,
                },
                Constructors:
                  [{
                  constructorId: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].constructorId,
                  url: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].url,
                  name: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].name,
                  nationality: httpResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].nationality,
                }]
              }]
          }]
        },
      },
    })
  })

  test('Should return an empty list if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const driverStandingsLists = await sut.getDriverStandings();

    expect(driverStandingsLists).toEqual([])
  })
})

