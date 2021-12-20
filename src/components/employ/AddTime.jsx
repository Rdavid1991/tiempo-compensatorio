import React, { useEffect, useState } from 'react'
import moment from "moment"
import Swal from 'sweetalert2'


const { bootstrap, location } = window

export const AddTime = ({ employeeKey, showModal, setShowModal }) => {

    const initialState = {
        day: "",
        start: "",
        end: "",
        used: false
    }

    const [addEmployTime, setAddEmployTime] = useState(initialState)

    useEffect(() => {
        document.querySelector('#addEmployTime')
            .addEventListener('hidden.bs.modal', () => {
                setShowModal(false)
            })
    }, [])

    const handleInputChange = (e) => {

        setAddEmployTime({
            ...addEmployTime,
            [e.target.name]: e.target.value
        })
    }

    const handleInfoSave = () => {

        const duration = moment.duration(
            moment(addEmployTime.end, "hh:mm").diff(
                moment(addEmployTime.start, "hh:mm")
            )
        )

        if (localStorage.hasOwnProperty(employeeKey)) {
            const info = JSON.parse(localStorage.getItem(employeeKey))

            info.time.push({
                day: addEmployTime.day,
                start: addEmployTime.start,
                end: addEmployTime.end,
                hourTotal: duration.hours(),
                hourLeft: duration.hours(),
                hourUsed: 0,
                used: addEmployTime.used
            })
            localStorage.setItem(employeeKey, JSON.stringify(info))
        } 

        document.querySelector("#addEmployTimeForm").reset()
        bootstrap.Modal.getInstance(document.querySelector('#addEmployTime'), {}).hide()
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Horas guardadas',
            showConfirmButton: false,
            timer: 1000
        }).then(() => {
            location.reload()
        })
    }

    return (
        <div className="modal fade" id="addEmployTime"  >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar funcionario</h5>
                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form id="addEmployTimeForm">
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
