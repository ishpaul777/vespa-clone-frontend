import React from 'react'
import '../assets/scooter.css'

function ScooterAnimation() {
	return (
		<div className='aniamtion-container'>
			<div id="scooter">
				<span className="wheels1"></span>
				<span className="wheels2"></span>
				<div id="stop">
					<div className="Sfront"></div>
					<div className="hlight"></div>
					<div className="handle"></div>
					<div className="Sback">
						<div className="seat">
							<small className="seatholder"></small>
						</div>
						<li className="seatbar"></li>
						<li className="seatbar2"></li>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ScooterAnimation
