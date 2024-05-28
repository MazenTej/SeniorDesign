import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChatProvider } from "../components/ChatContext";
import Chat from "../pages/Chat";

describe("Chat Page", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });
  const renderWithProviders = (component) => {
    return render(
      <Router>
        <ChatProvider>{component}</ChatProvider>
      </Router>
    );
  };

  it("renders the chat page with Navbar, Sidebar, and ChatInterface", () => {
    renderWithProviders(<Chat />);

    // If "Vanguard AI Helper" text is expected in multiple components, specify where to check
    // Example: Verify the text in Navbar specifically
    const navbarTitles = screen.getAllByText("Vanguard AI Helper");
    expect(navbarTitles.length).toBeGreaterThan(0); // Check if there's at least one
    expect(navbarTitles[0]).toBeInTheDocument(); // More specific checks can be added based on order or context

    // Check for sidebar presence by a unique attribute or text from Sidebar
    expect(screen.getByText("New chat")).toBeInTheDocument();

    // Check for a unique element from ChatInterface
    expect(
      screen.getByPlaceholderText("Type a message...")
    ).toBeInTheDocument();
  });
});
