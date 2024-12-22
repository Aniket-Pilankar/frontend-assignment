import { useEffect, useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useIsMobile } from "../hooks/useIsMobile";
import { recordsPerPage, URL } from "../assets/constants";

export default function useAppVM() {
  const { data, error, loading } = useFetch(URL);

  const isMobile = useIsMobile();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / recordsPerPage);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const displayedData = isMobile
    ? data.slice(0, currentPage * recordsPerPage)
    : data.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
      );

  useEffect(() => {
    if (!isMobile || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
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
  return {
    loading,
    error,
    displayedData,
    isMobile,
    currentPage,
    totalPages,
    setCurrentPage,
    observerRef,
  };
}
