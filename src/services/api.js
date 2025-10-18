const BASE_URL =
  "https://chatapiapi-g8cacedmf6b0gsdw.spaincentral-01.azurewebsites.net/api";

export const api = {
  user: {
    register: async (nickname) => {
      try {
        console.log(
          "API Call:",
          `${BASE_URL}/User/Register?nickname=${encodeURIComponent(nickname)}`
        );

        const response = await fetch(
          `${BASE_URL}/User/Register?nickname=${encodeURIComponent(nickname)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response Status:", response.status);
        console.log("Response OK:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("HTTP Error:", response.status, errorText);
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const result = await response.text();
        console.log("Raw Response:", result);

        if (!result) {
          throw new Error("Empty response from server");
        }

        const userId = parseInt(result.trim(), 10);
        console.log("Parsed UserId:", userId);

        if (isNaN(userId)) {
          throw new Error(`Invalid user ID received: ${result}`);
        }

        return { id: userId };
      } catch (error) {
        console.error("Register API error:", error);
        throw error;
      }
    },

    getUserMessages: (userId) =>
      fetch(`${BASE_URL}/User/GetUserMessages?id=${userId}`).then(
        (response) => {
          if (!response.ok) throw new Error("Failed to fetch messages");
          return response.json();
        }
      ),
  },

  message: {
    getAll: () =>
      fetch(`${BASE_URL}/Message/GetAll`).then((response) => {
        if (!response.ok) throw new Error("Failed to fetch all messages");
        return response.json();
      }),

    create: (userId, text) =>
      fetch(`${BASE_URL}/Message/Create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          text: text,
        }),
      }).then((response) => {
        if (!response.ok) throw new Error("Failed to create message");
        return response.json();
      }),
  },
};

export const storage = {
  getUserId: () => {
    const id = localStorage.getItem("userId");
    return id ? parseInt(id, 10) : null;
  },
  setUserId: (id) => localStorage.setItem("userId", id.toString()),
  getNickname: () => localStorage.getItem("nickname"),
  setNickname: (nickname) => localStorage.setItem("nickname", nickname),
  clearUser: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
  },
};
