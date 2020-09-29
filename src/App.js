import React from 'react';
import './App.css';
import ProviderList from './ProviderList';
import RefillForm from './RefillForm';
import database from './firebase/firebase';

class App extends React.Component {

  state = {
    selectedProvider: null,
    availableProviders: [],
    balances: null,
  }

  componentDidMount() {
    database.ref("availableProviders").once('value').then(res => {
      this.setState(() => ({ availableProviders: res.val() }));
    });
    database.ref("users/adonmez/balances").once('value').then(res => {
      this.setState(() => ({ balances: res.val() }));
    });
  }

  handleSelectProvider = (provider) => {
    this.setState(() => ({ selectedProvider: provider }));
  }

  handleUpdateBalance = (refillAmount) => {
    const newBalances = { ...this.state.balances };
    newBalances[this.state.selectedProvider] += refillAmount;
    database.ref("users/adonmez/balances").set(newBalances).then(res => {
      this.setState(() => ({ balances: newBalances }));
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Cell Refill App</h1>
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
                handleSelectProvider={this.handleSelectProvider}
                handleUpdateBalance={this.handleUpdateBalance}
              />
            )}
      </div>
    );
  }
}

export default App;
