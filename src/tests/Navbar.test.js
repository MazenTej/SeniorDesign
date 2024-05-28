import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(ui, { wrapper: Router });
  };

  it("renders the Navbar and displays the correct text", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText("Vanguard AI Helper")).toBeInTheDocument();
  });

  it("contains a link to the homepage", () => {
    renderWithRouter(<Navbar />);
    expect(
      screen.getByRole("link", { name: "Vanguard AI Helper" })
    ).toHaveAttribute("href", "/");
  });

  it("renders a help icon button", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
  });
});
