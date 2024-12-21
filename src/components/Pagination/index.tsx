import React, { useEffect, useRef } from "react";
import "./pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isMobile,
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && currentPage < totalPages) {
          onPageChange(currentPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isMobile, currentPage, totalPages, onPageChange]);

  if (isMobile) {
    return (
      <div>
        <div className="scroll-pagination">Scrolling to load more data...</div>
        <div ref={observerRef} style={{ height: "1px" }} />
      </div>
    );
  }

  return (
    <div className="desktop-pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
