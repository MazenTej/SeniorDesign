import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { useChat } from "../components/ChatContext"; // Mock this since it's a context provider
import ChatInterface from "../components/ChatInterface";

jest.mock("axios");
jest.mock("../components/ChatContext", () => ({
  useChat: jest.fn(),
}));

describe("ChatInterface", () => {
  const mockAddMessageToChat = jest.fn();
  const mockChats = [{ id: 1, messages: [{ text: "Hello", sender: "user" }] }];
  const mockActiveChatId = 1;

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    useChat.mockImplementation(() => ({
      chats: mockChats,
      activeChatId: mockActiveChatId,
      addMessageToChat: mockAddMessageToChat,
      searchQuery: "",
    }));
  });

  test("renders without crashing", () => {
    render(<ChatInterface />);
    expect(screen.getByText(/Vanguard AI Helper/i)).toBeInTheDocument();
  });

  test("displays messages from context", () => {
    render(<ChatInterface />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("handles message submission and displays loading state", async () => {
    const response = { data: { response: "Response from server" } };
    axios.post.mockResolvedValue(response);

    render(<ChatInterface />);
    const inputElement = screen.getByPlaceholderText("Type a message...");
    const sendButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(inputElement, { target: { value: "Test message" } });
    fireEvent.click(sendButton);

    expect(mockAddMessageToChat).toHaveBeenCalledWith("Test message", "user");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    await waitFor(() =>
      expect(mockAddMessageToChat).toHaveBeenCalledWith(
        "Response from server",
        "server"
      )
    );
  });
});
