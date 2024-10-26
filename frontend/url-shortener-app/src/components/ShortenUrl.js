import React, { useState } from 'react';
// import axios from 'axios';
import './ShortenUrl.css'; // Import CSS for styling

function ShortenUrl() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/url/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem("token"),
                },
                body: JSON.stringify({ originalUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }

            const data = await response.json();
            setShortUrl(data.shortUrl);
            setError(null);
            
        } catch (error) {
            console.error('Error shortening URL:', error);
            setError(error.message);
        }
    };

    return (
        <div className="shorten-url-container">
            <h2>Shorten Your URL</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Enter long URL"
                    required
                />
                <button type="submit">Shorten URL</button>
            </form>
            {shortUrl && <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>}
            {error && <p className="error-message">Error: {error}</p>}
        </div>
    );
}

export default ShortenUrl;