// Notification.jsx
import React from "react";
import "./notification.css";

const Notification = ({ message, show }) => {
  return (
    show && (
      <div className="notification">
        <h2>{message}</h2>
      </div>
    )
  );
};

export default Notification;
