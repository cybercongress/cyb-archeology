import React from 'react';

import './ConfirmationPopup.css';

const ConfirmationPopup = ({children}) => (
	<div className='confirmation-popup'>
		<div className='confirmation-popup__popup'>
			<div className='confirmation-popup__content'>
				confirm transactions?
			</div>
			<div className='confirmation-popup__buttons'>
				{children}
			</div>
		</div>
	</div>
);

export const ApproveButton = (props) => (
	<button {...props} />
);

export const RejectButton = (props) => (
	<button {...props} />
);

export default ConfirmationPopup;