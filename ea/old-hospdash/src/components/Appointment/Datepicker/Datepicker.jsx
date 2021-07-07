import React, { useState } from 'react';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import './Datepicker.css' 
function Datepicker({handleDate}) {
  
  const [selectedDate, setselectedDate] = useState(localStorage.getItem("TODATE"))
// selectedDate = tod
  // const [selectedDate, setselectedDate] = useState(tod)
  const handleDateChange = (date) => {
    let today = new Date(date);
  let dd = String(today.getDate())
  let mm = String(today.getMonth() + 1)
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  setselectedDate(today)
  localStorage.setItem("TODATE", today)
    // selectedDate = today;
    console.log(selectedDate);
  handleDate(today)    
    
    }
 

  return (
    <div >
      <MuiPickersUtilsProvider 
      utils={DateFnsUtils}
      >
          <KeyboardDatePicker
            className="date_pick"
            disableToolbar
            variant='inline'
            format='yyyy/MM/dd'
            margin = 'normal'
            id='date-picker'
            value={localStorage.getItem("TODATE")}
            onChange={handleDateChange}
            InputProps={{
              disableUnderline: true,
             }}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
      </MuiPickersUtilsProvider>

    </div>
  )
}

export default Datepicker
