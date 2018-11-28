import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from '@cybercongress/ui';
import { navigate, goBack } from '../../redux/browser';
import SearchInput, {
    BackButton, ForwardButton, NavigationContainer,
    FavoriteButton,
    FavoriteButtonContainer,
    SearchIcon,
} from '../../components/SearchInput/SearchInput';
import { isFavoritedPage, toggleFavorited } from '../../redux/appMenu';


class Navigation extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.dura !== nextProps.dura) {
            this.input.value = nextProps.dura;
        }
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const { value } = this.input;

            this.props.navigate(value);
        }
    };

    render() {
        const {
            dura, canBack, isFavorited,
        } = this.props;
        const homePage = dura === '';

        return (
            <NavigationContainer>
                {!homePage && <BackButton disabled={ !canBack } onClick={ this.props.goBack } />}
                <FavoriteButtonContainer>
                    {!!homePage && <SearchIcon />}
                    <SearchInput
                        inputRef={ (node) => {
                            this.input = node;
                        } }

                        defaultValue={ dura }
                        onKeyPress={ this._handleKeyPress }
                    />
                    {!homePage && <FavoriteButton
                        isFavorited={isFavorited}
                        onClick={this.props.toggleFavorited}
                    />}
                </FavoriteButtonContainer>
                {!homePage && <ForwardButton disabled />}
            </NavigationContainer>
        );
    }
}


export default connect(
    state => ({
        dura: state.browser.dura,
        canBack: !!state.browser.backDura,
        isFavorited: isFavoritedPage(state),
    }),
    {
        navigate,
        goBack,
        toggleFavorited
    },
)(Navigation);
