import { GetResultsForYear } from '@/domain/usecases';

export const mockGetResultsForYearModel = (): GetResultsForYear.Model => ({
  MRData: {
    RaceTable: {
      season: "2015",
      position: "1",
      Races: [
        {
          season: "2015",
          round: "1",
          url: "http://en.wikipedia.org/wiki/2015_Australian_Grand_Prix",
          raceName: "Australian Grand Prix",
          Circuit: {
            circuitId: "albert_park",
            url: "http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
            circuitName: "Albert Park Grand Prix Circuit",
            Location: {
              lat: "-37.8497",
              long: "144.968",
              locality: "Melbourne",
              country: "Australia"
            }
          },
          date: "2015-03-15",
          time: "05:00:00Z",
          Results: [
            {
              number: "44",
              position: "1",
              positionText: "1",
              points: "25",
              Driver: {
                driverId: "hamilton",
                permanentNumber: "44",
                code: "HAM",
                url: "http://en.wikipedia.org/wiki/Lewis_Hamilton",
                givenName: "Lewis",
                familyName: "Hamilton",
                dateOfBirth: "1985-01-07",
                nationality: "British"
              },
              Constructor: {
                constructorId: "mercedes",
                url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
                name: "Mercedes",
                nationality: "German"
              },
              grid: "1",
              laps: "58",
              status: "Finished",
              Time: {
                millis: "5514067",
                time: "1:31:54.067"
              },
              FastestLap: {
                rank: "1",
                lap: "50",
                Time: {
                  time: "1:30.945"
                },
                AverageSpeed: {
                  units: "kph",
                  speed: "209.915"
                }
              }
            }
          ]
        },
      ]
    }
  }
})

export class GetResultsForYearSpy implements GetResultsForYear {
  results = mockGetResultsForYearModel();
  callsCount = 0;

  async getResultsForYear (): Promise<GetResultsForYear.Model> {
    this.callsCount++;
    return this.results;
  }
}