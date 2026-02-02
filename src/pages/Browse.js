import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import { loadDataset, searchDataset } from '../data/dataset';

const PAGE_SIZE = 50;

const Browse = () => {
  const [rows, setRows] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({ field: 'metadataFields.pdb', term: '' });
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: PAGE_SIZE, pages: 0, hasNextPage: false, hasPrevPage: false });

  useEffect(() => {
    let cancelled = false;
    loadDataset()
      .then((loaded) => {
        if (cancelled) return;
        setRows(loaded);
        const r = searchDataset(loaded, search, { page: 1, limit: PAGE_SIZE });
        setData(r.data);
        setPagination(r.pagination);
      })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!rows) return;
    const r = searchDataset(rows, search, { page: 1, limit: PAGE_SIZE });
    setData(r.data);
    setPagination(r.pagination);
  }, [rows, search]);

  const onPage = (page) => {
    if (!rows) return;
    const r = searchDataset(rows, search, { page, limit: PAGE_SIZE });
    setData(r.data);
    setPagination(r.pagination);
  };

  return (
    <div className="browse-page">
      <h2>Browse Database</h2>
      <SearchBar onSearch={setSearch} />
      {error && <div className="error-message">{error}</div>}
      <DataTable data={data} loading={loading} pagination={pagination} onPageChange={onPage} />
    </div>
  );
};

export default Browse;
