import { render, screen } from "@testing-library/react";
import Pagination from "./index";
import userEvent from "@testing-library/user-event";

describe("Pagination Component", () => {
  test("renders pagination buttons correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={jest.fn()}
        isMobile={false}
      />
    );

    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("triggers onPageChange when a page button is clicked", async () => {
    const onPageChangeMock = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
        isMobile={false}
      />
    );

    const nextBtn = screen.getByRole("button", {
      name: "Next",
    });

    await userEvent.click(nextBtn);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});
