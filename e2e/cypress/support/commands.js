// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("createFunctionary", () => {
    /**
         * TODO: Abrir modal 
         */
    cy.log("🚀🚀🚀**Hacer click en botón nuevo funcionario**🚀🚀🚀")
    cy.get("i.fa-plus")
        .parent()
        .should("have.text", "Nuevo funcionario")
        .click()

    /**
     * TODO: Agregar funcionario
     * - Verificar que el modal este visible
     * - Esperar animación de modal
     * - Verificar titulo del modal
     * - Agregar nombre de funcionario
     * - Agregar fecha de horas extras
     * - Guardar funcionario
     */
    cy.log("🚀🚀🚀**Agregar funcionario**🚀🚀🚀")
    cy.get("#addFunctionary").then((modal) => {
        cy.get(cy.$$(modal)).should("have.class", "show")

        cy.wait(1000)

        cy.get(cy.$$(modal).find(".modal-title")).should("have.text", "Agregar funcionario")
        cy.get(cy.$$(modal)).get('#name').type("Cypress")

        const date = new Date();

        let ye = date.toLocaleDateString([], { year: 'numeric' })
        let mo = date.toLocaleDateString([], { month: '2-digit' })
        let da = date.toLocaleDateString([], { day: '2-digit' })

        cy.get(cy.$$(modal)).get('#day').type(`${ye}-${mo}-${da}`)
        cy.get('#addEmployForm > .modal-footer > button[type="submit"]').click()
    })

    /**
     * Verificar que el modal no esta visible
     */
    cy.log("🚀🚀🚀**Verificar que modal para agregar funcionario no este visible**🚀🚀🚀")
    cy.get("#addFunctionary").then((modal) => {
        cy.get(modal).should("not.be.visible")
        cy.get(modal).should("not.have.class", "show")
    })

    /**
     * Verificar que el funcionario este creado
     */
    cy.log("🚀🚀🚀**Verificar que el funcionario este creado**🚀🚀🚀")
    cy.get("tr > :nth-child(1)").should("contain.text", "Cypress")
})