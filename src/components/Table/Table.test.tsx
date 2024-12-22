import { render, screen } from "@testing-library/react";
import Table from "./index";

describe("Table Component", () => {
  const projects = [
    { id: 0, percentageFunded: 70, amountPledged: 5000 },
    { id: 1, percentageFunded: 90, amountPledged: 8000 },
  ];

  test("render correctly with Data", () => {
    render(<Table projects={projects} />);
    const id = screen.getByText("1");
    const percentageFunded = screen.getByText("70 %");
    const amountPledged = screen.getByText("$ 5000");

    expect(id).toBeInTheDocument();
    expect(percentageFunded).toBeInTheDocument();
    expect(amountPledged).toBeInTheDocument();
  });

  test('shows "No Data to show" when there are no projects', () => {
    render(<Table projects={[]} />);

    expect(screen.getByText("No Data to show")).toBeInTheDocument();
  });
});
