import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './ApproveModal.css'
import axios from 'axios'
import {apiUrl} from '../config.json'
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 3, 0),
    outline: 'none',
    borderRadius: 15,
  },
}))
function LeegalityModal({data, setResponse}) { 
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [doctorName, setDoctorName] = useState('')
  const [doctorEmail, setDoctorEmail] = useState('')
  const [doctorPhone, setDoctorPhone] = useState('')    
  let [isResponse, setIsResponse] = React.useState(false)
  const handleOpen = () => {
    setOpen(true);
  };
   
function leegalityInitiate(){
    axios.post(`${apiUrl}/hospitaldashboard/leegality`, {
      bookingId:data.bookingInfo._id,
      patientId:data.patientInfo._id,
      workflowId:data.bookingInfo.workflowId,
      userId: data.bookingInfo.createdBy,
      doctorName: doctorName,
      doctorEmail: doctorEmail,
      doctorPhone: doctorPhone
    }, {
      headers: {
        authorization: localStorage.getItem("hospitaldashtoken")
      }
    }).then(res => {
      console.log(res)
      if(res.data.documentId){
        handleClose()
        setResponse(true)}
        
    })
  }
  React.useEffect(() => {
     
  }, [ ])

  const handleClose = () => {
    setOpen(false);
  };
  async function sendQuotation() {
    if(doctorName !== '' && doctorEmail !== '')
    {
        leegalityInitiate()
    }
    else {
      document.getElementById('err-line').style.display="block"
    }
  }
  const body = (
    <div className={classes.paper}>
      <div>
        <div className="container" style={{paddingTop: "20px", position:"relative"}}>
                  <p className="remove-doc" style={{cursor:"pointer"}} onClick = {() => setOpen(false)} >x</p>
          <div className="row">
            <div className="col-lg-10">
              <span style={{fontWeight:"600"}}>Insurance Signee Doctor's info</span>
            </div> 
          </div>

          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="container" style={{paddingTop: "20px"}}>
              <div className="container-fluid">
                <div className="row ">
                  <div className="col-lg-6">
                    <span>Doctor's Name<span style={{color: "red"}}>*</span></span>
                  </div>
                  <div className="col-lg-6">
                    <input type="text" onChange={(e) => setDoctorName(e.target.value)}/>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row treatment">
                  <div className="col-lg-6">
                    <span>Doctor's Email<span style={{color: "red"}}>*</span></span>
                  </div>
                  <div className="col-lg-6">
                    <input type="text"  onChange={(e) => setDoctorEmail(e.target.value)}/>
                  </div>
                </div>
              </div>
             
              <div className="container-fluid">
                <div className="row treatment">
                  <div className="col-lg-6">
                    <span>Doctor's Phone Number 
                    </span>
                  </div>
                  <div className="col-lg-6">
                    <input type="text"  onChange={(e) => setDoctorPhone(e.target.value)}/>
                  </div>
                </div>
              </div> 
            </div>
 
            <p style={{color: "red"}} id="err-line">Please fill mandatory fields</p>
             <p style={{color:"green"}} id="succ-saved">Sent</p>
            <div style={{width: "90%", margin:"40px auto"}} className="row justify-content-between">
              <div onClick = {() => setOpen(false)} className="cancel_button">Cancel</div>
              <div className="Send_button" onClick={sendQuotation}>Start</div>
            </div>
            <div className = "mb-4"> </div>

          </form>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" className="insurance-btn"
        onClick={handleOpen}>
        Initiate Insurance Process
      </button> 
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}

export default LeegalityModal
