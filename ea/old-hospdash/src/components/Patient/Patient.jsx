import React, {useState, useEffect} from 'react'
import {Container} from 'react-bootstrap'
import Navigation from '../Navigation/Navigation'
import Header from '../Header/Header'
import Heading from './Heading/Heading'
import PatientDetails from './PatientDetailsForm/PatientDetails'
import PatientHistoryForm from './PatientHistoryForm/PatientHistoryForm'
import Records from './PatientHistoryForm/Records/Records'
import BackToDashboardButton from '../BackToDashboardButton'
function Patient(props) {
//let data = props.location.state.data
let unparseddata = localStorage.getItem("patientObj")
let data = JSON.parse(unparseddata)
const images = [
  "https://ik.imagekit.io/hbj42mvqwv/report_cegat_page1_yS1kTfuyk.png",
  "https://ik.imagekit.io/hbj42mvqwv/dual_monitor_wallpapers_geralt_ciri_pack_left_EN_FLffoU7Mhb.png",
  "https://ik.imagekit.io/hbj42mvqwv/Witcher_3_Wild_Hunt__The_-__wallpaper_5_dPdvHEA4f.jpg",
  "https://ik.imagekit.io/hbj42mvqwv/wallpaper_5120_witcher_3_wild_hunt_the_blood_and_wine_iC5op98cT.jpg",
  "https://ik.imagekit.io/hbj42mvqwv/ACO_ogobalvcS.png",
];
const renderedEle = (data.bookingInfo.relatedDocuments.length !== 0 || data.bookingInfo.insurance) ? (<Records images={images} data={data}/>) : (<></>)
  return (
    <div>
      <Header heading="Patient Request"/>
      <Container>
        <div className="row">
          <div className="col-lg-3">
            <Navigation active="patientRequest"/>
          </div>
          <div className="col-lg-9">
          <BackToDashboardButton/>
            <Heading/>
            <PatientDetails data={data}/>
            <PatientHistoryForm data={data}/>
            {renderedEle}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Patient
