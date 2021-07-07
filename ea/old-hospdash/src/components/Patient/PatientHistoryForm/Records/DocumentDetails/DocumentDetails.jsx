import React from 'react'
// import { FaFileMedical,FaFilePrescription,FaFileInvoice } from "react-icons/fa"
import { Button } from 'reactstrap'
const DocumentDetails = ({data}) => {
  return(
    <div style={{padding: "20px"}}>
      <h5 style={{color: "#707070"}}>Document Details</h5>
      <div className="mt-3">
      <p style={{color: "#707070"}}>Title</p>
      <input type="text" style={{padding: "0.25rem"}} value={data.title} />
      </div>
      {
        data.docType !== "Insurance" ? (<div className="mt-3">
        <p style={{color: "#707070"}}>Date of Visit</p>
        <input type="text" style={{padding: "0.25rem"}} value={data.date}/>
        </div>) : (<></>)
      }

      <Button className='record-type-button' style={{background:"#644CCD", margin:"20px 80px"}} >
          {/*<FaFileMedical size='2.5em' className='custom-icon'  />*/}
          <br />
          <span>{data.docType}</span>
      </Button>
    </div>
  )
}
export default DocumentDetails
