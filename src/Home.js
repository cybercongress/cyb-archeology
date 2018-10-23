import React, {Component} from 'react';

import Home, {
    Items,
    Item,
    ItemTitle,
    Image,
    Arrow,
    LinkList, LinkItem
} from './components/Home/Home';

class HomePage extends Component {
    render() {
        return (
            <Home>
                <Items>
                    <Item dura='apps.cyb'>
                        <ItemTitle>App Store</ItemTitle>
                        <Image type='appStore'/>
                        <Arrow/>
                    </Item>

                    <Item dura='.chaingear/#/new'>
                        <ItemTitle>Create Register</ItemTitle>
                        <Image type='createRegistry'/>
                        <Arrow/>
                    </Item>
                    <Item dura='.help/#/create'>
                        <ItemTitle>Create App</ItemTitle>
                        <Image type='createApp'/>
                        <Arrow/>
                    </Item>
                </Items>

                <LinkList>

                    <LinkItem target="_blank" to='https://github.com/cybercongress' icon='github'>GitHub</LinkItem>
                    <LinkItem target="_blank" to='https://github.com/orgs/cybercongress/projects/1'
                              icon='roadmap'>Roadmap</LinkItem>
                    <LinkItem target="_blank" to='http://cybersearch.live' icon='cybernode'>Cybernode</LinkItem>
                    <LinkItem target="_blank" to='https://wiki.cybercongress.ai' icon='knowledge'>Knowledge</LinkItem>
                    <LinkItem target="_blank" to='https://medium.com/@cybercongress' icon='blog'>Blog</LinkItem>

                </LinkList>
            </Home>
        );
    }
}

export default HomePage
