/// <reference types="Cypress"/>

describe('empty spec', () => {
  it('passes', () => {
    cy.visit("http://localhost:3000")
  })

  it("Crear funcionario", () => {
    cy.get("i.fa-plus").parent().click()

    cy.get("#addFunctionary").then((modal) => {
      cy.get(modal).should("be.visible")
      cy.get(modal).should("have.class", "show")

      //cy.get(modal).get("modal-title").should("have.text", "Agregar funcionario")

      cy.get(modal).get('#name').type("Cypress")

      const date = new Date();

      let ye = date.toLocaleDateString([],{ year: 'numeric' }) 
      let mo = date.toLocaleDateString([],{ month: '2-digit' }) 
      let da = date.toLocaleDateString([],{ day: '2-digit' }) 

      cy.get(modal).get('#day').type(`${ye}-${mo}-${da}`)
      cy.get('#addEmployForm > .modal-footer > button[type="submit"]').click()
    })

    cy.get("#addFunctionary").then((modal) => {
      cy.get(modal).should("not.be.visible")
      cy.get(modal).should("not.have.class", "show")

      //cy.get(modal).get("modal-title").should("have.text", "Agregar funcionario"
    })
  })
})