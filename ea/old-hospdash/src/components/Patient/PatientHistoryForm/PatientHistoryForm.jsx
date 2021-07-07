import React from 'react'
import './PatientHistoryForm.scss'
import {Row, Col} from 'react-bootstrap'
export default class PatientHistoryForm extends React.Component{ 
    componentDidMount(){
      if(this.props.data.bookingInfo.isMedication) {
        document.getElementById('MS-YES').setAttribute("checked", true)
        document.getElementById('MS-NO').setAttribute("disabled", true)
        }
      else {
        document.getElementById('MS-NO').setAttribute("checked", true)
        document.getElementById('MS-YES').setAttribute("disabled", true)
        }
        
    }
  render(){ 
    const patientDetails = {
      patientName : "Jordan D.",
      patientEmail: "jordan@gmail.com",
      purposeOfVisit: "Kidney Stone",
      phone: 9999900000,
      illness: ['Migrane', 'Depression', 'Asthama', 'Malaria'],
      conditions : ['Muscular', 'Gastrointestinal'],
      symptoms: ['Back Pain', 'Neck Pain', 'Nausea', 'Rectal Pain', 'Back Pain', 'Neck Pain', 'Nausea', 'Rectal Pain'],
    }
    let data=this.props.data
    console.log(data)
    return(
      <div className="patient-history-form">
        <h3 className="heading-text">Patient's History Form</h3>
        <h5 style={{color: "#707070", fontWeight:"600"}}>Patient’s past illnesses</h5>
        <Row style={{marginBottom : "40px"}}>
          <Col lg={7}>
            <div className="dashboard-grid-3">
              {
                data.bookingInfo.illnessHistory.map((illness, i)=> {
                  return <div className="dashboard-button" key={i}>{illness}</div>
                })
              }
            </div>
          </Col>
        </Row>

        <Row style={{marginBottom : "40px"}}>
           <Col lg={7}>
            <h5 style={{color: "#707070", fontWeight:"600"}}>Systems affected by current health situation</h5>
            <div className="dashboard-grid-3">
              {
                data.bookingInfo.medicalConditions.map((condition, i)=> {
                  return <div className="dashboard-button" key={i}>{condition}</div>
                })
              }
            </div>
          </Col>
        </Row>
         
        <Row style={{marginBottom : "40px"}}>
          <Col lg={7}>
            <h5 style={{color: "#707070", fontWeight:"600"}}>Symptoms patient is facing</h5>
            <div className="dashboard-grid-6">
              {
                data.bookingInfo.symptoms.map((symptom, i)=> {
                  return <div className="dashboard-button" key={i}>{symptom}</div>
                })
              }
            </div>
          </Col>
        </Row>
        <div className="row">
          <div className="col-lg-8 row">
            <h5 style={{color: "#707070", fontWeight:"600"}} className="col-lg-6">Patient Currently taking medications</h5>
            <div className="col-lg-6 row" style={{justifyContent: "space-evenly"}}>
              <div className="form-group "  style={{display:"inline-flex"}}>
                <label htmlFor="MS-YES">YES</label>
                <input style={{display:"block",width:"unset", marginLeft: "5px", marginTop:"5px"}} type="radio" name="medication-status" id="MS-YES" />
              </div>
              <div className="form-group " style={{display:"inline-flex"}}>
                <label htmlFor="MS-NO">NO</label>
                <input style={{display:"block",width:"unset", marginLeft: "5px", marginTop:"5px"}} type="radio" name="medication-status" id="MS-NO"/>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
        <Row style={{alignItems: "center", marginTop:"40px"}}>
          <Col lg={4}>
              <h5 style={{color: "#707070", fontWeight:"600"}}>Medication names with dosage</h5>
          </Col>
          <div className="col-lg-8 row">
            <textarea style={{width:"100%"}}>{data.bookingInfo.medications}</textarea>
          </div>
        </Row>
        <Row style={{alignItems: "center", marginTop:"40px"}}>
          <Col lg={4}>
              <h5 style={{color: "#707070", fontWeight:"600"}}>Additional information </h5>
          </Col>
          <div className="col-lg-8 row">
            <textarea style={{width:"100%"}}>{data.bookingInfo.additionalDetails}</textarea>
          </div>
        </Row>
          <h3 className="heading-text">Recommendations and Insurance</h3>
        <div className="row">
          <div className="col-lg-12">
            <div className="row" style={{alignItems:"center",marginTop:"20px"}}>
              <h5 className="col-lg-4" style={{color: "#707070", fontWeight:"600"}}>Recommended By</h5>
              <div className="col-lg-4"><input type="text" value={`Dr. ${data.bookingInfo.recommender?data.bookingInfo.recommender.firstName:("")}`}/></div>
              <div className="col-lg-4"><input type="text" value={data.bookingInfo.recommender?data.bookingInfo.recommender.lastName:("")}/></div>
            </div>
            <div className="row" style={{alignItems:"center",marginTop:"20px"}}>
              <h5 className="col-lg-4" style={{color: "#707070", fontWeight:"600"}}>Clinic or Hospital</h5>
              <div className="col-lg-8"><input type="text" value={data.bookingInfo.recommenderPlaceType}/></div>
            </div>
            <div className="row" style={{alignItems:"center",marginTop:"20px"}}>
              <h5 className="col-lg-4" style={{color: "#707070", fontWeight:"600"}}>Insurance Name</h5>
              <div className="col-lg-8"><input type="text" value={!data.bookingInfo.insurance? " " :data.bookingInfo.insurance.name }/></div>
            </div>
            <div className="row" style={{alignItems:"center",marginTop:"20px"}}>
              <h5 className="col-lg-4" style={{color: "#707070", fontWeight:"600"}}>Insurance number</h5>
              <div className="col-lg-8"><input type="text" value={!data.bookingInfo.insurance? " " :data.bookingInfo.insurance.number}/></div>
            </div> 
          </div>
        </div>
      </div>
    )
  }
}
