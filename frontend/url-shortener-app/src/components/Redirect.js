import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Redirect.css'; // Import the CSS file

function Redirect() {
    const { shortUrl } = useParams();

    useEffect(() => {
        const redirectToOriginalUrl = async () => {
            try {
                const response = await fetch(` http://localhost:3000/api/url/redirecturl/${shortUrl}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to redirect');
                }

                // If successful, the browser will automatically redirect
                // The response will be handled by the server
            } catch (error) {
                console.error('Error during redirect:', error);
                // Optionally, you can display an error message or redirect to a not-found page
            }
        };

        redirectToOriginalUrl();
    }, [shortUrl]);

    return (
        <div className="redirect-container">
            <h2>Redirecting...</h2>
            <p>If you are not redirected automatically, please check your URL.</p>
        </div>
    );
}

export default Redirect;