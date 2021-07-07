import React from 'react'
import './Appointment.css'
import DropDown from './Dropdown/DropDown'

function Appointment({handleFilterChange,handleDateChange}) {
  return (
    <div>
     <DropDown handleFilterChange={handleFilterChange} handleDateChange={handleDateChange}/>
    </div>
    
  )
}

export default Appointment
