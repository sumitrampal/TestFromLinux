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

function ApproveModal({bookingId}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('')
  const [isTied, setTied] = useState("")
  const [treatmentCharges, setTreatmentCharges] = useState('')
  const [totalEstimatedCost, setTotalEstimatedCost] = useState('')
  const [remarks, setRemarks] = useState('')
  let unparseddata = localStorage.getItem("patientObj")
  let data = JSON.parse(unparseddata)
  console.log(data)
  const handleOpen = () => {
    setOpen(true);
  };
  let totaldepositfee = ''
  React.useEffect(() => {
    let totaldepositfee = depositAmount + 299
  }, [depositAmount])

  const handleClose = () => {
    setOpen(false);
  };
  async function sendQuotation() {
    if(depositAmount !== '' && treatmentCharges !== '' && remarks !== '' )
    {
      await axios.post(`${apiUrl}/users/booking/approvalresponse`, {
        bookingStatus: 'DEPOSIT_CHARGES_PENDING',
        metadata: [{
          "isTied": isTied,
          "totalDepositFee" : parseInt(depositAmount) + 299,
          "depositFeeBreakup": {
              "easyFee": '299',
              "deposit": depositAmount
          },
          "totalEstimatedCost": parseInt(depositAmount) + parseInt(treatmentCharges),
          "estimatedFeeBreakup": {
              "bedBookingFee": data.bedInfo.bedInfo.pricePerDay,
              "treatmentFee": treatmentCharges,
              "deposit": depositAmount
          },
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
  const body = (
    <div className={classes.paper}>
      <div>
        <div className="container" style={{paddingTop: "20px", position:"relative"}}>
                  <p className="remove-doc" style={{cursor:"pointer"}} onClick = {() => setOpen(false)} >x</p>
          <div className="row">
            <div className="col-lg-6">
              <span style={{fontWeight:"600"}}>Quote Details</span>
            </div>
            <div className="col-lg-6" style={{fontSize: "42px"}}>
              <h3>EAAP00123</h3>
            </div>
          </div>

          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="container" style={{paddingTop: "20px"}}>
              <div className="container-fluid">
                <div className="row ">
                  <div className="col-lg-6">
                    <span>Deposit Amount (INR ₹) <span style={{color: "red"}}>*</span></span>
                  </div>
                  <div className="col-lg-6">
                    <input type="number" onChange={(e) => setDepositAmount(e.target.value)}/>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row treatment">
                  <div className="col-lg-6">
                    <span>Treatment Charges (INR ₹) <span style={{color: "red"}}>*</span></span>
                  </div>
                  <div className="col-lg-6">
                    <input type="number"  onChange={(e) => setTreatmentCharges(e.target.value)}/>
                  </div>
                </div>
              </div>
             
              <div className="container-fluid">
                <div className="row treatment">
                  <div className="col-lg-6">
                    <span>Total estimated cost (INR ₹)
                    <span style={{color: "red"}}>*</span> 
                    </span>
                  </div>
                  <div className="col-lg-6">
                    <input type="text"  value={parseInt(depositAmount) + parseInt(treatmentCharges)}/>
                  </div>
                </div>
              </div>
              {
                data.bookingInfo.insurance !== null 
                  ? (
                    <div className="container-fluid">
                      <div className="row treatment">
                        <div className="col-lg-6">
                          <span> Do you have tie up with insurance company given by patient?
                          {/* <span style={{color: "red"}}>*</span> */}
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <label>Yes<input type="radio" required name="isTied" onChange={(e) => setTied("true")} className="mr-5"/></label>
                          <label>No<input type="radio" name="isTied" onChange={(e) => setTied("false")}/></label>
                        </div>
                      </div>
                    </div>
                  )
                  : (<></>)
              }

            </div>

            <div className="" style={{width: "90%", margin:"20px auto"}}>
              <span>Remarks  <span style={{color: "red"}}>*</span></span>
              <textarea onChange={(e) => setRemarks(e.target.value)} className="text_remark"style={{width: "100%"}}></textarea>
            </div>
            <p style={{color: "red"}} id="err-line">Please fill mandatory fields</p>
             <p style={{color:"green"}} id="succ-saved">Sent</p>
            <div style={{width: "90%", margin:"auto"}} className="row justify-content-between">
              <div onClick = {() => setOpen(false)} className="cancel_button">Cancel</div>
              <div className="Send_button" onClick={sendQuotation}>Send Quotation</div>
            </div>
            <div className = "mb-4"> </div>

          </form>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" className="modal_approve"
        onClick={handleOpen}>
        Approve
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

export default ApproveModal
