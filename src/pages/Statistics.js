import React, { useState, useEffect } from 'react';
import config from '../config';

const Statistics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch statistics from backend
        fetch(`${config.apiUrl}/statistics`)
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div>Loading statistics...</div>;

    return (
        <div className="statistics">
            <h2>Database Statistics</h2>
            {/* Add your statistics visualization components here */}
        </div>
    );
};

export default Statistics;