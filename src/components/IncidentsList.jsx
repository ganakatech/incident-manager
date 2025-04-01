// src/components/IncidentsList.jsx
import React from 'react';
import { formatDateTime, getPriorityText, getPriorityIcon } from '../utils/formatters';
import './IncidentsList.css';

const IncidentsList = ({ incidents }) => (
    <div className="incidents-list-container">
        <h2>Incidents</h2>
        <ul className="incidents-list">
            {incidents.map(incident => (
                <li key={incident.id} className="incident-item">
                    <div className="incident-header">
                        <img
                            src={getPriorityIcon(incident.priority)}
                            alt={`${getPriorityText(incident.priority)} Priority`}
                            className="priority-icon"
                        />
                        <span className="incident-name">{incident.name}</span>
                    </div>
                    <div className="incident-details">
                        <p>{formatDateTime(incident.datetime)}</p>
                        <p>{incident.locationName}</p>
                        <p>{getPriorityText(incident.priority)} Priority</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default IncidentsList;
