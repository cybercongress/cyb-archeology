import React, { Component } from 'react';

import Home, {
    Items,
    Item,
    ItemTitle,
    Image,
    Arrow,
    LinkList, LinkItem,
} from '../../components/Home/Home';

class HomePage extends Component {
    render() {
        return (
            <Home>
                <Items>
                    <Item dura='wallet.cyb'>
                        <ItemTitle>Wallet</ItemTitle>
                        <Image type='appStore' />
                        <Arrow />
                    </Item>

                    <Item dura='.dragons'>
                        <ItemTitle>Dragonereum</ItemTitle>
                        <Image type='createRegistry' />
                        <Arrow />
                    </Item>
                    <Item dura='.chaingear'>
                        <ItemTitle>Chaingear</ItemTitle>
                        <Image type='createApp' />
                        <Arrow />
                    </Item>
                </Items>

                <LinkList>

                    <LinkItem target='_blank' to='https://github.com/cybercongress' icon='github'>GitHub</LinkItem>
                    <LinkItem
                        target='_blank'
                        to='https://github.com/orgs/cybercongress/projects/1'
                        icon='roadmap'
                    >
                        Roadmap
                    </LinkItem>
                    <LinkItem target='_blank' to='https://wiki.cybercongress.ai' icon='knowledge'>Knowledge</LinkItem>
                    <LinkItem target='_blank' to='https://steemit.com/@cybercongress' icon='blog'>Blog</LinkItem>

                </LinkList>
            </Home>
        );
    }
}

export default HomePage;
