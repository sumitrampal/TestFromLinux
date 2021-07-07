import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './DisapproveModal.css';
import axios from 'axios'
import {apiUrl} from '../config.json'


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding:"20px 40px",
    outline: 'none',
    borderRadius: 15,
  },
}))

function DisapproveModal({bookingId}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(null)
  const [remarks, setRemarks] = useState('')

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function sendFeedback() {
    if(remarks !== '')
    {
      await axios.post(`${apiUrl}/users/booking/approvalresponse`, {
        bookingStatus: 'BOOKING_REQUEST_DENIED',
        metadata: [{
          "reason": reason,
          "remarks": remarks
        }],
        bookingId : bookingId
      }, {
        headers: {
          authorization: localStorage.getItem("hospitaldashtoken")
        }
      }).then(response => {
        console.log(response)
        
      document.getElementById('succ-saved').style.display="block"  
      })
    }
    else {
      document.getElementById('err-line').style.display="block"
    }
  }
  const checkboxCheck = (id) => {
    if(document.getElementById(id).value === reason) {
      document.getElementById(id).checked = false
      setReason(null)
    }
  }
  const body = (
    <div className={classes.paper}>
      <div style={{position:"relative"}}>
        <p className="remove-doc" style={{cursor:"pointer"}} onClick = {() => setOpen(false)} >x</p>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <span style={{fontWeight:"600"}}>Feedback</span>
            </div>
            <div className="col-lg-6">
              <h3>EAAP00123</h3>
            </div>
          </div> 
        </div>
          <form onSubmit={(e) => e.preventDefault()}> 
            <div className="">
              <div className="row">
                <div className="col-lg-6" style={{padding:"0"}}>
                  <div className="Select_button"><label htmlFor="btn_1">Doctors not available</label> <input onClick={() => checkboxCheck("btn_1")}  type="radio" id="btn_1" onChange={(e) => setReason(e.target.value)} name="reason" value="Doctors not available" /></div>
                </div>
                <div className="col-lg-6" style={{padding:"0"}}>
                  <div className="Select_button"><label htmlFor="btn_2">Speciality not available</label> <input onClick={() => checkboxCheck("btn_2")}  type="radio" name="reason" onChange={(e) => setReason(e.target.value)}  id="btn_2"value="Speciality not available" /></div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="row">
                <div className="col-lg-6" style={{padding:"0"}}> 
                  <div className="Select_button"  ><label htmlFor="btn_3">Bed not available</label> <input onClick={() => checkboxCheck("btn_3")} type="radio" id="btn_3" onChange={(e) => setReason(e.target.value)} name="reason" value="Bed not available" /></div>
                </div>
                <div className="col-lg-6" style={{padding:"0"}}> 
                  <div className="Select_button" ><label htmlFor="btn_4">Insufficient Documents</label> <input onClick={() => checkboxCheck("btn_4")} type="radio" id="btn_4" onChange={(e) => setReason(e.target.value)} name="reason" value="Insufficient Documents " /></div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="">
                <span>Remarks  <span style={{color: "red"}}>*</span></span>
                <textarea onChange={(e) => setRemarks(e.target.value)} className="text_remark"></textarea>
              </div>
            <p style={{color: "red"}} id="err-line">Please fill mandatory fields</p>
              
            <p style={{color:"green"}} id="succ-saved">Sent</p>
              <div style={{ margin:"auto"}} className="row">
                <div onClick={() => setOpen(false)} className="cancel_button">Cancel</div>
                <div className="Send_button" onClick={sendFeedback}>Send Feedback</div>
              </div>
            </div>
          </form>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" className="modal_disapprove"
        onClick={handleOpen}>
        Disapprove
      </button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  )
}

export default DisapproveModal
