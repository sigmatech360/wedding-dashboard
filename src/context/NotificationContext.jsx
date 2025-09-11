import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [totalUnreadNotifications, setTotalUnreadNNotifications] = useState(0);

  // Function to update notifications, possibly after refetching
  const updateNotifications = async () => {
    // setNotifications(newNotifications);
    try {
      const baseURL = process.env.REACT_APP_BASE_URL;
      const token = localStorage.getItem("admintoken");

      const response = await axios.get(`${baseURL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (data.status) {
        setNotifications(data?.data);
        let unreadNotifications = 0;
        data?.data.forEach((item) => {
          if (!item.read_at) {
            unreadNotifications += 1;
          }
        });
        // console.log('total unread', unreadNotifications);
        setTotalUnreadNNotifications(unreadNotifications);
      }
    } catch (error) {
      console.error("Error fetching notifications :", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, updateNotifications, totalUnreadNotifications, setTotalUnreadNNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
