// Notification.jsx
import React from "react";
import "./rednotification.css";

const RedNotification = ({ message, show }) => {
  return (
    show && (
      <div className="red-notification" style={{backgroundColor:"#d72f23"}}>
        <h2>{message}</h2>
      </div>
    )
  );
};

export default RedNotification;