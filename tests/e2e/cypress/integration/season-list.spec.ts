import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /\/(driverStandings.+)/
// const path = '/driverStandings/1.json?offset=55&limit=11';

const mockUnexpectedError = (): void => Http.mockUnexpectedError(path, 'GET');
const mockSuccess = (): void => Http.mochSuccess(path, 'GET', 'load-season-list');

describe('SeasonList', () => {
  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again later.');
  })
    
  it('Should present season items', () => {
    mockSuccess();
    cy.visit('');
    cy.getByTestId('seasons-list').should('exist');
    cy.get('li:not(:empty)').should('have.length', 1);
    
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="year"]').text(), '2015')
      assert.equal(li.find('[data-testid="driver-full-name"]').text(), 'Lewis Hamilton')
    })
  })
})