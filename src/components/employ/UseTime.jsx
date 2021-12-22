import React, { useState } from 'react'
import { handlerFunctions } from './helper/handlerFunctions'

export const UseTime = ({ idTime, employeeKey, data }) => {

    const { handlerUsedTime, handlerUseHours } = handlerFunctions(data, employeeKey)
    const [usedTime, setUsedTime] = useState({
        hourToUse: "",
        dateOfUse: ""
    })

    return (
        <div class="modal fade" id="useTime" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="useTimeLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="useTimeLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handlerUseHours(idTime, usedTime)
                    }}>
                        <div class="modal-body">

                            <div class="mb-3">
                                <label for="hourToUse" class="form-label">Horas a usar</label>
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    name="hourToUse"
                                    step="0.01"
                                    min="0"
                                    onChange={(e) => handlerUsedTime(e, setUsedTime, usedTime)}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="dateOfUse" class="form-label">Fecha</label>
                                <input
                                    type="date"
                                    class="form-control form-control-sm"
                                    name="dateOfUse"
                                    onChange={(e) => handlerUsedTime(e, setUsedTime, usedTime)}
                                />
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-sm btn-primary">Usar horas</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
