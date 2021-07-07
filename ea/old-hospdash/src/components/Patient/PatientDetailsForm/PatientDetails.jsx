import React from 'react'
import './PatientDetails.css'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApproveModal from '../../ApproveModal'
import DisapproveModal from '../../DisapproveModal'
function PatientDetails({data}) {
  console.log(data)
   let dOB= data.patientInfo.dateOfBirth
          var year = Number(dOB.substr(0, 4));
          var month = Number(dOB.substr(5, 2));
          var day = Number(dOB.substr(8, 2));
          var today = new Date();
          var age = today.getFullYear() - year;
          if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
            age--;
          }
  let bookingDate = new Date(data.bookingInfo.bookingTime).toDateString()
  var months = ""
  var month = bookingDate.slice(4,7)
  var date = bookingDate.slice(8,10)
  return (
    <div>
      <div className="patient_form" >
        <div><h1>EAS-{data.patientInfo._id.slice(-4)}</h1></div>
        <Row>
          <Col lg={8}>
            <Row className="justify-content-between">
              <Col md={12} lg={9}>
                <FormGroup className="row" >
                  <Label className="col-lg-6" style={{ fontSize: 18 }}>Patient full name</Label>
                  <Input className="col-lg-6 col-sm-12" type="text" value= {data.patientInfo.fullName} />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm={12} md={6} lg={8}>
                <FormGroup className="row justify-content-between">
                  <Label className="col-lg-3" style={{ fontSize: 19 }}>Age</Label>
                  <Input className="col-lg-6" type="text" value={age} />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-between">
              <Col sm={12} md={6} lg={8}>
                <FormGroup className="row" >
                  <Label className="col-lg-6" style={{ fontSize: 18 }}>Contact email</Label>
                  <Input className="col-lg-6" type="text" value= {data.patientInfo.email} />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm={12} md={6} lg={7} >
                <FormGroup className="row justify-content-between" >
                  <Label className="col-lg-6" style={{ fontSize: 19 }}>Gender</Label>
                  <Input className="col-lg-5" type="text" value= {data.patientInfo.gender} />
                </FormGroup>
              </Col>
            </Row>
            <Row >
              <Col s={12} md={8}>
                <FormGroup className="row">
                  <Label className="col-lg-6" style={{ fontSize: 19 }}>Contact number</Label>
                  <Input className="col-lg-6" type="text" value= {data.patientInfo.phone} />
                </FormGroup>
              </Col>
            </Row>
            <Row >
              <Col s={12} md={8}>
                <FormGroup className="row">
                  <Label className="col-lg-6" style={{ fontSize: 19 }}>Purpose of Visit</Label>
                  <Input className="col-lg-6" type="text" value= {data.bookingInfo.purposeOfVisit} />
                </FormGroup>
              </Col>
            </Row>
            <Row >
              <Col s={12} md={8}>
                <FormGroup className="row">
                  <Label className="col-lg-6" style={{ fontSize: 19 }}>Illness Selected</Label>
                  <Input className="col-lg-6" type="text" value= {data.bookingInfo.currentIllness} />
                </FormGroup>
              </Col>
            </Row>
            {data.bookingInfo.paidByInsurance ? <Row >
              <Col s={12} md={8}>
                <FormGroup className="row">
                  <Label className="col-lg-6" style={{ fontSize: 19 }}>Payment Method</Label>
                  <Input className="col-lg-6" type="text" value= {data.bookingInfo.paidByInsurance ? "Insurance Pay" : "Self Pay"} />
                </FormGroup>
              </Col>
            </Row> : (<></>)}
            
          </Col>
          <Col lg={4}>
            <Row className="justify-content-between">
              <Col lg={5}>
                <div className="blue-card">
                  {data.bedInfo.bedInfo.bedType}
                </div>
              </Col>
              <Col lg={2}><h4>On</h4></Col>
              <Col lg={5}>
                <div className="blue-card">
                  <div><span>{date}</span><br/>{month}</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6}></Col>
          <Col lg={6} style={{display : localStorage.getItem("actionDisplay")}}>
            <Row >
              <Col lg={6}>
                {/*<button className="action-btn" id="approve-btn">Approve</button>*/}
                <ApproveModal bookingId={data.bookingStatusInfo.bookingId} ppd={data.bedInfo.bedInfo.pricePerDay}/>
              </Col>
              <Col lg={6}>
                {/*<button className="action-btn" id="disapprove-btn">Dispprove</button>*/}
                <DisapproveModal bookingId={data.bookingStatusInfo.bookingId}/>
              </Col>
            </Row>

          </Col>
        </Row>
      </div>

    </div>

  )
}

export default PatientDetails
