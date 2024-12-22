import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { Loader } from "../shared-components/Loader";
import "./App.css";
import useAppVM from "./vm";

const App: React.FC = () => {
  const {
    loading,
    error,
    displayedData,
    isMobile,
    currentPage,
    setCurrentPage,
    totalPages,
    observerRef,
  } = useAppVM();

  if (loading)
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Loader />
      </div>
    );
  if (error) return <h1>Error: {error}</h1>;

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
