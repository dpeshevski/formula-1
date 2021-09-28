import faker from 'faker';

import { RemoteGetResultsForYear } from '@/data/usecases';
import { HttpStatusCode } from '@/data/protocols/http';

import { UnexpectedError } from '@/domain/errors';

import { HttpClientSpy, mockRemoteGetResultsForYearModel } from '@/tests/data/mocks';


type SutTypes = {
  sut: RemoteGetResultsForYear
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteGetResultsForYear(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteGetResultsForYear', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
  
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteGetResultsForYearModel()
    }

    await sut.getResultsForYear();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('GET');
  })


  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
  
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.getResultsForYear();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
  
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.getResultsForYear();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should return a ResultsForYear on 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteGetResultsForYearModel();
  
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.getResultsForYear();

    expect(httpResponse).toEqual({
      MRData: {
        RaceTable: {
          Races: [{
            season: httpResponse.MRData.RaceTable.Races[0].season,
            round: httpResponse.MRData.RaceTable.Races[0],
            url: httpResponse.MRData.RaceTable.Races[0],
            raceName: httpResponse.MRData.RaceTable.Races[0],
            Circuit: {
              circuitId: httpResponse.MRData.RaceTable.Races[0].Circuit.circuitId,
              url: httpResponse.MRData.RaceTable.Races[0].Circuit.url,
              circuitName: httpResponse.MRData.RaceTable.Races[0],
              Location: {
                lat: httpResponse.MRData.RaceTable.Races[0].Circuit.Location.lat,
                long: httpResponse.MRData.RaceTable.Races[0].Circuit.Location.long,
                locality: httpResponse.MRData.RaceTable.Races[0].Circuit.Location.locality,
                country: httpResponse.MRData.RaceTable.Races[0].Circuit.Location.country
              },
            },
            date: httpResponse.MRData.RaceTable.Races[0].date,
            time: httpResponse.MRData.RaceTable.Races[0].time,
            Results: [{
              number: httpResponse.MRData.RaceTable.Races[0].Results[0].number,
              position: httpResponse.MRData.RaceTable.Races[0].Results[0].position,
              positionText: httpResponse.MRData.RaceTable.Races[0].Results[0].positionText,
              points: httpResponse.MRData.RaceTable.Races[0].Results[0].points,
              Driver: {
                driverId: httpResponse.MRData.RaceTable.Races[0].Results[0].Driver.driverId,
                permanentNumber: httpResponse.MRData.RaceTable.Races[0].Results[0].Driver.permanentNumber,
                code: httpResponse.MRData.RaceTable.Races[0].Results[0].Driver.code,
                url: httpResponse.MRData.RaceTable.Races[0].Results[0].Driver.url,
                givenName: httpResponse.MRData.RaceTable.Races[0].Results[0].Driver.givenName,
                familyName: httpResponse.MRData.RaceTable.Races[0].Results[0].Driver.familyName,
                dateOfBirth: httpResponse.MRData.RaceTable.Races[0].Results[0].Driver.dateOfBirth,
                nationality: httpResponse.MRData.RaceTable.Races[0].Results[0].Driver.nationality,
              },
              Constructor: {
                constructorId: httpResponse.MRData.RaceTable.Races[0].Results[0].Constructor.constructorId,
                url: httpResponse.MRData.RaceTable.Races[0].Results[0].Constructor.url,
                name: httpResponse.MRData.RaceTable.Races[0].Results[0].Constructor.name,
                nationality: httpResponse.MRData.RaceTable.Races[0].Results[0].Constructor.nationality,
              },
              grid: httpResponse.MRData.RaceTable.Races[0].Results[0].grid,
              laps: httpResponse.MRData.RaceTable.Races[0].Results[0].laps,
              status: httpResponse.MRData.RaceTable.Races[0].Results[0].status,
              Time: {
                millis: httpResponse.MRData.RaceTable.Races[0].Results[0].Time.millis,
                time: httpResponse.MRData.RaceTable.Races[0].Results[0].Time.time,
              },
              FastestLap: {
                rank: httpResponse.MRData.RaceTable.Races[0].Results[0].FastestLap.rank,
                lap: httpResponse.MRData.RaceTable.Races[0].Results[0].FastestLap.lap,
                Time: {
                  millis: httpResponse.MRData.RaceTable.Races[0].Results[0].FastestLap.Time.millis,
                  time: httpResponse.MRData.RaceTable.Races[0].Results[0].FastestLap.Time.time,
                },
                AverageSpeed: {
                  units: httpResponse.MRData.RaceTable.Races[0].Results[0].FastestLap.AverageSpeed.units,
                  speed: httpResponse.MRData.RaceTable.Races[0].Results[0].FastestLap.AverageSpeed.speed,
                }
              }
            }
            ]
          }]
        }
      },
    })
  })
})
