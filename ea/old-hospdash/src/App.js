import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginForm from "./components/Login/LoginForm";
import Patient from "./components/Patient/Patient";
import Action from "./components/Action Taken/Action";
import AdmissionForm from "./components/AdmissionForm/AdmissionForm";
import { apiUrl } from "./config.json";
import "./App.scss";
import Disapproved from "./components/Action Taken/Disapproved";
import NavBar from "./components/NavBar/NavBar";
import ApproveModal from "./components/ApproveModal";
import DisapproveModal from "./components/DisapproveModal";
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
    };
  }
  async componentDidMount() {
    
  let today = new Date();
  let dd = String(today.getDate())
  let mm = String(today.getMonth() + 1)
  let yyyy = today.getFullYear();

  let tod = yyyy + '-' + mm + '-' + dd;
  localStorage.setItem("TODATE", tod)
    await axios
      .get(`${apiUrl}/hospitaldashboard/fetchbookingrequests`, {
        headers: {
          authorization: localStorage.getItem("hospitaldashtoken"),
        },
      })
      .then((response) => {
        this.setState({
          data: response.data.Result,
          filteredData: response.data.Result,
        });
      });
    console.log(this.state.data);
  }
  handleFilterChange = (filter) => {
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
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route
              component={(history) => <LoginForm history={history} />}
              exact
              path="/"
            />
            <Route
              component={(history) => (
                <Dashboard
                  data={this.state.filteredData}
                  handleFilterChange={(filter) =>
                    this.handleFilterChange(filter)
                  }
                  handleDateChange={(date) => this.handleDateChange(date)}
                  history={history}
                />
              )}
              path="/dashboard"
            />

            <Route component={() => <Patient />} path="/patientdetail" />
            <Route component={Action} path="/action" />
            <Route component={AdmissionForm} path="/admissionform" />
            <Route component={Disapproved} path="/disapproved" />
            <Route component={ApproveModal} path="/approvedmodal" />
            <Route component={DisapproveModal} path="/disapprovedmodal" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
