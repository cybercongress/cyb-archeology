import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    SearchInput,
    BackButton, ForwardButton, NavigationContainer,
    FavoriteButton,
    FavoriteButtonContainer,
    SearchIcon,
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
