import React from 'react'
import './Quote.css'
function Quote({data}) {
console.log(data)
let rData=  data.bookingStatusInfo.history[1].metadata[0]
  return (
    <div className="quote_heading">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span>Quote Details</span>
          </div>
        <div className="col-lg-6">
          <h3>EAS-{ data.patientInfo._id.slice(-4)}</h3>
        </div>
        </div>

        <div className = "container-fluid">
          <div className="row deposit">
            <div className="col-lg-6">
              <span>Deposit Amount (INR ₹)</span>
            </div>
            <div className="col-lg-6">
              <input type="text" value={rData.depositFeeBreakup.deposit} />
            </div>
          </div>
        </div> 

        <div className = "container-fluid">
          <div className="row treatment">
            <div className="col-lg-6">
              <span>Treatment Charges (INR ₹)</span>
            </div>
            <div className="col-lg-6">
              <input type="text" value={rData.estimatedFeeBreakup.treatmentFee}/>
            </div>
          </div>
        </div>

        <div className = "container-fluid">
          <div className="row treatment">
            <div className="col-lg-6">
              <span>Total estimated cost (INR ₹)</span>
            </div>
            <div className="col-lg-6">
              <input type="text" value={rData.totalEstimatedCost} />
            </div>
          </div>
        </div>
        <div className = "container-fluid">
          <div className="row treatment">
            <div className="col-lg-6">
              <span>Do you have tie up with insurance company given by patient?</span>
            </div>
            <div className="col-lg-6">
              <input type="text" value={rData.isTied === "true" ? "YES" : "NO"} />
            </div>
          </div>
        </div>

      </div>



      <div className="remark">
        <p>Remarks</p>
        <p>{rData.remarks}</p>
      </div>

      <div className = "approved">
        
          <span>Approved</span>
    
      </div>

    </div>
  )
}

export default Quote
