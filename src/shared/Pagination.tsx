import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageSizeOptions = [10, 50, 100];
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-end gap-5 mt-4 text-sm">
      <div>
        {start}-{end} of {totalItems} items
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          &lt;
        </button>

        <button
          className="px-3 py-1 border rounded bg-black text-white"
          disabled
        >
          {currentPage}
        </button>

        {currentPage < totalPages && (
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100"
            onClick={() => onPageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>

      <select
        value={itemsPerPage}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size} / Page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
