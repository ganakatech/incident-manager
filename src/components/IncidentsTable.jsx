import React from 'react';
import { formatDateTime, getPriorityText, getPriorityIcon } from '../utils/formatters';
import './IncidentsTable.css';

const IncidentsTable = ({ incidents }) => (
    <div className="incidents-table-container">
        <h2>Incidents</h2>
        <table className="incidents-table">
            <thead>
                <tr>
                    <th className="priority-column"></th>
                    <th>ID</th>
                    <th>Incident Name</th>
                    <th>Date and Time</th>
                    <th>Priority</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {incidents.map((incident, index) => (
                    <tr key={incident.id} className="incident-row">
                        <td>
                            <img
                                src={getPriorityIcon(incident.priority)}
                                alt={`${getPriorityText(incident.priority)} Priority`}
                                className="priority-icon"
                            />
                        </td>
                        <td>{index + 1}</td>
                        <td>{incident.name}</td>
                        <td>{formatDateTime(incident.datetime)}</td>
                        <td>{getPriorityText(incident.priority)}</td>
                        <td>{incident.locationName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default IncidentsTable;
