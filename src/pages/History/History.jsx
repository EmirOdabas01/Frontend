import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "../../components/Chat/MessageList/MessageList";
import Button from "../../components/common/Button/Button";
import { api, storage } from "../../services/api";
import styles from "./History.module.css";

const History = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserMessages = async () => {
    const userId = storage.getUserId();

    if (!userId) {
      navigate("/register");
      return;
    }

    try {
      setLoading(true);
      const messages = await api.user.getUserMessages(userId);
      setUserMessages(messages);
    } catch (error) {
      console.error("Kullanıcı mesajları alınırken hata:", error);
      alert("Mesajlar yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserMessages();
  }, []);

  const handleBackToChat = () => {
    navigate("/chat");
  };

  const handleLogout = () => {
    storage.clearUser();
    navigate("/register");
  };

  const getNickname = () => {
    return storage.getNickname() || "Misafir";
  };

  const getTotalMessages = () => {
    return userMessages.length;
  };

  const getSentimentStats = () => {
    const stats = {
      Pozitif: 0,
      Negatif: 0,
      Nötr: 0,
    };

    userMessages.forEach((message) => {
      if (message.sentiment && stats.hasOwnProperty(message.sentiment)) {
        stats[message.sentiment]++;
      }
    });

    return stats;
  };

  const sentimentStats = getSentimentStats();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <h1 className={styles.title}>Message History</h1>
          <div className={styles.userDetails}>
            <span className={styles.nickname}>{getNickname()}</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={handleBackToChat}>
            Return Chat
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{getTotalMessages()}</span>
          <span className={styles.statLabel}>Total messages</span>
        </div>
      </div>

      <div className={styles.messagesSection}>
        <h2 className={styles.sectionTitle}>Mesajlarım</h2>
        {userMessages.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Not Messages Yet.</p>
            <Button onClick={handleBackToChat} variant="primary">
              Send your first Message
            </Button>
          </div>
        ) : (
          <div className={styles.messageListContainer}>
            <MessageList
              messages={userMessages}
              currentUserId={storage.getUserId()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
