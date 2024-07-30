import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { messaging, onMessage } from '../firebase';
// import { messaging } from '.';

function FlightsList() {

    const[flights,setFlights] = useState([]);

    //fetching flights details
    const fetchflights = async()=>{
        try{
            const response = await axios.get('http://localhost:8080/api/flight/get',{
              headers:{
                'Authorization':`Bearer ${Cookies.get('FCM-token')}`
              }
            });
            // const data = await response.json();
            console.log(response);
            setFlights(response.data.flights)
        }
        catch(err){
            console.log(err.message)
        }
    }

    useEffect(()=>{
        // Handle foreground messages
        const subs = onMessage(messaging,(payload) => {
          console.log('Message received. ', payload);
          alert(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
          // Optionally, you can update the flight data here
          fetchflights();
        });
        fetchflights();

        // Poll for flight updates every 30 seconds
        const intervalId = setInterval(fetchflights, 30000);

        return () => {
        clearInterval(intervalId); // Cleanup on component unmount
        subs(); // Cleanup onMessage listener
    };
    },[])


  return (
    <div>
      <h1 style={{textAlign:'center'}}>Flight List</h1>
      <table >
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Airline</th>
            <th>Status</th>
            <th>Departure Gate</th>
            <th>Arrival Gate</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flight_id}>
              <td>{flight.flight_id}</td>
              <td>{flight.airline}</td>
              <td>{flight.status}</td>
              <td>{flight.departure_gate}</td>
              <td>{flight.arrival_gate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FlightsList;