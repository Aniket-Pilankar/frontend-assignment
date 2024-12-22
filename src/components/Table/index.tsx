import React from "react";
import "./table.css";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Project {
  id: number;
  percentageFunded: number;
  amountPledged: number;
}

interface TableProps {
  projects: Project[];
}

const Table: React.FC<TableProps> = ({ projects }) => {
  const isMobile = useIsMobile();
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr style={{ display: "block" }}>
              <h2>No Data to show</h2>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project?.id}>
                <td>
                  <span>{isMobile && "S.No."}</span>
                  <span>{project?.id + 1}</span>
                </td>
                <td>
                  {isMobile && "Percentage Funded"}
                  {project?.percentageFunded} %
                </td>
                <td>
                  {isMobile && "Amount Pledged"}$ {project?.amountPledged}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
