import React from 'react';
import './App.css';
import ProviderList from './ProviderList';
import RefillForm from './RefillForm';

class App extends React.Component {

  state = {
    selectedProvider: null,
    availableProviders: ["MTS", "Beeline", "Megafone"],
    balances: {
      "MTS": 0,
      "Beeline": 12,
      "Megafone": 0
    }
  }

  handleSelectProvider = (provider) => {
    this.setState(() => ({ selectedProvider: provider }));
  }

  handleUpdateBalance = (refillAmount) => {
    const newBalances = { ...this.state.balances };
    newBalances[this.state.selectedProvider] += refillAmount;
    this.setState(() => ({ balances: newBalances }));
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
