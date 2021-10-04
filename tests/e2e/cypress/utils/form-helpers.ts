export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist');
  cy.getByTestId('main-error').should('content.text', error);
}