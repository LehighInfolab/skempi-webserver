import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import config from '../config';

const Browse = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState({ field: 'metadataFields.pdb', term: '' });
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 50,
        pages: 0,
        hasNextPage: false,
        hasPrevPage: false
    });

    const fetchData = useCallback(async (page = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page,
                limit: pagination.limit
            });

            if (search.term) {
                params.append('field', search.field);
                params.append('term', search.term);
            }

            const response = await fetch(`${config.apiUrl}/browse?${params}`);
            if (!response.ok) throw new Error('Failed to fetch data');

            const result = await response.json();
            setData(result.data);
            setPagination(prev => ({
                ...prev,
                ...result.pagination
            }));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [pagination.limit, search]);

    useEffect(() => {
        fetchData(1);
    }, [fetchData]);

    const handleSearch = (searchParams) => {
        setSearch(searchParams);
    };

    const handlePageChange = (newPage) => {
        fetchData(newPage);
    };

    return (
        <div className="browse-page">
            <h2>Browse Database</h2>
            <SearchBar onSearch={handleSearch} />

            {error && <div className="error-message">{error}</div>}

            <DataTable
                data={data}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Browse;