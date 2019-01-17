import React from 'react';

import Vitalik from '../../components/Vitalik/Vitalik';
import NotFoundPage from '../../components/NotFound/NotFound';
import Button from '../../components/Button/Button';
import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';

const NotFound = (props) => {
    const { location: { query: { dura } } } = props;

    return (
        <ScrollContainer>
            <NotFoundPage>
                <Vitalik style={ { float: 'right' } } />
                <p>
Seems that Cyb doesn`t know
                    <b>
"
                        {dura}
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
        </ScrollContainer>
    );
};


export default NotFound;
