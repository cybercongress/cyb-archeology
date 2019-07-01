import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    SearchInput,
    BackButton,
    ForwardButton,
    NavigationContainer,
    FavoriteButton,
    FavoriteButtonContainer,
    SearchIcon,
    Popover,
    Button,
    Pane,
    TextInput,
    IconButton,
    Text,
} from '@cybercongress/ui';
import { navigate, goBack, canBack } from '../../redux/browser';
// import SearchInput, {
//     BackButton, ForwardButton, NavigationContainer,
//     FavoriteButton,
//     FavoriteButtonContainer,
//     SearchIcon,
// } from '../../components/SearchInput/SearchInput';
import { isFavoritedPage, toggleFavorited } from '../../redux/appMenu';

class Navigation extends Component {
    state = {
        inputValue: '',
    };

    componentWillMount() {
        const { dura } = this.props;

        if (dura) {
            this.setState({
                inputValue: dura,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dura !== nextProps.dura) {
            this.setState({ inputValue: nextProps.dura });
        }
    }

    onSearchStringChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const { inputValue } = this.state;

            this.props.navigate(inputValue);
        }
    };

    render() {
        const { inputValue } = this.state;
        const { dura, canBack, isFavorited } = this.props;
        const homePage = dura === '';

        const AddNewApp = () => (
            <Pane
              paddingY={ 20 }
              paddingX={ 20 }
              display='flex'
              flexDirection='column'
              backgroundColor='#000'
            >
                <Text display='inline-block' color='#fff' marginBottom={ 10 }>
                    New App
                </Text>
                <Pane display='flex' marginBottom={ 10 }>
                    <TextInput
                      autoFocus
                      width='100%'
                      defaultValue='New App'
                      background='transparent'
                      className='input-green-no-focus'
                    />
                    <IconButton
                      marginLeft={ 10 }
                      className='btn'
                      paddingX={ 6 }
                      icon='tick'
                      intent='success'
                    />
                </Pane>
                <Text display='inline-block' fontSize={ 10 } color='#38d6ae'>
                    QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf
                </Text>
            </Pane>
        );

        const RenameApp = () => (
            <Pane
              paddingY={ 20 }
              paddingX={ 20 }
              display='flex'
              flexDirection='column'
              backgroundColor='#000'
            >
                <Text display='inline-block' color='#fff' marginBottom={ 6 }>
                    Rename App
                </Text>
                <Pane display='flex'>
                    <TextInput
                      autoFocus
                      width='100%'
                      defaultValue={ dura }
                      background='transparent'
                      className='input-green-no-focus'
                    />
                    <IconButton
                      marginLeft={ 10 }
                      className='btn'
                      paddingX={ 6 }
                      icon='tick'
                      intent='success'
                    />
                </Pane>
                <Button
                  marginTop={ 20 }
                  iconBefore='trash'
                  className='btn'
                  width='fit-content'
                  intent='danger'
                >
                    Delete App
                </Button>
            </Pane>
        );

        return (
            <NavigationContainer>
                {!homePage && (
                    <BackButton
                      style={ { padding: '0 10px', cursor: 'pointer' } }
                      disabled={ !canBack }
                      onClick={ this.props.goBack }
                    />
                )}
                <FavoriteButtonContainer>
                    {!!homePage && <SearchIcon />}
                    <SearchInput
                      textAlign='center'
                      width='100%'
                      height={ 41 }
                      fontSize='35px'
                      value={ inputValue }
                      onChange={ e => this.onSearchStringChange(e) }
                      onKeyPress={ this._handleKeyPress }
                    />
                    {!homePage && (
                        <Popover
                          bringFocusInside
                          content={ isFavorited ? <RenameApp /> : <AddNewApp /> }
                        >
                            <FavoriteButton
                              isFavorited={ isFavorited }
                              onClick={ this.props.toggleFavorited }
                            />
                        </Popover>
                    )}
                </FavoriteButtonContainer>
                {!homePage && (
                    <ForwardButton style={ { padding: '0 10px', cursor: 'pointer' } } disabled />
                )}
            </NavigationContainer>
        );
    }
}

export default connect(
    state => ({
        dura: state.browser.dura,
        canBack: canBack(state),
        isFavorited: isFavoritedPage(state),
    }),
    {
        navigate,
        goBack,
        toggleFavorited,
    },
)(Navigation);
