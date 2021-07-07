import React from 'react'
import './Disapproved.css'
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  warningIcon: {
    '& svg': {
      fontSize : 70,
      color: "#D99530"
    }
  }

}));

function Disapproved({data}) {
let rData=  data.bookingStatusInfo.history[1].metadata[0]
  const classes = useStyles();
  return (
    <div className="container quote_heading">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span>Quote Details</span>
          </div>
          <div className="col-lg-6">
            <h3>EAAP00123</h3>
          </div>
        </div>
      </div>
      <div className="warning">
        <div className="not_available">
        <IconButton className={classes.warningIcon}>
          <WarningIcon className />
          </IconButton>

          <h4>{rData.reason}</h4>
        </div>

      </div>
      <div className="remark">
        <p>Remarks</p>
        <textarea className="form-control" aria-label="With textarea" value={rData.remarks} style={{ color: "#5032D5" }}>
        </textarea>
      </div>
      <div className="disapproved">
        <span>Declined</span>
      </div>
    </div>
  )
}

export default Disapproved

