import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    // Load chats from localStorage when the application initializes
    const savedChats = localStorage.getItem("chats");

    return savedChats ? JSON.parse(savedChats) : [];
  });
  const removeChat = (chatId) => {
    setChats(chats.filter((chat) => chat.id !== chatId));
    // Optionally, reset activeChatId if the active chat is the one being deleted
    if (activeChatId === chatId) {
      setActiveChatId(null);
    }
  };
  const [activeChatId, setActiveChatId] = useState(() => {
    // Load the last active chat ID from localStorage
    const savedActiveChatId = localStorage.getItem("activeChatId");
    return savedActiveChatId || null;
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Save chats to localStorage whenever they are updated
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    // Save the active chat ID to localStorage whenever it changes
    localStorage.setItem("activeChatId", activeChatId);
  }, [activeChatId]);
  useEffect(() => {
    if (chats.length === 0) {
      addNewChat(); 
    } else if (activeChatId === null) {
      setActiveChatId(chats[0].id);
    }
  }, [chats, activeChatId, setActiveChatId]);

  const addNewChat = () => {
    const newChat = {
      id: Date.now().toString(), 
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
    searchQuery,
    setSearchQuery,
    removeChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
