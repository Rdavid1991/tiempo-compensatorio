/// <reference types="Cypress"/>

/* global cy, describe, it, afterEach, beforeEach */

describe('Creación y edición de funcionario', () => {

    let storage = "";
    let dataIdentifier = "";

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
            if (win.localStorage.length > 0) {
                storage = JSON.stringify(win.localStorage)
            }
        })
    })

    it('Ir a tiempo compensatorio', () => {
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

            let ye = date.toLocaleDateString([], { year: 'numeric' })
            let mo = date.toLocaleDateString([], { month: '2-digit' })
            let da = date.toLocaleDateString([], { day: '2-digit' })

            cy.get(modal).get('#day').type(`${ye}-${mo}-${da}`)
            cy.get('#addEmployForm > .modal-footer > button[type="submit"]').click()
        })

        cy.get("#addFunctionary").then((modal) => {
            cy.get(modal).should("not.be.visible")
            cy.get(modal).should("not.have.class", "show")
        })

        cy.get("tr > :nth-child(1)").should("contain.text", "Cypress")
    })


    it('Ir a tiempo acumulado del funcionario', () => {

        /**
         * Hacer click en el nombre del funcionario
         */
        cy.get("tbody > tr > :nth-child(1)")
            .should("contain.text", "Cypress")
            .click();

        /**
         * Verificar que se dirigió a la dirección correcta
         */
        cy.get("h2").should("contain.text", `Funcionario: Cypress`)
    })

    it('Usar tiempo de un dia', () => {

        /**
         * Validar que se puede abrir el modal para uso de tiempo
         * - Hacer clic en botón de edición del dia
         */
        cy.get("tbody > tr").then((row) => {

            dataIdentifier = cy.$$(row).find(":nth-child(1) > div").text()
            cy.log(dataIdentifier)

            cy.get(cy.$$(row).find(":nth-child(7) > button[data-click=\"useTime\"]"))
                .click()
        })

        /**
         * TODO: Llenar información en modal para usar tiempo
         * - Verificar que sea visible
         * - Esperar que termine la animación
         * - Verificar que el modal sea estático
         * - Verificar que tenga el titulo
         * - Ingresar horas a usar en el campo
         * - Ingresar fecha de uso
         * - Hacer clic en usar horas
         * - Verificar cierre de modal
         */
        cy.get("#useTime").then((modal) => {
            cy.get(cy.$$(modal)).should("have.class", "show")
            cy.wait(1000)
            cy.get(cy.$$(modal)).should("have.attr", "data-bs-backdrop", "static")
            cy.get(cy.$$(modal).find(".modal-header")).should("contain.text", "Usar tiempo del")
            cy.get(cy.$$(modal)
                .find(".modal-body")
                .find("input[name=\"hourToUse\"]")
            ).type("1.30")

            const date = new Date();

            let ye = date.toLocaleDateString([], { year: 'numeric' })
            let mo = date.toLocaleDateString([], { month: '2-digit' })
            let da = date.toLocaleDateString([], { day: '2-digit' })

            cy.get(
                cy.$$(modal)
                    .find(".modal-body")
                    .find("input[name=\"dateOfUse\"]")
            ).type(`${ye}-${mo}-${da}`)
            cy.get(cy.$$(modal).find("button[type=\"submit\"]"))
                .should("have.text", "Usar horas")
                .click()
            cy.get(cy.$$(modal)).should("not.have.class", "show")
        })
    })

    it('Verificar tiempo usado y tiempo restante', () => {

        /**
         * Verificar tiempo restante en header
         */
        cy.get("[title=\"use-total\"]").should("contain.text", "30 minutos")

        /**
         * Verificar tiempo restante en fila de tabla
         * - Verificar que la fila sea la misma
         * - Verificar tiempo usado
         * - Verificar el tiempo restante
         */
        cy.get("tbody > tr").then((row) => {
            cy.get(cy.$$(row).find(":nth-child(1)")).should("contain.text", dataIdentifier)
            cy.get(cy.$$(row).find(":nth-child(5)")).should("contain.text", "1 hora 30 minutos")
            cy.get(cy.$$(row).find(":nth-child(6)")).should("contain.text", "30 minutos")
        })
    })

    it('Usar tiempo del total', () => {

        const date = new Date();
        for (let i = 0; i < 5; i++) {

            cy.get("[title=\"title\"]").then((card) => {
                cy.get(cy.$$(card).find(".btn-success"))
                    .should("contain.text", "Agregar hora")
                    .click()
            })

            cy.get("#functionaryAddTime").then((modal) => {

                cy.get(cy.$$(modal)).should("have.class", "show")
                cy.wait(1000)
                cy.get(cy.$$(modal)).should("have.attr", "data-bs-backdrop", "static")

                let ye = date.toLocaleDateString([], { year: 'numeric' })

                const monthRandom = String(Math.trunc(Math.random() * 11) + 1)
                let mo = monthRandom.length > 1 ? monthRandom : `0${monthRandom}`

                const dayRandom = String(Math.trunc(Math.random() * 30) + 1)
                let da = dayRandom.length > 1 ? dayRandom : `0${dayRandom}`

                cy.get(
                    cy.$$(modal)
                        .find(".modal-body")
                        .find("input[name=\"day\"]")
                ).type(`${ye}-${mo}-${da}`)

                cy.get(cy.$$(modal).find("button[type=\"submit\"]"))
                    .should("contain.text", "Guardar")
                    .click()
            })
            cy.wait(2000)
        }

        /**
         * Verificar total de horas 
         */
        cy.get("[title=\"use-total\"]").should("contain.text", "10 horas 30 minutos")

        /**
         * Obtener el card
         * - Presionar e botón Usar para abrir modal y usar tiempo total
         */
        cy.get("[title=\"use-total\"]").then((card) => {
            cy.get(cy.$$(card).find("button[type=\"button\"]"))
                .should("have.text", "Usar")
                .click();
        })

        cy.get("#useTotalTime").then((modal) => {
            cy.get(cy.$$(modal)).should("have.class", "show")
            cy.wait(1000)
            cy.get(cy.$$(modal)).should("have.attr", "data-bs-backdrop", "static")

            cy.get(cy.$$(modal).find("input[type=\"number\"]"))
                .type("4.45")

            const date = new Date();

            let ye = date.toLocaleDateString([], { year: 'numeric' })
            let mo = date.toLocaleDateString([], { month: '2-digit' })
            let da = date.toLocaleDateString([], { day: '2-digit' })

            cy.get(cy.$$(modal).find("input[type=\"date\"]"))
                .type(`${ye}-${mo}-${da}`)

            cy.get(cy.$$(modal).find("button[type=\"submit\"]"))
                .click()

            /**
             * Verificar total de horas restantes
             */
            cy.get("[title=\"use-total\"]").should("contain.text", "5 horas 45 minutos")
        })
    })
})