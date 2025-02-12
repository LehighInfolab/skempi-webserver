import React from 'react';

const DataTable = ({ data, loading, pagination, onPageChange }) => {
    if (loading) return <div>Loading...</div>;
    if (!data?.length) return <div>No data found</div>;

    const columns = ['pdb', 'mutation', 'mechanism', 'source', 'rowData'];

    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column}>
                                {column.charAt(0).toUpperCase() + column.slice(1)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.globalKey || index}>
                            {columns.map(column => (
                                <td key={column}>
                                    {column === 'rowData'
                                        ? item.rowData
                                        : item.metadataFields[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="table-footer">
                <div className="table-info">
                    Total: {pagination.total} entries
                </div>

                <div className="pagination-controls">
                    <button onClick={() => onPageChange(1)} disabled={!pagination.hasPrevPage}>
                        First
                    </button>
                    <button onClick={() => onPageChange(pagination.page - 1)} disabled={!pagination.hasPrevPage}>
                        Previous
                    </button>

                    <span>Page {pagination.page} of {pagination.pages}</span>

                    <button onClick={() => onPageChange(pagination.page + 1)} disabled={!pagination.hasNextPage}>
                        Next
                    </button>
                    <button onClick={() => onPageChange(pagination.pages)} disabled={!pagination.hasNextPage}>
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;