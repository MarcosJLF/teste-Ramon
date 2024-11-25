describe("Server API Tests", () => {
  it("should return a 200 status for the health endpoint", () => {
    cy.request("http://localhost:5173/").then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
describe('template spec', () => {
  it('passes', () => {

    cy.visit('http://localhost:5173');
    cy.contains('Sign In').click();
    cy.url().should('include', '/signin');
    cy.get('#email').type('marcos@gmail.com'); //mudar
    cy.get('#password').type('1234'); //mudar
    cy.get('[data-cy=botao-login]').click();

    cy.get('[data-cy=botao-projetos]').click();
    cy.contains('Create Project').click();
    cy.get('#name').type('ler');//mudar
    cy.get('#description').type('um pouco mais de leitura');//mudar
    cy.get('#owner').select('marcos')//mudar
   
    cy.get('#react-select-2-input').click().type('teste{enter}')
    cy.get('#react-select-3-input').click().type('teste{enter}')
    cy.get('button[type="submit"]').contains('Create Project').click()



  });
});