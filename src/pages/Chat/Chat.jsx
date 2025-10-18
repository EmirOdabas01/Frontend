import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "../../components/Chat/MessageList/MessageList";
import MessageInput from "../../components/Chat/MessageInput/MessageInput";
import Button from "../../components/common/Button/Button";
import { api, storage } from "../../services/api";
import styles from "./Chat.module.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    if (!isConnected) return;

    try {
      const messagesData = await api.message.getAll();
      setMessages(messagesData);
    } catch (error) {
      console.error("Loading Error:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 500);

    return () => clearInterval(interval);
  }, [isConnected]);

  useEffect(() => {
    const userId = storage.getUserId();
    const nickname = storage.getNickname();

    if (!userId || !nickname) {
      navigate("/register");
    }
  }, [navigate]);

  const handleSendMessage = async (text) => {
    const userId = storage.getUserId();
    if (!userId) {
      alert("User Not found pls register");
      navigate("/register");
      return;
    }

    setLoading(true);
    try {
      await api.message.create(userId, text);
      await fetchMessages();
    } catch (error) {
      console.error("Mesage sending error:", error);
      alert("Cannot send message, pls try again");
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = () => {
    navigate("/history");
  };

  const handleLogout = () => {
    storage.clearUser();
    navigate("/register");
  };

  const getNickname = () => {
    return storage.getNickname() || "user";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <span className={styles.welcome}>Welcome, {getNickname()}!</span>
        </div>
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={handleHistoryClick}>
            History
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messageListWrapper}>
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <MessageInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </div>

      <div className={styles.connectionStatus}>
        <div
          className={`${styles.status} ${
            isConnected ? styles.connected : styles.disconnected
          }`}
        >
          {isConnected ? "🟢 Online" : "🔴 Offline"}
        </div>
      </div>
    </div>
  );
};

export default Chat;
