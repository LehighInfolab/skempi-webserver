import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>Welcome to SMAPIE Database</h1>
                <p className="subtitle">
                    Explore structural and mechanistic annotations of protein interactions
                </p>
            </section>

            <section className="features">
                <div className="features-grid">
                    <Link to="/browse" className="feature-card">
                        <div className="feature-content">
                            <h3>Browse Database</h3>
                            <p>Search and filter through mutation data with interactive visualization</p>
                        </div>
                    </Link>

                    <Link to="/download" className="feature-card">
                        <div className="feature-content">
                            <h3>Download Data</h3>
                            <p>Access and download the complete dataset for your research</p>
                        </div>
                    </Link>

                    <Link to="/statistics" className="feature-card">
                        <div className="feature-content">
                            <h3>Statistics</h3>
                            <p>View comprehensive database statistics and data summaries</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* <section className="about">
                <h2>About SMAPIE</h2>
                <p>
                    SMAPIE is a comprehensive database providing structural and mechanistic
                    annotations for protein interactions. Our goal is to facilitate research
                    in protein engineering and drug discovery.
                </p>
            </section> */}
        </div>
    );
};

export default Home;