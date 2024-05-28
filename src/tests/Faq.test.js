import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Faq from "../pages/Faq";

describe("Faq Page", () => {
  const renderWithRouter = (ui, { route = "/" } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={ui} />
          <Route path="/chat" element={<div>Chat Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders the FAQ page and checks for static text content", () => {
    renderWithRouter(<Faq />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("navigates to the chat page when the Chat Now button is clicked", () => {
    renderWithRouter(<Faq />);
    const chatButton = screen.getByText("Chat Now");
    fireEvent.click(chatButton);

    // Expect to see something specific to the new route
    expect(screen.getByText("Chat Page")).toBeInTheDocument();
  });
});
