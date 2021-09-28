import faker from 'faker';

import { RemoteGetChampionForYear } from '@/data/usecases';
import { HttpStatusCode } from '@/data/protocols/http';

import { UnexpectedError } from '@/domain/errors';

import { HttpClientSpy, mockRemoteGetChampionForYearModel } from '@/tests/data/mocks';

type SutTypes = {
  sut: RemoteGetChampionForYear
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteGetChampionForYear(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteGetChampionForYear', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
  
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteGetChampionForYearModel()
    }

    await sut.getChampionForYear();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('GET');
  })


  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
  
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.getChampionForYear();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
  
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.getChampionForYear();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should return a ChampionForYear on 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteGetChampionForYearModel()
  
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.getChampionForYear();

    expect(httpResponse).toEqual({
      MRData: {
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
})
