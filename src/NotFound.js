import React, { Component } from 'react';
import CybLink from './components/CybLink';

import Container from './components/Container/Container';

import Vitalick from './components/Vitalick/Vitalick';

import NotFoundPage from './components/NotFound/NotFound';
import Button from './components/Button/Button';

class NotFound extends Component {
    render() {
    	const incorectDura = this.props.location.query.dura;

        return (
            <Container>
                <NotFoundPage>
                    <Vitalick style={ { float: 'right' } } />
                    <p>
Seems that Cyb doesn`t know
                        <b>
"
                            {incorectDura}
"
                        </b>
                        {' '}
app
                    </p>
                    <p>
                        <b>Link this app in the root registry</b>
                        {' '}
and Cyb will understand it!
                    </p>
                    <Button color='green' dura='rr.cyb'>Go to Root Registry!</Button>
                </NotFoundPage>
            </Container>
        );
    }
}

export default NotFound;
