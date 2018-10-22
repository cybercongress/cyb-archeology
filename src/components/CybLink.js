import React, { Component } from 'react';
import { connect } from "react-redux";
import { navigate } from '../redux/browser';




class CybLink extends Component {

	onLinkClick = (e) => {
  		e.preventDefault();
  		this.props.navigate(this.props.dura);
	}

	render() {
		const { children, dura, navigate, ...props } = this.props;

		return (
			<a 
			  onClick={this.onLinkClick} 
			  href={`cyb://${dura}`}
			  {...props}
			>{this.props.children}</a>				
		);
	}
}

export default connect(
	null,
	{ navigate }
)(CybLink);