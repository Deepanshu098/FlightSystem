import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Notification() {

    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/flight/getall');
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      
    useEffect(()=>{
        fetchNotifications();
    },[])

  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.notification_id} className="notification">
          <p>Message: {notification.message}</p>
          <p>Method: {notification.method}</p>
          <p>Recipient: {notification.recipient}</p>
          <p>Timestamp: {new Date(notification.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}

export default Notification