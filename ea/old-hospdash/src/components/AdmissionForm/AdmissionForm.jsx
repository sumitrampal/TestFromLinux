import React from 'react'
import {Container} from 'react-bootstrap'
import Navigation from '../Navigation/Navigation'
import Header from '../Header/Header'
import AdmissionFormHeading from './AdmissionFormHeading/AdmissionFormHeading'
import HospitalForm from './AdmissionHospitalForm/HospitalForm'
import BackToDashboardButton from '../BackToDashboardButton'


function AdmissionForm() {
let unparseddata = localStorage.getItem("patientObj")
let data = JSON.parse(unparseddata)
  return (
    <div>
      <Header heading="Admission Form"/>
      <Container>
        <div className="row">
          <div className="col-lg-3">
            <Navigation active="admissionForm"/>
          </div>
          <div className="col-lg-9">
          <BackToDashboardButton/>
            <AdmissionFormHeading/>
            <HospitalForm data={data}/>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AdmissionForm
