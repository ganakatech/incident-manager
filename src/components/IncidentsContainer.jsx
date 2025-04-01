import React, { useState, useEffect } from 'react';
import IncidentsTable from './IncidentsTable';
import IncidentsList from './IncidentsList';
import api from '../api';
import './IncidentsContainer.css';

const IncidentsContainer = () =>
{
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Handle window resize for responsive display
    useEffect(() =>
    {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch incidents data
    useEffect(() =>
    {
        const fetchIncidents = async () =>
        {
            try
            {
                setLoading(true);
                const data = await api.getAllIncidents();
                setIncidents(data);
            } catch (err)
            {
                setError('Failed to fetch incidents data');
                console.error(err);
            } finally
            {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    if (loading) return <div className="loading">Loading incidents...</div>;
    if (error) return <div className="error">{error}</div>;

    // Display table for screens ≥ 600px, list for smaller screens
    return windowWidth >= 600 ? (
        <IncidentsTable incidents={incidents} />
    ) : (
        <IncidentsList incidents={incidents} />
    );
};

export default IncidentsContainer;
