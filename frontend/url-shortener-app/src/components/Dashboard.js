import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import CSS for styling

function Dashboard() {
    const [data, setData] = useState({ urls: [], countPerDay: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/url/dashboard', {
                    method: 'GET',
                    headers: {
                        'x-auth-token': localStorage.getItem("token"),
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const data = await res.json();
                setData(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        // <div className="dashboard-container">
        //     <h2>URL Dashboard</h2>
        //     <h3>Total URLs Created</h3>
        //     {/* <ul>
        //         {data.countPerDay.map((entry) => (
        //             <li >Id: {entry._id}:<p>count:{entry.count}</p> </li>
        //         ))}
        //     </ul> */}

        //     <h3>All Shortened URLs</h3>
        //     <ul>
        //         {data.urls.map((url) => (
        //             <li key={url._id}>
        //                 <p>Original URL: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></p>
        //                 <p>Short URL: <a href={`http://localhost:5000/redirecturl/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></p>
        //                 <p>Click Count: {url.clickCount}</p>
        //                 <p>Created At: {new Date(url.createdAt).toLocaleDateString()}</p>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <div className="dashboard-container">
            <h2>URL Dashboard</h2>
            <h3>Total URLs Created: {data.urls.length}</h3>
            
            <h3>URLs Created Per Day</h3>
            <ul>
                {data.countPerDay.map((entry) => (
                    <li key={entry._id || 'total'}>
                        {entry._id ? `Date: ${entry._id}` : 'Total:'} 
                        <p>Count: {entry.count}</p>
                    </li>
                ))}
            </ul>

            <h3>List of Created URLs</h3>
            <ul>
                {data.urls.map((url) => (
                    <li key={url._id}>
                        <p><strong>Original URL:</strong> <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></p>
                        <p><strong>Short URL:</strong> <a href={`/redirecturl/${url.shortUrl}`} className="url-link">{url.shortUrl}</a></p>
                        <p className="count-item">Click Count: {url.clickCount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;