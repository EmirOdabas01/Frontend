import React, { useState } from "react";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import { api, storage } from "../../services/api";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert("Pls enter a nickname");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request with nickname:", nickname);

      const response = await api.user.register(nickname.trim());

      console.log("API Response received:", response);

      if (response && response.id) {
        storage.setUserId(response.id);
        storage.setNickname(nickname.trim());

        navigate("/chat");
      } else {
        alert("Failed to Register");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert(`Hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Chat App</h1>

        <div className={styles.inputGroup}>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter Nickname"
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          disabled={!nickname.trim() || loading}
          variant="primary"
        >
          {loading ? "Saving..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
