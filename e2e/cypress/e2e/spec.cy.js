/// <reference types="Cypress"/>
/* global cy, describe, it, afterEach, beforeEach */



describe('empty spec', () => {

    let storage = "";
    
    beforeEach(() => { 
        if (storage !== "") {
            cy.window().then((win) => { 
                
                let storageParsed = JSON.parse(storage)
                Object.entries(storageParsed).map((entries) => { 
                    const [key, value] = entries	
                    win.localStorage.setItem(key, value)
                })
            })
        }
    })

    afterEach(() => { 
        cy.window().then((win) => { 
            if(win.localStorage.length > 0){
                storage = JSON.stringify(win.localStorage)
            }
        })
    })

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
        })

        cy.get("tr > :nth-child(1)").should("contain.text", "Cypress")
    })

    it("Editar funcionario", () => {
        cy.get("tr > :nth-child(1)").contains("Cypress").then((col)=>{
    
            cy.get(cy.$$(col))
                .parent()
                .get(":nth-child(6) > button[title=\"editar\"]")
                .click();
        })

        cy.get("#functionaryEdit").then((modal) => { 
            cy.get(cy.$$(modal)).should("have.attr","data-bs-backdrop", "static")

            cy.get(cy.$$(modal))
                .get("#editEmployTimeForm  > .modal-body > #name")
                .should("have.text", "Cypress")
                .type("Cypress editado")



        })
    })

})