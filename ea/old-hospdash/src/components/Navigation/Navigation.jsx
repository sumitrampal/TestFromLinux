import React from 'react'
import './Navigation.scss'
import {Link} from 'react-router-dom'
const Navigation = ({active}) => {
    
  let unparseddata = localStorage.getItem("patientObj")
  let data = JSON.parse(unparseddata)
  React.useEffect(()=>{
      if(data.bookingStatusInfo.metadata.length === 0 || !data.bookingStatusInfo.metadata[0].bookingId) document.getElementById('admissionForm').style.display="none"
    document.getElementById(active).classList.add('active')
  })
  return(
    <div className="side-navigation-container">
      <div id="patientRequest">
        <Link to="/patientdetail">Patient Request</Link>
      </div>
      <div id="actionTaken">
        <Link to="/action">Action Taken</Link>
      </div>
      <div id="admissionForm">
        <Link to="/admissionform">Admission Form</Link>
      </div> 
    </div>
  )
}
export default Navigation
