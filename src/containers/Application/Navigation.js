/* eslint-disable react/jsx-filename-extension */
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
    TextEv,
    IconButton,
    TextInput,
} from '@cybercongress/ui';
import { navigate, goBack, canBack } from '../../redux/browser';
// import SearchInput, {
//     BackButton, ForwardButton, NavigationContainer,
//     FavoriteButton,
//     FavoriteButtonContainer,
//     SearchIcon,
// } from '../../components/SearchInput/SearchInput';
import { isFavoritedPage, toggleFavorited } from '../../redux/appMenu';

// const AddNewApp = () => (
//     <Pane paddingY={ 20 } paddingX={ 20 } display='flex' flexDirection='column'>
//         <TextEv display='inline-block' marginBottom={ 10 }>
//             New App
//         </TextEv>
//         <Pane display='flex'>
//             <TextInput autoFocus width='100%' defaultValue='New App' />
//             <IconButton marginLeft={ 10 } paddingX={ 6 } icon='tick' intent='success' />
//         </Pane>
//     </Pane>
// );

// const RenameApp = ({dura}) => (
//     <Pane paddingY={ 20 } paddingX={ 20 } display='flex' flexDirection='column'>
//         <TextEv display='inline-block' marginBottom={ 6 }>
//             Rename App
//         </TextEv>
//         <Pane display='flex'>
//             <TextInput autoFocus width='100%' defaultValue={ dura } />
//             <IconButton marginLeft={ 10 } paddingX={ 6 } icon='tick' intent='success' />
//         </Pane>
//         <Button marginTop={ 20 } iconBefore='trash' width='fit-content' intent='danger'>
//             Delete App
//         </Button>
//     </Pane>
// );

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
        const {
            inputValue,
        } = this.state;
        const {
            dura, canBack, isFavorited,
        } = this.props;
        const homePage = dura === '';

        return (
            <NavigationContainer>
                { !homePage && <BackButton style={{ padding: '0 10px', cursor: 'pointer'}} disabled={ !canBack } onClick={ this.props.goBack } /> }
                <FavoriteButtonContainer>
                    { !!homePage && <SearchIcon /> }
                    <SearchInput
                      textAlign='center'
                      width='100%'
                      height={ 41 }
                      fontSize='35px'
                      value={ inputValue }
                      onChange={ e => this.onSearchStringChange(e) }
                      onKeyPress={ this._handleKeyPress }
                    />
                    { !homePage && (
                    <FavoriteButton
                      isFavorited={ isFavorited }
                      onClick={ this.props.toggleFavorited }
                    />
) }
                </FavoriteButtonContainer>
                { !homePage && <ForwardButton style={{ padding: '0 10px', cursor: 'pointer'}} disabled /> }
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
