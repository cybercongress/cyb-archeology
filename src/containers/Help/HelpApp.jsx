import React, { Component } from 'react';
import CybLink from '../../components/CybLink';
import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';

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
