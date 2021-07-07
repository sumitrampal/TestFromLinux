import React from 'react'
import NavBar from '../NavBar/NavBar';
import './Action.css'
import {Container} from 'react-bootstrap'
import Quote from './QuoteDetails/Quote';
import Navigation from '../Navigation/Navigation'
import Header from '../Header/Header'
import axios from 'axios'
import {apiUrl} from '../../config.json'
import Disapproved from "./Disapproved";
import BackToDashboardButton from '../BackToDashboardButton'

function Action() {
let unparseddata = localStorage.getItem("patientObj")
let data = JSON.parse(unparseddata)
console.log(data)
React.useEffect(()=> {
  axios.get(`${apiUrl}/users/booking/detail/hospital/${data.bookingStatusInfo.bookingId}`, {headers: {authorization : localStorage.getItem("hospitaldashtoken")}}).then(res => console.log(res))
},[])
let renderedEle
if(data.bookingStatusInfo.bookingStatus === 'BOOKING_REQUEST_DENIED')
{
  renderedEle = (<Disapproved data={data}/>)
}
else if(data.bookingStatusInfo.bookingStatus === "BOOKING_REQUEST_TO_HOSPITAL")
{
  renderedEle = (<h1>No Action Taken Yet</h1>)
}
else if(data.bookingStatusInfo.bookingStatus === "BOOKING_REQUEST_TO_HOSPITAL")
{
  renderedEle = (<h1>No Action Taken Yet</h1>)
}
else {
  renderedEle = (<Quote data={data}/>)
}
  return (
    <div>
      <Header heading="Action Taken"/>
      <Container>
        <div className="row">
          <div className="col-lg-3">
            <Navigation active="actionTaken"/>
          </div>
          <div className="col-lg-9">
          <BackToDashboardButton/>
            {renderedEle}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Action
