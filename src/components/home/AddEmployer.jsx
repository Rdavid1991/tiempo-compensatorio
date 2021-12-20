
import React, { useEffect, useState } from 'react'
import { handlerFunctions } from './helper/handlerFunctions'

export const AddEmployer = ({ showModal, setShowModal }) => {

    const { handleInfoSave } = handlerFunctions()

    const initialState = {
        name: "",
        department: "",
        day: "",
        start: "",
        end: "",
        hourTotal: 0,
        hourLeft: 0,
        hourUsed: 0,
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

    return (
        <div className="modal fade" id="addEmploy"  >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar funcionario</h5>
                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <form
                        id="addEmployForm"
                        onSubmit={(e) => handleInfoSave(e, addEmploy)}
                    >
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Funcionario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    onChange={handleInputChange}
                                    name="name"
                                    required
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
                                    required
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
                                type="submit"
                                className="btn btn-primary"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
