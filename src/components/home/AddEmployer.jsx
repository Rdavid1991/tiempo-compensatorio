import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { randomId } from '../../helper'
const { bootstrap, location } = window

export const AddEmployer = ({ showModal, setShowModal }) => {

    const initialState = {
        name: "",
        department: "",
        day: "",
        start: "",
        end: "",
        used: false
    }

    const [addEmploy, setAddEmploy] = useState(initialState)

    useEffect(() => {
        document.querySelector('#addEmploy')
            .addEventListener('hidden.bs.modal', () => {
                setShowModal(false)
            })
    }, [setShowModal])

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
            department: addEmploy.department,
            time: [{
                day: addEmploy.day,
                start: addEmploy.start,
                end: addEmploy.end,
                hourTotal: duration.hours(),
                used: addEmploy.used
            }]
        }))


        document.querySelector("#addEmployForm").reset()
        bootstrap.Modal.getInstance(document.querySelector('#addEmploy'), {}).hide()

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Funcionario gurdado',
            showConfirmButton: false,
            timer: 1000
        }).then(() => {
            location.reload()
        })
    }

    return (
        <div className="modal fade" id="addEmploy"  >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar funcionario</h5>
                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form id="addEmployForm">
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
                                <label htmlFor="department" className="form-label">Departamento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="department"
                                    onChange={handleInputChange}
                                    name="department"
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
                        </form>
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
