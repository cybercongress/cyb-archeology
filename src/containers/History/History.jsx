import React, { Component } from 'react';
import { connect } from 'react-redux';


class History extends Component {
    back = () => {

        const { history } = this.props;
        if (history.length > 0) {
            const lastUrl = history[history.length - 1];

            // dispatch(navigate(lastUrl));
            this.props.dispatch({ type: 'MOVE_BACK' });
        }
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <div>
                {history.map((item, index) => (
                    <div key={index}>
                        {item}
                    </div>
                ))}
                </div>
                <button onClick={this.back}>back</button>
            </div>
        );
    }
}

export default connect(
    state => ({
        history: state.browser.history,
    })
)(History);
