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


    it('Ir a tiempo acumulado del funcionario', () => {

        /**
         * Hacer click en el nombre del funcionario
         */
        cy.log("🚀🚀🚀**Navegar a el historial de horas extras del funcionario**🚀🚀🚀")
        cy.get("tbody > tr > :nth-child(1)")
            .should("contain.text", "Cypress")
            .click();

        /**
         * Verificar que se dirigió a la dirección correcta
         */
        cy.log("🚀🚀🚀**Verificar que el historial sea el de el usuario**🚀🚀🚀")
        cy.get("h2").should("contain.text", `Funcionario: Cypress`)
    })

    it.skip('Usar tiempo de un dia', () => {

        /**
         * Validar que se puede abrir el modal para uso de tiempo
         * - Hacer clic en botón de edición del dia
         */
        cy.log("🚀🚀🚀**Abrir modal para usar tiempo de dia especifico**🚀🚀🚀")
        cy.get("#notUsed > tbody > tr").then((row) => {
            dataIdentifier = cy.$$(row).find(":nth-child(1) > div").text()
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
        cy.log("🚀🚀🚀**Usar tiempo de dia especifico**🚀🚀🚀")
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

    it.skip('Verificar tiempo usado y tiempo restante', () => {

        /**
         * TODO: Verificar tiempo restante en header
         */
        cy.log("🚀🚀🚀**Verificar tiempo restante**🚀🚀🚀")
        cy.get("[title=\"use-total\"]").should("contain.text", "30 minutos")

        /**
         * TODO: Verificar tiempo restante en fila de tabla
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

    it.skip('Usar tiempo del total', () => {

        /**
         * TODO: Agregar horas de 5 días
         */
        cy.log("🚀🚀🚀 ***Ciclo - Agregar tiempo de 5 días*** 🚀🚀🚀")
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

                const monthRandom = String(Math.trunc(Math.random() * 9) + 3)
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
         * TODO: Verificar total de horas 
         */
        cy.log("🚀🚀🚀 ***Verificar horas restantes*** 🚀🚀🚀")
        cy.get("[title=\"use-total\"]").should("contain.text", "10 horas 30 minutos")

        /**
         * TODO: Obtener el card
         * - Presionar e botón Usar para abrir modal y usar tiempo total
         */
        cy.log("🚀🚀🚀**Abrir modal- usar tiempo**🚀🚀🚀")
        cy.get("[title=\"use-total\"]").then((card) => {
            cy.get(cy.$$(card).find("button[type=\"button\"]"))
                .should("have.text", "Usar")
                .click();
        })

        /**
         * TODO: Usar tiempo
         * - Verificar si el modal es visible
         * - Esperar animación de modal
         * - Verificar si el modal es estático
         * - Ingresar tiempo a usar en campo 
         * - Ingresar fecha de uso
         * - Hacer click en botón guardar
         */
        cy.log("🚀🚀🚀**Usar tiempo**🚀🚀🚀")
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
        })

        /**
         * Verificar que el modal no esta visible
         */
        cy.log("🚀🚀🚀**Verificar que modal para usar tiempo del total no este visible**🚀🚀🚀")
        cy.get("#useTotalTime").then((modal) => {
            cy.get(cy.$$(modal)).should("not.be.visible")
            cy.get(cy.$$(modal)).should("not.have.class", "show")
        })

        /**
         * Verificar que el tiempo restante sea el correcto
         */
        cy.log("🚀🚀🚀**Verificar tiempo restante**🚀🚀🚀")
        cy.get("[title=\"use-total\"]").should("contain.text", "5 horas 45 minutos")
    })

    it('Editar tiempo', () => {

        let hour;
        /**
         * Abrir modal de edición de tiempo
         */
        cy.log("🚀🚀🚀**Presionar botón editar tiempo para abrir modal**🚀🚀🚀")
        cy.get("#notUsed > tbody > tr").then((row) => {

            const regex = /(\d+)/
            hour = cy.$$(row).find(":nth-child(6)").text().match(regex)[0]

            cy.log(`❗❗❗** ${hour} **❗❗❗`)

            cy.get(cy.$$(row).find(":nth-child(7) > [data-click=\"editTime\"]")).click()
        })

        /**
         * TODO: Editar hora de salida
         * - Verificar que modal sea visible
         * - esperar animación de modal
         * - verificar que modal sea estático
         * - Cambiar hora de salida
         * - Guardar hora de salida 
         */
        cy.log("🚀🚀🚀**Editar hora de salida**🚀🚀🚀")
        cy.get("#timeEditModal").then((modal) => {

            cy.get(cy.$$(modal)).should("have.class", "show")
            cy.wait(1000)
            cy.get(cy.$$(modal)).should("have.attr", "data-bs-backdrop", "static")

            cy.get(cy.$$(modal).find("#end"))
                .type("19:00")
            cy.get(cy.$$(modal).find("button[type=\"submit\"]"))
                .click();
        })

        /**
         * Verificar pop-up
         * - Verificar que mensaje sea correcto
         * - Esperar animación
         * - Verificar que mensaje no sea visible
         */
        cy.log("🚀🚀🚀**Verificar mensaje correcto de pop-up**🚀🚀🚀")
        cy.get('.swal2-popup').then((popUp) => {
            cy.get(cy.$$(popUp).find("#swal2-title")).should("have.text", "Horas actualizadas")
            cy.wait(1000)
            cy.get(cy.$$(popUp)).should("have.class", "swal2-hide")
        })

        /**
         * Verificar horas restantes del dia
         */
        cy.log("🚀🚀🚀**Verificar horas restantes del dia**🚀🚀🚀")
        cy.get("#notUsed > tbody > tr").then((row) => {

            const regex = /(\d+)/
            const currentHour = cy.$$(row).find(":nth-child(6)").text().match(regex)[0]

            cy.log(`❗❗❗** ${currentHour} **❗❗❗`)

            cy.wrap(currentHour).should("eq", `${+hour + 1}`)
        })
    })

})