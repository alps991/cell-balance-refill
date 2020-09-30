import React from 'react';
import './LoginPage.css';

class LoginPage extends React.Component {

    state = {
        username: '',
        password: '',
    }

    handleUsernameChange = (e) => {
        const username = e.target.value
        this.setState(() => ({ username }));
    }

    handlePasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }));
    }

    render() {
        return (
            <div>
                <h2>Please enter your Username and Password below</h2>
                {this.props.loginErrorMessage.length ? <p className="error-message">{this.props.loginErrorMessage}</p> : null}
                <form className="login-form">
                    <input
                        type="text"
                        onChange={this.handleUsernameChange}
                        value={this.state.username}
                        placeholder="Username"
                        className="text-input"
                        autoFocus
                    />
                    <input
                        type="text"
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                        placeholder="Password"
                        className="text-input"
                    />
                    <button
                        type="submit"
                        onClick={(e) => this.props.handleLogin(e, this.state.username, this.state.password)}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default LoginPage;