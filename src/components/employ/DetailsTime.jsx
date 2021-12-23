import React from 'react';

export const DetailsTime = ({ data }) => {
    return (
        <div className="modal fade" id="details" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="detailsLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="detailsLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {data.time[0].usedHourHistory.length > 0 ? data.time[0].usedHourHistory[0].date : ""}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
