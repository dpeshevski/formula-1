import faker from 'faker';

import { RemoteGetDriverStandings } from '@/data/usecases';

export const mockRemoteGetDriverStandingsModel = (): RemoteGetDriverStandings.Model => ({
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