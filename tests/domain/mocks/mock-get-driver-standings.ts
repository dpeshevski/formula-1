import faker from 'faker';

import { GetDriverStandings } from '@/domain/usecases';

export const mockGetDriverStandingsModel = (): GetDriverStandings.Model => ({
  MRData: {
    xmlns: faker.random.word(),
    series: faker.random.word(),
    url: faker.internet.url(),
    limit: faker.random.word(),
    offset: faker.random.word(),
    total: faker.random.word(),
    StandingsTable:
      {
        season: faker.random.word(),
        driverStandings: faker.random.word(),
        StandingsLists:
          [{
            season: faker.random.word(),
            round: faker.random.word(),
            DriverStandings:
              [{
                position: faker.random.word(),
                positionText: faker.random.word(),
                points: faker.random.word(),
                wins: faker.random.word(),
                Driver: {
                  driverId: faker.random.word(),
                  permanentNumber: faker.random.word(),
                  code: faker.random.word(),
                  url: faker.internet.url(),
                  givenName: faker.random.word(),
                  familyName: faker.random.word(),
                  dateOfBirth: faker.random.word(),
                  nationality: faker.random.word(),
                },
                Constructors:
                  [{
                  constructorId: faker.random.word(),
                  url: faker.internet.url(),
                  name: faker.random.word(),
                  nationality: faker.random.word(),
                }]
              }]
          }]
    },
  },
})

export class GetDriverStandingsSpy implements GetDriverStandings {
  driverStandings = mockGetDriverStandingsModel();
  callsCount = 0;

  async getDriverStandings (): Promise<GetDriverStandings.Model> {
    this.callsCount++;
    return this.driverStandings;
  }
}