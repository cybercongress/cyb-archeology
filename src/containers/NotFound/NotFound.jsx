import React from 'react';
import {
    Vitalick,
    NotFoundPage,
    Button,
    Text,
    CentredPanel,
    FlexContainer,
    FlexContainerLeft,
    FlexContainerRight,
    ScrollContainer,
} from '@cybercongress/ui';
import ButtonDura from '../../components/Button/Button';

// import Vitalik from '../../components/Vitalik/Vitalik';
// import NotFoundPage from '../../components/NotFound/NotFound';
// import Button from '../../components/Button/Button';
// import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';

const NotFound = (props) => {
    const {
        location: {
            query: { dura },
        },
    } = props;

    return (
        <ScrollContainer>
            <NotFoundPage>
                <FlexContainer>
                    <FlexContainerLeft>
                        <CentredPanel style={ { alignItems: 'flex-start', paddingBottom: 0 } }>
                            <Text size='lg'>
                                Seems that Cyb doesn`t know
                                <b>
                                    {' '}
                                    {dura}
                                    {' '}
                                </b>
                                app
                            </Text>
                            <Text size='lg'>
                                <b>Link this app in the root registry </b>
                                and Cyb will understand it!
                            </Text>
                        </CentredPanel>
                        <ButtonDura color='green' dura='root.cyb'>
                            Go to Root Registry!
                        </ButtonDura>
                    </FlexContainerLeft>
                    <FlexContainerRight>
                        <Vitalick />
                    </FlexContainerRight>
                </FlexContainer>
            </NotFoundPage>
        </ScrollContainer>
    );
};

export default NotFound;
