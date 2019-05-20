import React, { Component } from 'react';
import { ScrollContainer, Button } from '@cybercongress/ui';
import CybLink from '../../components/CybLink';

class HelpApp extends Component {
    render() {
        return (
            <ScrollContainer>
                <div style={{ paddingTop: 10, paddingLeft: 10}}>
                <CybLink style={{ textDecoration: 'none' }} dura='help.cyb'>
                    <Button className='btn'>
                        go Home
                    </Button>
                </CybLink>

                </div>
                {this.props.children}
            </ScrollContainer>
        );
    }
}

export default HelpApp;
