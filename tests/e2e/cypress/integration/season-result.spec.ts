import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const resultsPath = /.*\/(results.+)/
const championPath = /.*\/(driverStandings.+)/


const mockSuccessForResult = (): void => Http.mochSuccess(resultsPath, 'GET', 'load-season-result');
const mockSuccessForChampion = (): void => Http.mochSuccess(championPath, 'GET', 'load-season-champion');

describe('SeasonResult', () => {
  describe('load results', () => {
    const mockUnexpectedError = (): void => Http.mockUnexpectedError(resultsPath, 'GET')
    it('Should present on UnexpectedError', () => {
      mockUnexpectedError();
      cy.visit('')
      cy.visit('/seasons/any_id')
      cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again later.')
    })

    it('Should realod on home icon click', () => {
      mockUnexpectedError();
      cy.visit('')
      cy.visit('/seasons/any_id')
      cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again later.')
      mockSuccessForResult()
      mockSuccessForChampion()
      cy.getByTestId('reload').click()
      cy.getByTestId('season-result').should('exist')
    })

    it('Should present season result for year', () => {
      mockSuccessForResult();
      cy.visit('/seasons/2015')
      cy.get('li:not(:empty)').should('have.length', 19)
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="date-of-race"]').text(), 'Sun Mar 15 2015')
        assert.equal(li.find('[data-testid="race-name"]').text(), 'Australian Grand Prix')
        assert.equal(li.find('[data-testid="circuit-name"]').text(), 'Albert Park Grand Prix Circuit')
        assert.equal(li.find('[data-testid="race-round"]').text(), 'Round 1')
        assert.equal(li.find('[data-testid="driver-full-name"]').text(), 'Lewis Hamilton')
        assert.equal(li.find('[data-testid="race-time"]').text(), '1:31:54.067')
        cy.fixture('icons').then(icon => {
          assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.trophy)
        })
      })

      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="race-name"]').text(), 'Malaysian Grand Prix')
        assert.equal(li.find('[data-testid="circuit-name"]').text(), 'Sepang International Circuit')
        assert.equal(li.find('[data-testid="race-round"]').text(), 'Round 2')
        assert.equal(li.find('[data-testid="date-of-race"]').text(), 'Sun Mar 29 2015')
        assert.equal(li.find('[data-testid="driver-full-name"]').text(), 'Sebastian Vettel')
        assert.equal(li.find('[data-testid="race-time"]').text(), '1:41:05.793')
      })

      cy.get('li:nth-child(3)').then(li => {
        assert.equal(li.find('[data-testid="race-name"]').text(), 'Chinese Grand Prix')
        assert.equal(li.find('[data-testid="circuit-name"]').text(), 'Shanghai International Circuit')
        assert.equal(li.find('[data-testid="race-round"]').text(), 'Round 3')
        assert.equal(li.find('[data-testid="date-of-race"]').text(), 'Sun Apr 12 2015')
        assert.equal(li.find('[data-testid="driver-full-name"]').text(), 'Lewis Hamilton')
        assert.equal(li.find('[data-testid="race-time"]').text(), '1:39:42.008')
        cy.fixture('icons').then(icon => {
          assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.trophy)
        })
      })
    })

    it('Should goto SeasonList on home icon click', () => {
      mockSuccessForResult()
      cy.visit('')
      cy.visit('/seasons/2015')
      cy.get('li:not(:empty)').should('have.length', 19)
      cy.getByTestId('go-home').click({ force: true })
      Helper.testUrl('/seasons')
    })
  })
})