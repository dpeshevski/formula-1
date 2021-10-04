import faker from 'faker';

import { RemoteGetResultsForYear } from '@/data/usecases';

export const mockRemoteGetResultsForYearModel = (): RemoteGetResultsForYear.Model => ({
  MRData: {
    RaceTable: {
      season: faker.random.word(),
      position: faker.random.word(),
      Champion: {
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
        Constructors: [{
          constructorId: faker.random.word(),
          url: faker.internet.url(),
          name: faker.random.word(),
          nationality: faker.random.word(),
        }]
      },
      Races: [{
        season: faker.random.word(),
        round: faker.random.word(),
        url: faker.internet.url(),
        raceName: faker.random.word(),
        Circuit: {
          circuitId: faker.random.word(),
          url: faker.internet.url(),
          circuitName: faker.random.word(),
          Location: {
            lat: faker.address.latitude(),
            long: faker.address.longitude(),
            locality: faker.address.state(),
            country: faker.address.country()
          },
        },
        date: faker.random.word(),
        time: faker.random.word(),
        Results: [{
          number: faker.random.word(),
          position: faker.random.word(),
          positionText: faker.random.word(),
          points: faker.random.word(),
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
          Constructor: {
            constructorId: faker.random.word(),
            url: faker.internet.url(),
            name: faker.random.word(),
            nationality: faker.random.word(),
          },
          grid: faker.random.word(),
          laps: faker.random.word(),
          status: faker.random.word(),
          Time: {
            millis: faker.random.word(),
            time: faker.random.word(),
          },
          FastestLap: {
            rank: faker.random.word(),
            lap: faker.random.word(),
            Time: {
              millis: faker.random.word(),
              time: faker.random.word(),
            },
            AverageSpeed: {
              units: faker.random.word(),
              speed: faker.random.word(),
            }
          }
        }
        ]
      }]
    }
  },
})