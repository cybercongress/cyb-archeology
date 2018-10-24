import React, {Component} from 'react';
import CybLink from "./components/CybLink";

import Container from './components/Container/Container';

class NotFound extends Component {

    render() {
    	const incorectDura = this.props.location.query.dura;
        return (
            <Container>

            	<p>Seems that Cyb doesn`t know <b>"{incorectDura}"</b> app</p>
            	<p><b>Link this app in the root registry</b> and Cyb will understand it!</p>
                <CybLink dura='rr.cyb'>Go to Root Registry!</CybLink>
            </Container>
        );
    }
}

export default NotFound;
