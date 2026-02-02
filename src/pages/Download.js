import React, { useState } from 'react';
import { CSV_URL } from '../data/dataset';

const Download = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch(CSV_URL);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Final_quotes.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="download-page">
      <h2>Download Data</h2>
      <section className="download-section">
        <h3>Complete Dataset</h3>
        <p>Download the complete SKEMPI2Mech dataset in CSV format.</p>
        <button onClick={handleDownload} disabled={downloading} className="download-button">
          {downloading ? 'Downloading...' : 'Download CSV'}
        </button>
      </section>
    </div>
  );
};

export default Download;
