const config = {
    apiUrl: process.env.NODE_ENV === 'production'
        ? 'https://skempi-webserver-backend-1019404519977.us-east1.run.app'
        : 'http://localhost:8080'
};

export default config;