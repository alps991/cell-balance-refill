import React from 'react';
import './App.css';
import ProviderList from './ProviderList';
import RefillForm from './RefillForm';
import LoginPage from './LoginPage';
import database from './firebase/firebase';

class App extends React.Component {

  state = {
    selectedProvider: null,
    availableProviders: [],
    balances: null,
    updateBalanceResponseMessage: '',
    curUser: '',
    loginErrorMessage: '',
  }

  handleLogin = (e, username, password) => {
    e.preventDefault();
    database.ref(`users`).once('value').then(res => {
      const users = res.val();
      if (!(username in users)) {
        this.setState(() => ({ loginErrorMessage: 'That user does not exist' }));
      } else if (users[username].password !== password) {
        this.setState(() => ({ loginErrorMessage: 'Incorrect password' }));
      } else {
        this.setState(() => ({ curUser: username, loginErrorMessage: '' }));
        database.ref("availableProviders").once('value').then(res => {
          this.setState(() => ({ availableProviders: res.val() }));
        });
        database.ref(`users/${this.state.curUser}/balances`).once('value').then(res => {
          this.setState(() => ({ balances: res.val() }));
        });
      }
    });
  }

  handleLogout = () => {
    this.setState(() => ({
      selectedProvider: null,
      balances: null,
      updateBalanceResponseMessage: '',
      curUser: '',
      loginErrorMessage: '',
    }));
  }

  handleSelectProvider = (provider) => {
    this.setState(() => ({
      selectedProvider: provider,
      updateBalanceResponseMessage: '',
    }));
  }

  handleUpdateBalance = (refillAmount, phoneNumber) => {

    database.ref(`users/${this.state.curUser}`).once('value').then(res => {
      const user = res.val();
      if (user.phoneNumber !== phoneNumber) {
        this.setState(() => ({ updateBalanceResponseMessage: "Incorrect phone number" }));
      } else {
        const newBalances = { ...this.state.balances };
        newBalances[this.state.selectedProvider] += refillAmount;
        database.ref(`users/${this.state.curUser}/balances`).set(newBalances).then(res => {
          this.setState(() => ({
            updateBalanceResponseMessage: 'Refill Success!',
            balances: newBalances
          }));

          setTimeout(() => {
            this.setState(() => ({
              selectedProvider: null,
              updateBalanceResponseMessage: ''
            }));
          }, 1500);

        }).catch(err => {
          this.setState(() => ({ updateBalanceResponseMessage: 'Refill failed' }));
          console.log(err);
        });
      }
    });
  }

  render() {

    if (!this.state.curUser) {
      return (
        <div className="App">
          <header className="App-header">
            <div className="App-header-content">
              <h1>Cell Refill App</h1>
            </div>
          </header>

          <LoginPage
            handleLogin={this.handleLogin}
            loginErrorMessage={this.state.loginErrorMessage}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-content">
            <h1>Cell Refill App</h1>
            <p className="logout-button" onClick={this.handleLogout}>Logout</p>
          </div>
        </header>
        {
          this.state.selectedProvider == null ? (
            <ProviderList
              providers={this.state.availableProviders}
              handleSelectProvider={this.handleSelectProvider}
            />
          ) : (
              <RefillForm
                selectedProvider={this.state.selectedProvider}
                currentBalance={this.state.balances[this.state.selectedProvider]}
                updateBalanceResponseMessage={this.state.updateBalanceResponseMessage}
                handleSelectProvider={this.handleSelectProvider}
                handleUpdateBalance={this.handleUpdateBalance}
              />
            )}
      </div>
    );
  }
}

export default App;
