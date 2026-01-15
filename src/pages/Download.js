import React, { useState } from 'react';
import config from '../config';

const Download = () => {
    const [downloadingCSV, setDownloadingCSV] = useState(false);
    // const [downloadingPDB, setDownloadingPDB] = useState(false);

    const handleDownloadCSV = async () => {
        try {
            setDownloadingCSV(true);
            const response = await fetch(`${config.apiUrl}/download/csv`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Final_quotes.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setDownloadingCSV(false);
        }
    };

    // const handleDownloadPDB = async (pdbId) => {
    //     try {
    //         setDownloadingPDB(true);
    //         const response = await fetch(`http://localhost:3000/download/pdb/${pdbId}`);
    //         const blob = await response.blob();
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = `${pdbId}.pdb`;
    //         document.body.appendChild(a);
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //         document.body.removeChild(a);
    //     } catch (error) {
    //         console.error('Download failed:', error);
    //     } finally {
    //         setDownloadingPDB(false);
    //     }
    // };

    return (
        <div className="download-page">
            <h2>Download Data</h2>

            <section className="download-section">
                <h3>Complete Dataset</h3>
                <p>Download the complete SKEMPI2Mech dataset in CSV format.</p>
                <button
                    onClick={handleDownloadCSV}
                    disabled={downloadingCSV}
                    className="download-button"
                >
                    {downloadingCSV ? 'Downloading...' : 'Download CSV'}
                </button>
            </section>

            {/* <section className="download-section">
                <h3>Structure Files</h3>
                <p>Download individual PDB files.</p>
                <div className="pdb-list">
                    <div className="pdb-item">
                        <span>Example PDB: 1ABC</span>
                        <button
                            onClick={() => handleDownloadPDB('1ABC')}
                            disabled={downloadingPDB}
                            className="download-button"
                        >
                            {downloadingPDB ? 'Downloading...' : 'Download PDB'}
                        </button>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default Download;