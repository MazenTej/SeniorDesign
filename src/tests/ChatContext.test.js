import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChatProvider, useChat } from "../components/ChatContext";

function TestComponent() {
  const { chats, addNewChat, addMessageToChat, removeChat } = useChat();
  return (
    <div>
      <button onClick={addNewChat}>Add New Chat</button>
      {chats.map((chat, index) => (
        <div key={chat.id}>
          <button
            onClick={() =>
              addMessageToChat(`New message from chat ${index}`, "user")
            }
          >
            Add Message to Chat {index}
          </button>
          <button onClick={() => removeChat(chat.id)}>
            Remove Chat {index}
          </button>
          {chat.messages.map((message, msgIndex) => (
            <p key={msgIndex}>{message.text}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

const renderWithChatProvider = (component) => {
  render(<ChatProvider>{component}</ChatProvider>);
};

describe("ChatProvider", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem");
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("loads initial chats from localStorage", () => {
    const chats = [{ id: "1", messages: [{ text: "Hello", sender: "user" }] }];
    localStorage.getItem.mockReturnValue(JSON.stringify(chats));
    renderWithChatProvider(<TestComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("adds a new chat and updates localStorage", async () => {
    renderWithChatProvider(<TestComponent />);
    act(() => {
      screen.getByText("Add New Chat").click();
    });
    await waitFor(() => {
      expect(
        screen.getAllByText(/Add Message to Chat/).length
      ).toBeGreaterThanOrEqual(1);
    });
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("adds a message to an existing chat", async () => {
    renderWithChatProvider(<TestComponent />);
    act(() => {
      screen.getByText(/Add Message to Chat 0/).click();
    });
    await waitFor(() => {
      expect(screen.getByText(/New message from chat\s*0/)).toBeInTheDocument();
    });
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("removes a chat and updates localStorage", async () => {
    const chats = [
      { id: "123", messages: [{ text: "Test message", sender: "user" }] },
    ];
    localStorage.getItem.mockReturnValue(JSON.stringify(chats));
    renderWithChatProvider(<TestComponent />);
    act(() => {
      screen.getByText("Remove Chat 0").click();
    });
    await waitFor(() => {
      expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
