import faker from 'faker';

export const mockUnexpectedError = (url: RegExp, method: string): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: faker.helpers.randomize([400, 404, 500]),
    body: {
      error: faker.random.words()
    }
  }).as('request');
}

export const mochSuccess = (url: RegExp, method: string, fixture: string, alias: string = 'request'): void => {
  console.log('URL', url);
  cy.intercept({
    method,
    url,
  }, {
    statusCode: 200,
    fixture
  }).as(alias);
}
