 
import React from "react";
import styles from "./MessageList.module.css";

const MessageList = ({ messages = [] }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSentimentClass = (sentiment) => {
    switch (sentiment) {
      case "Pozitif":
        return styles.positive;
      case "Negatif":
        return styles.negative;
      case "Nötr":
        return styles.neutral;
      default:
        return "";
    }
  };

  return (
    <div className={styles.messageList}>
      {messages.length === 0 ? (
        <div className={styles.emptyState}>Not messags yet</div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className={styles.messageItem}>
            <div className={styles.messageContent}>
              <p className={styles.messageText}>{message.text}</p>
              <div className={styles.messageMeta}>
                <span className={styles.time}>
                  {formatDate(message.createdAt)}
                  <span style={{ marginLeft: "10px" }}>
                    {message.userNickName}
                  </span>
                </span>
                {message.sentiment && (
                  <span
                    className={`${styles.sentiment} ${getSentimentClass(
                      message.sentiment
                    )}`}
                  >
                    {message.sentiment}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
