import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInput from "../components/ChatInput";

describe("ChatInput", () => {
  test("renders input element", () => {
    render(<ChatInput onMessageSubmit={() => {}} />);
    expect(
      screen.getByPlaceholderText("Type a message...")
    ).toBeInTheDocument();
  });

  test("allows users to enter text", () => {
    render(<ChatInput onMessageSubmit={() => {}} />);
    const input = screen.getByPlaceholderText("Type a message...");
    userEvent.type(input, "Hello World");
    expect(input.value).toBe("Hello World");
  });

  test("clears input after submitting", () => {
    const handleSubmit = jest.fn();
    render(<ChatInput onMessageSubmit={handleSubmit} />);
    const input = screen.getByPlaceholderText("Type a message...");
    const sendButton = screen.getByRole("button", { name: "send" });

    userEvent.type(input, "Hello World");
    userEvent.click(sendButton);

    expect(input.value).toBe("");
    expect(handleSubmit).toHaveBeenCalledWith("Hello World");
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
