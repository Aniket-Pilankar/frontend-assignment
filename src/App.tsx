import React, { useState, useEffect, useRef } from "react";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { useFetch } from "./hooks/useFetch";
import "./App.css";
import { recordsPerPage, URL } from "./assets/constants";
import { useIsMobile } from "./hooks/useIsMobile";

// const sleep = async (delay: number) =>
//   await new Promise((res) => setTimeout(res, delay));

const App: React.FC = () => {
  const { data, error, loading } = useFetch(URL);

  const isMobile = useIsMobile();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / recordsPerPage);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobile || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        console.log("lastEntry:", lastEntry);
        if (lastEntry.isIntersecting && currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isMobile, currentPage, totalPages]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayedData = isMobile
    ? data.slice(0, currentPage * recordsPerPage)
    : data.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
      );

  return (
    <div className="app">
      <h1>Data Table</h1>
      <Table projects={displayedData} />
      {isMobile ? (
        <div ref={observerRef} style={{ height: "1px" }} />
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default App;
