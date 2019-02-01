import React, { Component } from 'react';
import { ScrollContainer } from '@cybercongress/ui';
import CybLink from '../../components/CybLink';

class HelpApp extends Component {
    render() {
        return (
            <ScrollContainer>
                <div>
                    <CybLink dura='help.cyb'>go Home</CybLink>
                </div>
                {this.props.children}
            </ScrollContainer>
        );
    }
}

export default HelpApp;
