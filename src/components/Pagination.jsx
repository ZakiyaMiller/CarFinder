//Custom pagination component(10 cars per page)
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (event, page) => {
    // Trigger the onPageChange callback with the new page number
    onPageChange(page);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      {/* Material UI Pagination component */}
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
};

export default Pagination;