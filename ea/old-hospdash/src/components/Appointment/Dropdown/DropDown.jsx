import React, { useState } from 'react';
import './DropDown.css';
import Datepicker from '../Datepicker/Datepicker';


let selecteed = "Choose Filter to apply"
class DropDown extends React.Component{
  constructor(props){
    super(props)
    this.state={
      
      dropDown: "All Requests",
      selected: "Choose Filter to apply",
      date:""
    }
  }
  
   
  handleDropdown = (event) => {
    const { value } = event.target;
    this.setState({
      dropDown:value,
      selected: value
    })
    selecteed = value.charAt(0).toUpperCase() + value.slice(1) 
    this.props.handleFilterChange(value)
  } 
  handleDate=(date)=>{
    this.setState({ date: date})
    this.props.handleDateChange(date)
  }
  render(){
    return (
      <div className="container-fluid appointment">
        <div className="row">
          <div className="hub ml-3" style={{fontSize: "1.75rem"}}>{localStorage.getItem("hospitalName")}'s</div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="hub">Appointments Hub</div>
          </div>
          <div className="col-lg-3">
            <select className="select_box" defaultValue={this.state.dropDown} onChange={this.handleDropdown}>
            <option>{selecteed}</option>
            <option value = "all" >All Requests</option>
              <option value = "new" >New</option>
              <option value = "booked" >Booked</option>
              <option value = "confirmed" >Confirmed</option>
              <option value = "approved">Approved</option>
              <option value = "rejected">Rejected</option>
            </select>
          </div>
          <div className="col-lg-3">
            <Datepicker handleDate={this.handleDate}/>
          </div>
        </div>
  
      </div>
    )
  }
}

export default DropDown


{/* <Container>
        <Row>
          <Col className="appointment_title col-lg-6 col-md-3" >Appointments Hub

          </Col>
          <Col className = "col-lg-2">
          <DropdownButton className = "drop_button" 
          id="dropdown-basic-button"
              title="All Requests">
              <Dropdown.Item href="#/action-1">New</Dropdown.Item>
              <Dropdown.Item href="#/action-2">In Progress</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Booked</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Confirmed</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col className = "col-lg-2">
          <DropdownButton className = "drop_button" 
          id="dropdown-basic-button"
              title="All Requests">
              <Dropdown.Item href="#/action-1">New</Dropdown.Item>
              <Dropdown.Item href="#/action-2">In Progress</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Booked</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Confirmed</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container> */}


{/* <DropdownButton className = "button-square" id="dropdown-basic-button" title="All Requests">
        <Dropdown.Item href="#/action-1">New</Dropdown.Item>
        <Dropdown.Item href="#/action-2">In Progress</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Booked</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Confirmed</Dropdown.Item>
      </DropdownButton> */}
