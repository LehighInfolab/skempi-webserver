import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('metadataFields.pdb');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ field: searchField, term: searchTerm });
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                >
                    <option value="metadataFields.pdb">PDB ID</option>
                    <option value="metadataFields.mutation">Mutation</option>
                    <option value="metadataFields.mechanism">Mechanism</option>
                    <option value="metadataFields.source">Source</option>
                    <option value="rowData">Supporting Text</option>
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;