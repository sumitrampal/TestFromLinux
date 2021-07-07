import React,{useEffect} from 'react';
import Appointment from '../Appointment/Appointment';
import axios from 'axios'
import { apiUrl } from "../../config.json";
import Patientdetail from '../Patientsdetail/Patientdetail'; 
class Dashboard extends React.Component{
   constructor(props){
     super(props)
     this.state = ({
       data: [],
       filteredData: []
     })
     this.handleDateChange = this.handleDateChange.bind(this)
     this.handleFilterChange = this.handleFilterChange.bind(this)
   }
  componentDidMount(){
    const token = localStorage.getItem("hospitaldashtoken")
    if(!token ) {
    this.props.history.history.push("/")
    } 
    axios
    .get(`${apiUrl}/hospitaldashboard/fetchbookingrequests`, {
      headers: {
        authorization: localStorage.getItem("hospitaldashtoken"),
      },
    })
    .then( (response) => {
      this.setState({
        data: response.data.Result,
        filteredData: response.data.Result,
      }); 
    });  
  }
  
  handleFilterChange(filter){
    let filteredArray = "";
    if (filter === "all") {
      this.setState({ filteredData: this.state.data });
      let today = new Date();
      let dd = String(today.getDate())
      let mm = String(today.getMonth() + 1)
      let yyyy = today.getFullYear();

      let tod = yyyy + '-' + mm + '-' + dd;
      localStorage.setItem("TODATE", tod)
    } else if (filter === "new") {
      filteredArray = this.state.data.filter(
        (data) =>
          data.bookingStatusInfo.bookingStatus === "BOOKING_REQUEST_TO_HOSPITAL"
      );
      this.setState({ filteredData: filteredArray });
    } else if (filter === "pending") {
      filteredArray = this.state.data.filter(
        (data) =>
          data.bookingStatusInfo.bookingStatus === "ADMISSION_FORM_PENDING"
      );
      this.setState({ filteredData: filteredArray });
    } else if (filter === "approved") {
      filteredArray = this.state.data.filter(
        (data) =>
          data.bookingStatusInfo.bookingStatus === "DEPOSIT_CHARGES_PENDING"
      );
      this.setState({ filteredData: filteredArray });
    } else if (filter === "booked") {
      filteredArray = this.state.data.filter(
        (data) => data.bookingStatusInfo.bookingStatus === "PAYMENT_SUCCESS"
      );
      this.setState({ filteredData: filteredArray });
    } else if (filter === "confirmed") {
      filteredArray = this.state.data.filter(
        (data) => data.bookingStatusInfo.bookingStatus === "BOOKING_CONFIRMED"
      );
      this.setState({ filteredData: filteredArray });
    } else if (filter === "rejected") {
      filteredArray = this.state.data.filter(
        (data) =>
          data.bookingStatusInfo.bookingStatus === "BOOKING_REQUEST_DENIED"
      );
      this.setState({ filteredData: filteredArray });
    } else {
      this.setState({ filteredData: this.state.data });
    }
  };
    //Date changing filter function
    handleDateChange(date) {
      let filteredArray = ""
      console.log("app", date)
      filteredArray=this.state.data.filter((da)=>{
        let bookingDate = da.bookingInfo.dateOfBooking === null ? new Date() : new Date(da.bookingInfo.dateOfBooking)
        let v = `${bookingDate.getFullYear()}-${bookingDate.getMonth()+1}-${bookingDate.getDate()}`
        console.log("V", v)
        return v === date
      });
      console.log(filteredArray)
      this.setState({ filteredData: filteredArray}) 
    }
  render(){
    return(
      <div>
        <Appointment 
          handleFilterChange={(filter) =>
            this.handleFilterChange(filter)
          }
          handleDateChange={(date) => this.handleDateChange(date)} />
        <Patientdetail history={this.props.history} data={this.state.filteredData}/>
      </div> 
    )
  }
}
export default Dashboard