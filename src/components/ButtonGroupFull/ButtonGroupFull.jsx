import React, { Component } from 'react';
import {
    Pane, Button, TextEv as Text, Tooltip,
} from '@cybercongress/ui';
import { connect } from 'react-redux';
import CybLink from '../CybLink';

const Identity = ({
    title, description, btnClass, dura,
}) => (
    <CybLink dura={ dura }>
        <Tooltip
          position='left'
          content={ (
              <Pane
                paddingX={ 10 }
                paddingY={ 10 }
                display='flex'
                flexDirection='column'
                alignItems='center'
                width={ 200 }
                borderRadius={ 5 }
              >
                  <Pane
                    marginBottom={ 7 }
                    width='100%'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                      <Text fontWeight='bold' color='#fff'>
                          {title}
                      </Text>
                  </Pane>
                  <Pane>
                      <Text color='#fff'>{description}</Text>
                  </Pane>
              </Pane>
) }
        >
            <Button className={ `${btnClass} btn-group` } />
        </Tooltip>
    </CybLink>
);

const itemBnt = [
    {
        title: 'Soul',
        dura: '.cyb',
        description: 'Enlightened new web user',
        btnClass: 'btn-group-soul',
    },

    {
        title: 'Body',
        dura: 'wallet.cyb',
        description: 'Created identity',
        btnClass: 'btn-group-body',
    },
    {
        title: 'Immortality',
        dura: 'keys.cyb',
        description: 'Master of keys',
        btnClass: 'btn-group-imortality',
    },
    {
        title: 'Security',
        dura: 'shield.cyb',
        description: 'Defended identity',
        btnClass: 'btn-group-security',
    },
    {
        title: 'Oracle',
        dura: 'settings.cyb',
        description: 'Advanced communication',
        btnClass: 'btn-group-oracul ',
    },
    {
        title: 'Root',
        dura: 'rr.cyb',
        description: 'Base for growth',
        btnClass: 'btn-group-root',
    },
    {
        title: 'Diplomat',
        dura: 'txq.cyb',
        description: 'Deals expert',
        btnClass: 'btn-group-diplomat',
    },
    {
        title: 'Map',
        dura: 'history.cyb',
        description: 'Smart travel',
        btnClass: 'btn-group-map',
    },
    {
        title: 'Collection',
        dura: 'pins.cyb',
        description: 'Aquired values',
        btnClass: 'btn-group-earth',
    },
    // {
    //     title: 'Heritage',
    //     dura: 'state.cyb',
    //     description: 'Preservation of traditions',
    //     btnClass: 'btn-group-heritage',
    // },
    {
        title: 'Wisdom',
        dura: '.wiki/wiki/',
        description: 'Sharing knowledge',
        btnClass: 'btn-group-wiki',
    },
];

class BntGroupFull extends React.Component {
    render() {
        const { dura } = this.props;

        return (
            <Pane
              justifyContent='space-between'
                /* position: relative; */
              alignItems='center'
              flexDirection='column'
              maxHeight={ 500 }
              height='inherit'
              paddingY='1em'
              overflow='hidden'
              display='flex'
              flexDirection='column'
            >
                {itemBnt.map((item, index) => (
                    <Identity
                      title={ item.title }
                      description={ item.description }
                      btnClass={ `${item.btnClass} ${dura === item.dura ? 'active-btn' : ''}` }
                      dura={ item.dura }
                      key={ index }
                    />
                ))}
            </Pane>
        );
    }
}
export default connect(state => ({
    dura: state.browser.dura,
}))(BntGroupFull);
