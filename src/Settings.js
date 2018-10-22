import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/settings';

import Container from './components/Container/Container';
import CybLink from './components/CybLink';
import Indecator from './components/Indecator/Indecator';


class Settings extends Component {

	updateIPFS = () => {
		const value = this.refs.IPFS_END_POINT.value;
		this.props.setIPFS(value)
	}

	updateParitty = () => {
		const value = this.refs.PARITTY_END_POINT.value;
		this.props.setParity(value)
	}

	updateSearch = () => {
		const value = this.refs.SEARCH_END_POINT.value;
		this.props.setSearch(value)
	}
	componentWillMount() {
        this.props.checkStatus();
    }	

    componentWillReceiveProps(nextProps) {
        if (this.props.IPFS_END_POINT !== nextProps.IPFS_END_POINT ||
        	this.props.PARITTY_END_POINT !== nextProps.PARITTY_END_POINT ||
        	this.props.SEARCH_END_POINT !== nextProps.SEARCH_END_POINT) {

            this.refs.IPFS_END_POINT.value = nextProps.IPFS_END_POINT;
            this.refs.PARITTY_END_POINT.value = nextProps.PARITTY_END_POINT;
            this.refs.SEARCH_END_POINT.value = nextProps.SEARCH_END_POINT;
        }
    }

	render() {
		const {
			IPFS_END_POINT,
			PARITTY_END_POINT,
			SEARCH_END_POINT,

			ipfsStatus,
			ethNodeStatus,
			cyberNodeStatus,
			pending,

			resetAllSettings
		} = this.props;

		return (
			<Container>
				<div>
					<div>
						<div>IPFS:</div>
						<input className='form-input' ref='IPFS_END_POINT' defaultValue={IPFS_END_POINT}/>
						<button onClick={this.updateIPFS}>update</button>
						<Indecator status={pending ? null : ipfsStatus} />
					</div>
					<div>
						<div>paritty:</div>
						<input className='form-input' ref='PARITTY_END_POINT' defaultValue={PARITTY_END_POINT}/>
						<button onClick={this.updateParitty}>update</button>
						<Indecator status={pending ? null : ethNodeStatus}/>
					</div>
					<div>
						<div>search:</div>
						<input className='form-input' ref='SEARCH_END_POINT' defaultValue={SEARCH_END_POINT}/>
						<button onClick={this.updateSearch}>update</button>
						<Indecator status={pending ? null : cyberNodeStatus}/>
					</div>
					<div>
						<CybLink dura='.help'>how to configure local nodes</CybLink>
					</div>
					<div>
						<CybLink dura='rr.cyb'>root registry</CybLink>					
					</div>
					<div>
						<button onClick={resetAllSettings}>reset all settings</button>
					</div>
				</div>
			</Container>
		);
	}
}

export default connect(
	({ settings }) => ({
		IPFS_END_POINT: settings.IPFS_END_POINT,
		PARITTY_END_POINT: settings.PARITTY_END_POINT,
		SEARCH_END_POINT: settings.SEARCH_END_POINT,

		ipfsStatus: settings.ipfsStatus,
		ethNodeStatus: settings.ethNodeStatus,
		cyberNodeStatus: settings.cyberNodeStatus,
		pending: settings.pending,
	}),
	actions
)(Settings);
