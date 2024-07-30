import './App.css';
import FlightsList from './components/FlightsList';
import { useEffect } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';
import Cookies from 'js-cookie';
import axios from 'axios';

function App() {

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BHmQKEocB7eIsStAJsAkxsqXFMfm5nLfMaSqwDgm0I1dLe94QZnFzU8xMnyjnAsvjvtuHKw3xf6-BzrQb5-QLRA",
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)

      Cookies.set('token',token,{ secure: true, sameSite: 'strict' })
      //  await axios.post('http://localhost:8080/api/flight/fcmtoken',{token:token})
      
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }


  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

  return (
    <div className="App">
      <FlightsList/>
      {/* <Notification/> */}
    </div>
  );
}

export default App;
