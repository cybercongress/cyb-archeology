import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../redux/browser';


class CybLink extends Component {
	onLinkClick = (e) => {
	    e.preventDefault();

  		this.props.navigate(this.props.dura);

	    if (this.props.onClick) { this.props.onClick(e); }
  	}

	render() {
	    const {
	        children, dura, navigate, ...props
	    } = this.props;

	    return (
    <a
  href={ `cyb://${dura}` }
	            { ...props }
	            onClick={ this.onLinkClick }
	        >
    {this.props.children}
	        </a>
	    );
	}
}

export default connect(
    null,
    { navigate },
)(CybLink);
