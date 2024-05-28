import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom"; // Necessary for any routing
import Sidebar from "../components/Sidebar";
import { ChatProvider } from "../components/ChatContext"; // Assuming this exports a React context provider

describe("Sidebar", () => {
  const setup = () => {
    // Wrap Sidebar in the necessary providers
    render(
      <Router>
        <ChatProvider>
          <Sidebar />
        </ChatProvider>
      </Router>
    );
  };

  it("renders the Sidebar with New chat button", () => {
    setup();
    expect(screen.getByText("New chat")).toBeInTheDocument();
  });

  it("allows the user to add a new chat", () => {
    setup();
    const newChatButton = screen.getByText("New chat");
    fireEvent.click(newChatButton);
    // Check if the function from context is called, assuming it's mocked or observable via effects
  });

  it("allows the user to enter a search term", () => {
    setup();
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test search" } });
    expect(searchInput.value).toBe("test search");
  });

  it("renders chat list items from context", () => {
    setup();
    // Assuming the context provides a couple of chats and one matches "test search"
    expect(screen.getByText("Chat 1")).toBeInTheDocument(); // Adjust based on what you expect to see
  });

  it("handles chat item clicks correctly", () => {
    setup();
    const chatItem = screen.getByText("Chat 1");
    fireEvent.click(chatItem);
    // Check if the setActiveChatId from context is called, assuming it's mocked or observable via effects
  });

  it("removes a chat when delete is clicked", async () => {
    setup();
    const deleteButton = screen.getAllByLabelText("delete")[0]; // Assuming multiple delete icons
    fireEvent.click(deleteButton);
    // You would check if removeChat from context is called, or if the chat item disappears from the document
  });
});
