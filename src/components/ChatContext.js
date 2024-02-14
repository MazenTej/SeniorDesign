import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    // Load chats from localStorage when the application initializes
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : [];
  });
  const [activeChatId, setActiveChatId] = useState(() => {
    // Load the last active chat ID from localStorage
    const savedActiveChatId = localStorage.getItem("activeChatId");
    return savedActiveChatId || null;
  });

  useEffect(() => {
    // Save chats to localStorage whenever they are updated
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    // Save the active chat ID to localStorage whenever it changes
    localStorage.setItem("activeChatId", activeChatId);
  }, [activeChatId]);
  // Inside ChatProvider component
  useEffect(() => {
    if (chats.length === 0) {
      addNewChat(); // This should set an activeChatId as well
    } else if (activeChatId === null) {
      setActiveChatId(chats[0].id);
    }
  }, [chats, activeChatId, setActiveChatId]);

  const addNewChat = () => {
    const newChat = {
      id: Date.now().toString(), // Using Date.now() for simplicity; consider a more robust ID generation strategy for production
      messages: [],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChatId(newChat.id);
  };

  const addMessageToChat = (message, sender) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, { text: message, sender }] }
          : chat
      )
    );
  };

  const value = {
    chats,
    activeChatId,
    addNewChat,
    addMessageToChat,
    setActiveChatId,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
