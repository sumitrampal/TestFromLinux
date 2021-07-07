import React from 'react'
import './Header.scss'
const Header = ({heading}) => {
  return(
    <div className="top-header">
      <div className="row">
        <div className="col-lg-6">
          <div className="top-heading">{heading}</div>
        </div>
      </div>
    </div>
  )
}
export default Header
