import React, { useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import styles from "./MessageInput.module.css";
const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className={styles.messageInput} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Your Message..."
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
      </div>
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className={styles.sendButton}
      >
        Send it
      </Button>
    </form>
  );
};

export default MessageInput;
