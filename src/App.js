import React from 'react';
import './App.css';
import ProviderList from './ProviderList';

class App extends React.Component {

  state = {
    selectedProvider: null,
    availableProviders: ["MTS", "Beeline", "Megafone"],
  }

  handleSelectProvider = (provider) => {
    this.setState(() => ({ selectedProvider: provider }));
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
          ) : null}

      </div>
    );
  }

}

export default App;
