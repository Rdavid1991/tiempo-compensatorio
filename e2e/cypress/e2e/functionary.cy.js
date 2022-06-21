/// <reference types="Cypress"/>
/* global cy, describe, it, afterEach, beforeEach */

describe('Creación y edición de funcionario', () => {

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
            if (win.localStorage.length > 0) {
                storage = JSON.stringify(win.localStorage)
            }
        })
    })

    it('passes', () => {
        cy.visit("/")
    })

    it("Crear funcionario", () => {
        cy.createFunctionary();
    })

    it("Editar funcionario", () => {
        cy.get("tbody > tr > :nth-child(1)").contains("Cypress").then((col) => {

            cy.get(cy.$$(col))
                .parent()
                .get(":nth-child(6) > button[title=\"editar\"]")
                .click();
        })


        /**
         * Editar funcionario
         * - Verificar si el modal tiene la clase show (Visible)
         * - Esperar que termine fade (animación)
         * - Verificar si es estático
         * - Verificar si el input tiene el nombre con el que fue creado y editarlo
         * - verificar si el modal cierra correctamente y guarda la información
         */
        cy.get("#functionaryEdit").then((modal) => {
            cy.get(cy.$$(modal)).should("have.class", "show")
            cy.wait(1000)
            cy.get(cy.$$(modal)).should("have.attr", "data-bs-backdrop", "static")
            cy.get(cy.$$(modal).find("#name"))
                .should("have.value", "Cypress")
                .clear()
                .type("Cypress editado")

            cy.get(cy.$$(modal).find("button[type=\"submit\"]"))
                .should("have.text", "Guardar")
                .click()
        })

        /**
         * Obtener panel de alerta
         * - Verificar mensaje de edición
         */
        cy.get(".swal2-container").then((alert) => {
            cy.get(cy.$$(alert).find(".swal2-title"))
                .should("have.text", "Funcionario Actualizado")
        })

        /**
         * Verificar que información de edición existe
         * - Hacer click en editar
         */
        cy.get("tbody > tr > :nth-child(1) > a")
            .should("have.text", "Cypress editado")
            .then((col) => {
                cy.get(cy.$$(col))
                    .parent()
                    .get(":nth-child(6) > button[title=\"editar\"]")
                    .click();
            })

        /**
         * TODO: Validar modal de edición después de una edición
         * - Verificar si el modal tiene la clase show (Visible)
         * - Esperar que termine fade (animación)
         * - Verificar si es estático
         * - Verificar si el input tiene el nombre editado
         * - verificar si el modal cierra correctamente
         */
        cy.get("#functionaryEdit").then((modal) => {
            cy.get(cy.$$(modal)).should("have.class", "show")
            cy.wait(1000)
            cy.get(cy.$$(modal)).should("have.attr", "data-bs-backdrop", "static")
            cy.get(cy.$$(modal).find("#name"))
                .should("have.value", "Cypress editado")
            cy.get(cy.$$(modal).find("button[class*=\"btn-secondary\"]"))
                .should("have.text", "Cerrar")
                .click()
        })


    })

    it('Borrar funcionario', () => {
        cy.get("#functionaries > tbody > tr:nth-child(1)").then((row) => {
            cy.get(cy.$$(row).find(":nth-child(6) > button[data-click=\"delete\"]")).click()
        })

        /**
         * TODO: Validar popup de confirmación
         */
        cy.log("🚀🚀🚀**Validar popup de confirmación**🚀🚀🚀")
        cy.get(".swal2-container").then((modal) => {
            cy.get(cy.$$(modal).find("button.swal2-confirm")).click()
        })

        cy.wait(2000)

        /**
         * TODO: Verificar que tabla este vacía
         */
        cy.log("🚀🚀🚀**Tabla debe estar vacía y mostrar mensaje**🚀🚀🚀")
        const si = cy.get("#functionaries > tbody").should("contain.text", "Ningún dato disponible en esta tabla")
    })
})