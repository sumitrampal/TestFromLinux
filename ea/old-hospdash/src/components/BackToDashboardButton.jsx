import React from 'react'
import {Link} from 'react-router-dom'
import './BackToDashboardButton.css'
const BackToDashboardButton = () => {
	return(
		<Link to="/dashboard"><div className="BackToDashboardButton">
			<p className="heading_text">Back to Dashboard</p>
		</div></Link>
	)
}
export default BackToDashboardButton