import React from 'react'
import './Patientdetail.scss'
import {Row, Col} from 'react-bootstrap' 
class Patientdetail extends React.Component{  
  constructor(props){
    super(props)
    this.state={
      data:  this.props.data
    }
  } 
  onLinkClick = (data, display) => { 
    this.props.history.history.push({pathname: '/patientdetail'})
    localStorage.setItem("patientObj", JSON.stringify(data))
    localStorage.setItem("actionDisplay", display)
  }
  render(){
    console.log("props", this.props)
    console.log("state", this.state) 
  return (
    <div className="container-fluid patient_detail">
      <h5 className="text-success mb-3">{this.state.data.length} apppointments</h5>
      <Row style={{marginBottom: "1rem"}}>
        <Col lg={3}>Patient Name</Col>
        <Col lg={1}>Age</Col>
        <Col lg={2}>Reason</Col>
        <Col lg={2}>Date</Col>
        <Col lg={2}>Time</Col>
        <Col lg={2}>Status</Col>
      </Row>
      {
        this.props.data.reverse().map((x, i) => {
        //age calculation
          if(x.patientInfo){
            let dOB= x.patientInfo.dateOfBirth
          var year = Number(dOB.substr(0, 4));
          var month = Number(dOB.substr(5, 2));
          var day = Number(dOB.substr(8, 2));
          var today = new Date();
          var age = today.getFullYear() - year;
          if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
            age--;
          }
          let display = "block"
          let status
          let bookingDate = x.bookingInfo.dateOfBooking === null ? new Date() : new Date(x.bookingInfo.dateOfBooking)
          let formatedBookingDate = `${bookingDate.getDate()}-${bookingDate.getMonth()+1}-${bookingDate.getFullYear()}`
          let bookingTime = new Date(x.bookingInfo.bookingTime).toLocaleTimeString();
          if( x.bookingStatusInfo.bookingStatus === "BOOKING_REQUEST_TO_HOSPITAL"){
             status = "New"
             display = "block"
          }
          else if( x.bookingStatusInfo.bookingStatus === "DEPOSIT_CHARGES_PENDING"){
            status = "Approved"
             display = "none"
          }
          else if( x.bookingStatusInfo.bookingStatus === "ADMISSION_FORM_PENDING"){
            status = "Admission Form Pending"
            display = "none"
          }
          else if( x.bookingStatusInfo.bookingStatus === "PAYMENT_SUCCESS"){
            status = "Payment Recieved"
            display = "none"
          }
          else if( x.bookingStatusInfo.bookingStatus === "BOOKING_CONFIRMED"){
            status = "Booking Confirmed"
            display = "none"
          }
          else if( x.bookingStatusInfo.bookingStatus === "BOOKING_REQUEST_DENIED"){
            status = "Disapproved"
            display = "none"
          }
          else{
            status = "Something went wrong"
          }
          return(
            <Row className="patient-row" onClick={() => this.onLinkClick(x, display )}>
              <Col lg={3}><div className="patient-btn">{x.patientInfo.fullName}</div></Col>
              <Col lg={1}><div className="patient-btn">{age}</div></Col>
              <Col lg={2}><div className="patient-btn">{x.bookingInfo.currentIllness}</div></Col>
              <Col lg={2}><div className="patient-btn">{formatedBookingDate}</div></Col>
              <Col lg={2}><div className="patient-btn">{bookingTime}</div></Col>
              <Col lg={2}><div className="patient-btn status-btn">{status}</div></Col>
            </Row>
          )
          }
        })
      }
    </div>
  )
}
}

export default Patientdetail
