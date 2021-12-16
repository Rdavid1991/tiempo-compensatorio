import moment from 'moment'
import React, { useState } from 'react'
import { randomId } from '../../helper'

export const AddEmployer = () => {


    const [addEmploy, setAddEmploy] = useState({
        name: "",
        day: "",
        start: "",
        end: "",
    })

    const handleInputChange = (e) => {

        setAddEmploy({
            ...addEmploy,
            [e.target.name]: e.target.value
        })
    }

    const handleInfoSave = () => {

        const duration = moment.duration(
            moment(addEmploy.end, "hh:mm").diff(
                moment(addEmploy.start, "hh:mm")
            )
        )

        let key = randomId()
        let exit = false

        do {
            if (localStorage.hasOwnProperty(key)) {
                exit = true
                key = randomId()
            } else {
                exit = false
            }

        } while (exit);

        localStorage.setItem(key, JSON.stringify({
            name: addEmploy.name,
            time: [{
                day: addEmploy.day,
                start: addEmploy.start,
                end: addEmploy.end,
                hourTotal: duration.hours()
            }]
        }))
    }

    return (
        <div className="modal fade" id="addEmploy" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar funcionario</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Funcionario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={handleInputChange}
                                name="name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="day" className="form-label">Día</label>
                            <input
                                type="date"
                                className="form-control"
                                id="day"
                                onChange={handleInputChange}
                                name="day"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="start">Desde</label>
                            <input
                                type="time"
                                className="form-input"
                                id="start"
                                onChange={handleInputChange}
                                name="start"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="end">Hasta</label>
                            <input
                                type="time"
                                className="form-input"
                                id="end"
                                onChange={handleInputChange}
                                name="end"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button
                            onClick={handleInfoSave}
                            type="button"
                            className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
