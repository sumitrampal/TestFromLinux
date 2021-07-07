import React from 'react'
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import './HospitalForm.css';
import axios from 'axios'
import {apiUrl} from '../../../config.json'
import LeegalityModal from '../../LeegalityModal'

function HospitalForm({data}) {
  let adData = data.bookingStatusInfo.metadata[0] 
  let [isResponse, setIsResponse] = React.useState(false)
  
  const setResponse = (res) => {
    setIsResponse(res)
  }
  function onFormSubmit(e){
    e.preventDefault()
  }
    let dOB= adData.dateOfBirth
    var year = Number(dOB.substr(0, 4));
    var month = Number(dOB.substr(5, 2));
    var day = Number(dOB.substr(8, 2));
    var today = new Date();
    var age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }
    
  console.log(data )
  let renderedEle = isResponse 
    ? (
      <p style={{color:"#000",fontWeight:500, marginTop:"12px", fontSize:"1.05rem"}}>
      <span style={{fontWeight:800, fontSize:"1.1rem",color:"#0c065e"}}>Please open the link shared on your register email for filling and signing the document. 
      Insurance form signing Procedure:</span><br/>
      <ol>
        <li>Open your registered email {localStorage.getItem('hospitalEmail')}</li>
        <li>Fill the insurance form as per patient request wherever required</li>
        <li>Upload hospital seal</li>
        <li>Submit</li>
        <li>Post submitting, signing request will be sent to doctor on their email id to sign</li>
        <li>After doctor's signature, signing request will be sent to patient's email to sign</li>
        <li>Further process will take place offline, post confirmation from insurance/ TPA</li>
      </ol> 
      </p>
        ) 
      : (
          <LeegalityModal data ={data} setResponse={res => setResponse(res)}/>
        ) 
  return (
    <div className="admissionHospitalForm">
        <div className="row">
          <div className="col-sm-6">
            <p className="p-green">Patient ID</p>
            <h1 style={{fontSize: '4vw'}}>EAS-{data.bookingStatusInfo.metadata[0].patientId.slice(-4)}</h1>
          </div>
          <div className="col-sm-3"></div>
          <div className="col-sm-3">
            <p className="p-green">Booking ID</p>
            <h2 style={{fontSize: '2vw'}} >EAS-{data.bookingStatusInfo.metadata[0].bookingId.slice(-4)}</h2>
          </div>
          {
            data.bookingInfo.leegalityData 
              ? <p style={{color:"#000",fontWeight:500, marginTop:"12px", fontSize:"1.05rem"}}>
                <span style={{fontWeight:800, fontSize:"1.1rem",color:"#0c065e"}}>Please open the link shared on your register email for filling and signing the document. 
                Insurance form signing Procedure:</span><br/>
                <ol>
                  <li>Open your registered email {localStorage.getItem('hospitalEmail')}</li>
                  <li>Fill the insurance form as per patient request wherever required</li>
                  <li>Upload hospital seal</li>
                  <li>Submit</li>
                  <li>Post submitting, signing request will be sent to doctor on their email id to sign</li>
                  <li>After doctor's signature, signing request will be sent to patient's email to sign</li>
                  <li>Further process will take place offline, post confirmation from insurance/ TPA</li>
                </ol> 
                </p>
              :  data.bookingInfo.paidByInsurance ? renderedEle  : (<></>)
            
          }
          <Form onSubmit={onFormSubmit} className="container" style={{paddingTop:"unset"}}>

            <Row hos_form className="justify-content-between">
              <Col md={12} lg={6}>
                <FormGroup className="row" >
                  <Label className="col-lg-5" style={{ fontSize: 18 }}>Patient full name</Label>
                  <Input className="col-lg-7 col-sm-12" type="text" value= {adData.patientFullName} name="fullname" id="name" />
                </FormGroup>
              </Col>
              <Col sm={12} md={6} lg={3}>
                <FormGroup className="row justify-content-between">
                  <Label className="col-lg-3" style={{ fontSize: 19 }}>Age</Label>
                  <Input className="col-lg-8" type="text" value={age}  name="age" id="age"/>
                </FormGroup>
              </Col>
              <Col sm={12} md={6} lg={3} >
                <FormGroup className="row justify-content-between" >
                  <Label className="col-lg-2" style={{ fontSize: 19 }}>Gender</Label>
                  <Input className="col-lg-7" type="text" value={adData.gender}  name="gender" id="gender"/>
                </FormGroup>
              </Col>
            </Row>
            <Row hos_form className="justify-content-between">
              <Col s={12} md={6}>
                <FormGroup className="row" >
                  <Label className="col-lg-5" style={{ fontSize: 18 }}>Contact email</Label>
                  <Input className="col-lg-7" type="text" value= {adData.email} name="email" id="email" />
                </FormGroup>
              </Col>
              <Col s={12} md={6}>
                <FormGroup className="row">
                  <Label className="col-lg-5" style={{ fontSize: 19 }}>Contact number</Label>
                  <Input className="col-lg-7" type="text" value= {adData.phone} name="phone" id="phone"/>
                </FormGroup>
              </Col>
            </Row>
            <Row hos_form >
            <div className=" mr-1" ></div>
              <Label className="col-lg-2" style={{ fontSize: 18 }}>Residential Address</Label>
              <textarea className="col-lg-9 ml-3"  value={adData.address} type="text"  name="address" id="address"></textarea>
            </Row>
            
            <Row hos_form className="justify-content-between mt-3">
              <Col s={12} md={6}>
                <FormGroup className="row" >
                  <Label className="col-lg-5" style={{ fontSize: 18 }}>Bed Category</Label>
                  <Input className="col-lg-6" type="text" value={data.bedInfo.bedInfo.bedType} name="bedcategoryId" id="bedcategoryId" />
                </FormGroup>
              </Col>
              <Col s={12} md={5}></Col>
            </Row>
            
            <Row hos_form className="justify-content-between mt-2">
              <Col s={12} md={6}>
                <FormGroup className="row" >
                  <Label className="col-lg-5" style={{ fontSize: 18 }}>Admission Date</Label>
                  <Input className="col-lg-6" type="text" value={adData.admissionDate} name="admissionDate" id="admissionDate" />
                </FormGroup>
              </Col>
              <Col s={12} md={5}></Col>
            </Row>
            
            <Row hos_form className="justify-content-between">
              <Col s={12} md={6}>
                <FormGroup className="row" >
                  <Label className="col-lg-5" style={{ fontSize: 18 }}>Referenced by</Label>
                  <Input className="col-lg-6" type="text" value={adData.referredBy}  name="referredBy" id="referredBy" />
                </FormGroup>
              </Col>
              <Col s={12} md={5}></Col>
            </Row>
            
            
            <Row hos_form className="justify-content-between">
              <Col s={12} md={6}>
                <FormGroup className="row" >
                  <Label className="col-lg-5" style={{ fontSize: 18 }}>Name of Relative</Label>
                  <Input className="col-lg-6" type="text" value={adData.relativeName}  name="relativeName" id="relativeName" />
                </FormGroup>
              </Col>
              <Col s={12} md={5}></Col>
            </Row>
            <Row hos_form className="justify-content-between">
              <Col s={12} md={6}>
                <FormGroup className="row" >
                  <Label className="col-lg-5" style={{ fontSize: 18 }}>Relative Phone No.</Label>
                  <Input className="col-lg-6" type="text" value={adData.relativePhone}  name="relativePhone" id="relativePhone" />
                </FormGroup>
              </Col>
              <Col s={12} md={5}></Col>
            </Row>
           
            <Row style={{width:"99%", margin:"40px auto"}}>
              <p style={{fontSize:"14px", fontWeight:"500",color:"#000"}}>
                1. While taking- admission I/We, have read & understood all the charges of your hospital, which will accrued during the hospitalisation I/We have been told & understood the payment terms & conditions since admission tlll discharge. I/ We hereby promise you that I/ We shall pay aII dues, ln time, of my/ our patient, start from first deposit till discharge, accordingly to your terms & conditions of payment. I assure you that complete payment of the bill of My/Our patient wlll be made prior to discharge. <br/><br/>
                2. I am aware that hospital discharge time is 10.00 a.m. <br/><br/>
                3. I know that your hospital is not responsible for loss of any valuable possession / Jewellery / Cash of the patient or relatives of patient. All valuables are kept entirely at our/my risk. <br/><br/>
                4. If you are having Mediclaim(cashless), please produce the relevant document at the time of admission. <br/><br/>
                5. You are requested to submit photo identity of the patient at the time of admission. <br/><br/><br/><br/>
                We/I give consent to: <br/><br/>
                1. Indoor Hospitaf admission <br/>
                2.the admiration of such treatment as is necessary, performance of any diagnosis biopsy transfusion or operation and to for admiration of any anesthetics as may be deemed advisable in the course of hospital admission <br/>
                3. the release of professional and/ or the information from the medical record as may be deemed necessary, in accordance with rules and policies of the hospital
              </p>
            </Row>
            <div style={{width:"99%", margin:"80px auto"}}>
              <FormGroup className="row">
                <Label style={{ fontSize: 18 }}  className="col-lg-4"><h2 style={{color: "#666666"}}>Witness</h2></Label>
                <Input type="text" name="witness"  value={adData.witness} className="col-lg-8" id="witness" />
              </FormGroup> 
            </div> 
          </Form>
          
        </div>
      </div>
  )
}

export default HospitalForm
