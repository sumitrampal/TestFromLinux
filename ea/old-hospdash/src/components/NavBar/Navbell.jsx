import React, { useState, useEffect } from 'react'
import './Navbell.scss'
import {apiUrl} from '../../config.json'
import axios from 'axios'
import {Col} from 'react-bootstrap'
function Navbell(props) {
  const [ nests, setNests ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
  if (!listening) {
    const events = new EventSource(`${apiUrl}/hospitaldashboard/bookingupdates/${localStorage.getItem('hospitalId')}`);
    events.onmessage = (event) => {

      const parsedData = JSON.parse(event.data);
  console.log('live notification',parsedData)
    
    let hospNotiArr = parsedData.filter(data => (data.hospitalId === localStorage.getItem('hospitalId')))
    setNests((nests) => nests.concat(hospNotiArr))
    var audio = new Audio(require('../../Assets/sound.mp3'))
    audio.play();
      

    };

    setListening(true);
  }
  }, [listening, nests]);
  const notifications = ['New booking request recieved from patient ID qwd3n3jf0','Admission form recieved from patient ID abc3n3jf0', 'New booking request recieved from patient ID xxnx3n3jf8']
  return (
      <div className="notifications">
        <div className="notification-number">{nests.length}</div>
        <div className="navbell-container">
          <img className = "navbell" src = {require("../../Assets/bell.png")} alt="navbell" />
        </div>
        <div className="notification-dropdown">
          <div className="notification-dropdown-triangle"></div>
          {
            nests.map((notification,i) => {
              return (
                <div className="notification row">
                  <Col lg={10}>{notification.message}</Col>
                </div>
              )
            })
          }
        </div>
      </div>
  )
}

export default Navbell
