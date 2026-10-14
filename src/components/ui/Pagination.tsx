import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  showingCount: number;
  itemName: string;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  showingCount,
  itemName,
  onPageChange,
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <div className="mt-6 pt-6 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-[11px] font-bold tracking-[0.15em] text-on-surface-variant uppercase">
        Showing {showingCount} of {totalItems} {itemName}
      </p>
      <div className="flex gap-1.5 items-center">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          title="Previous Page"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white hover:border-primary-container hover:shadow-md disabled:opacity-40 transition-all duration-200 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">chevron_left</span>
        </button>
        {Array.from({ length: safeTotalPages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              title={`Go to page ${pageNum}`}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-200 ${
                currentPage === pageNum
                  ? "bg-primary-container text-white font-bold shadow-sm cursor-default"
                  : "bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white hover:border-primary-container hover:shadow-md cursor-pointer"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(Math.min(safeTotalPages, currentPage + 1))}
          disabled={currentPage >= safeTotalPages}
          title="Next Page"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white hover:border-primary-container hover:shadow-md disabled:opacity-40 transition-all duration-200 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
